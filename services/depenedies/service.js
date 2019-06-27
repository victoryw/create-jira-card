const { DepGraph } = require('dependency-graph');
const loadDepenciesTree = require('../../providers/dependency-api-provider');

function combineResultBody(_url2, className, method, callerClass, callerMethod) {
  return {
    callerClass,
    callerMethod,
    view: `${_url2}/method/${className}/${method}/invokes?deep=20`,
    class: className,
    method,
  };
}

const splitMethodName = (name) => {
  const splitMethod = /([^.]+)/g;
  const methodGroup = name.match(splitMethod);
  return { class: methodGroup.slice(0, methodGroup.length - 1).join('.'), method: methodGroup[methodGroup.length - 1] };
};

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
      || node.title.endsWith('.main')
      || node.title.indexOf('com.ebao.pub.scd.bo.BackgroundCall') > -1
      || node.title.indexOf('com.ebao.pub.scd.BatchInterface.runBatch') > -1
      || node.title.endsWith('Servlet.doProcess')).forEach(node => depGraph2.removeNode(node.id));

    const graph2s = depGraph2.overallOrder(true);
    const callerNames = graph2s.map(root => depGraph2.getNodeData(root).title);
    return callerNames.map((name) => {
      const callerPair = splitMethodName(name);
      return combineResultBody(_url2, className, method, callerPair.class, callerPair.method);
    });
  } catch (error) {
    return [combineResultBody(_url2, className, method, 'error', 'error')];
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
module.exports = exports = { loadRoot, OutPutDepenciesTree, splitMethodName };
