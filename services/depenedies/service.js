const { DepGraph } = require('dependency-graph');
const loadDepenciesTree = require('../../providers/dependency-api-provider');

function combineResultBody(_url2, className, method, caller) {
  return {
    caller,
    view: `${_url2}/method/${className}/${method}/invokes?deep=20`,
    class: className,
    method,
  };
}

const loadRoot = async (_url, _url2, className, method) => {
  const depGraph2 = new DepGraph();

  try {
    const result = await loadDepenciesTree(_url, className, method);

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

    return callerNames.map(name => combineResultBody(_url2, className, method, name));
  } catch (error) {
    // console.log(error, `${_url2}/method/${className}/${method}/invokes?deep=20`);
    return combineResultBody(_url2, className, method, 'error');
  }
};


const OutPutDepenciesTree = async (_url, _url2, className, method) => {
  const result = await loadDepenciesTree(_url, className, method);
  return {
    callees: result.nodes,
    view: `${_url2}/method/${className}/${method}/invokes?deep=20`,
    class: className,
    method,
  };
};

// eslint-disable-next-line no-multi-assign
module.exports = exports = { loadRoot, OutPutDepenciesTree };
