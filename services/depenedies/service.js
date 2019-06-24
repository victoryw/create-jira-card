const { DepGraph } = require('dependency-graph');
const loadDependencyProvider = require('../../providers/dependency-api-provider');

const loadUri = async (_url, _url2, className, method) => {
  const requestUrl = `${_url}/method/${className}/${method}/invokes?deep=20`;
  const depGraph2 = new DepGraph();

  try {
    const result = await loadDependencyProvider(requestUrl);
    result.nodes.forEach((node) => {
      depGraph2.addNode(node.id);
      depGraph2.setNodeData(node.id, node);
    });
    result.edges.forEach((edge) => {
      depGraph2.addDependency(edge.b, edge.a);
    });

    result.nodes.filter(node => node.title.indexOf('com.ebao.life.servlet.pub.common.RootServlet') > -1
      || node.title.indexOf('com.ebao.pub.framework.GenericAction') > -1
      || node.title.indexOf('com.picc.jmstask') > -1
      || node.title.endsWith('.main')).forEach(node => depGraph2.removeNode(node.id));

    const graph2s = depGraph2.overallOrder(true);
    const callerNames = graph2s.map(root => depGraph2.getNodeData(root).title);
    return {
      caller: callerNames,
      view: `${_url2}/method/${className}/${method}/invokes?deep=20`,
      class: className,
      method,
    };
  } catch (error) {
    // console.log(error, `${_url2}/method/${className}/${method}/invokes?deep=20`);
    return {
      caller: ['error'],
      view: `${_url2}/method/${className}/${method}/invokes?deep=20`,
      class: className,
      method,
    };
  }
};

// eslint-disable-next-line no-multi-assign
module.exports = exports = loadUri;
