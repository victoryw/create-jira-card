const axios = require('axios');
const { DepGraph } = require('dependency-graph');

const loadDependencyProvider = async (_url) => {
  const dependencyClient = axios.create();
  try {
    const result = await dependencyClient.get(_url);
    return result.data;
  } catch (error) {
    throw error;
  }
};

const loadUri = async (_url, _url2, className, method) => {
  const requestUrl = `${_url}/method/${className}/${method}/invokes?deep=20`;
  const result = await loadDependencyProvider(requestUrl);
  const depGraph2 = new DepGraph();
  result.nodes.forEach((node) => {
    depGraph2.addNode(node.id);
    depGraph2.setNodeData(node.id, node);
  });
  result.edges.forEach((edge) => {
    depGraph2.addDependency(edge.b, edge.a);
  });
  result.nodes.filter(node => node.title.indexOf('com.ebao.life.servlet.pub.common.RootServlet') > -1).forEach(node => depGraph2.removeNode(node.id));
  const graph2s = depGraph2.overallOrder(true);
  const callerNames = graph2s.map(root => depGraph2.getNodeData(root).title);
  return {
    caller: callerNames,
    view: `${_url2}/method/${className}/${method}/invokes?deep=20`,
    class: className,
    method,
  };
};

const loads = async (_url, _url2, todos) => {
  const results = await Promise.all(todos.map(async (todo) => {
    const result2 = await loadUri(_url, _url2, todo.className, todo.method);
    return result2;
  }));
  return results;
};

const loadDependency = (_url, _url2) => ({
  load: async () => {
    const className = 'com.ebao.life.claim.claimentry.ClaimBackEntryDAO';
    const method = 'saveUwBackToEntry';
    const todos = [{ className, method }];
    console.log(await loads(_url, _url2, todos));
  },
});

// eslint-disable-next-line no-multi-assign
module.exports = exports = loadDependency;
