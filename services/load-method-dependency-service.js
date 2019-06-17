const axios = require('axios');
const { DepGraph } = require('dependency-graph');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const datas = require('../services/data');

const csvWriter = createCsvWriter({
  path: '/Users/victoryw/myfiles/TW-Projects/picc/create-card-factory/file.csv',
  header: [
    { id: 'class', title: 'class' },
    { id: 'method', title: 'method' },
    { id: 'caller', title: 'caller' },
    { id: 'view', title: 'view' },
  ],
});


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
                        || node.title.indexOf('com.picc.jmstask.JmsTask') > -1).forEach(node => depGraph2.removeNode(node.id));

    const graph2s = depGraph2.overallOrder(true);
    const callerNames = graph2s.map(root => depGraph2.getNodeData(root).title);
    return {
      caller: callerNames,
      view: `${_url2}/method/${className}/${method}/invokes?deep=20`,
      class: className,
      method,
    };
  } catch (error) {
    console.log(error, `${_url2}/method/${className}/${method}/invokes?deep=20`);
    return {
      caller: 'error',
      view: `${_url2}/method/${className}/${method}/invokes?deep=20`,
      class: className,
      method,
    };
  }
};

const loads = async (_url, _url2, todos) => {
  const results = await Promise.all(todos.map(async (todo) => {
    const result2 = await loadUri(_url, _url2, todo[0], todo[1]);
    return result2;
  }));
  return results;
};

const loadDependency = (_url, _url2) => ({
  load: async () => {
    const totalResults = await Promise.all(datas.map(async (data) => {
      const result = await loads(_url, _url2, [data]);
      return result;
    }));
    await csvWriter.writeRecords(totalResults.flatMap(x => x));
  },
});

// eslint-disable-next-line no-multi-assign
module.exports = exports = loadDependency;
