const { loadRoot, OutPutDepenciesTree } = require('./depenedies/service');
const { saveDependencies } = require('../providers/data-source-provider');

const loads = async (_url, _url2, todos) => {
  const results = await Promise.all(todos.map(async (todo) => {
    const result2 = await loadRoot(_url, _url2, todo[0], todo[1]);
    return result2;
  }));
  return results.flatMap(b => b);
};

const splitMethodName = (name) => {
  const splitMethod = /([^.]+)/g;
  const methodGroup = name.match(splitMethod);
  return { class: methodGroup.slice(0, methodGroup.length - 1).join('.'), method: methodGroup[methodGroup.length - 1] };
};


const loadMethodDependencyTree = (apiUrl, viewUrl) => ({
  load: async () => {
    // 2. load the (class, method) with head
    // const results = await loads(apiUrl, viewUrl, datas);
    const results = [
      ['com.ebao.life.claim.bat.payment.batchpaystyle.BatchPayStyleDAO', 'savePayStyle', 'com.ebao.life.claim.bat.payment.batchpaystyle.BatchPayStyleServlet', 'doProcess'],
    ];
    // 3. load the (head) dependency
    const totalResult = await Promise.all(results.map(async (result) => {
      const headClass = result[2];
      const headMethod = result[3];
      // eslint-disable-next-line operator-linebreak
      const singleCallTree =
        await OutPutDepenciesTree(apiUrl, viewUrl, headClass, headMethod);
      return {
        sourceClass: result[0],
        sourceMethod: result[1],
        headClass: result[2],
        headMethod: result[3],
        callees: singleCallTree.callees.map((callee) => {
          const normlizeName = splitMethodName(callee.title);
          return ({ id: callee.id, class: normlizeName.class, method: normlizeName.method });
        }),
        headCallView: singleCallTree.view,
      };
    }));
    // 4. save the data
    await saveDependencies(totalResult);

    console.log('push over');
  },
});


// eslint-disable-next-line no-multi-assign
module.exports = exports = loadMethodDependencyTree;
