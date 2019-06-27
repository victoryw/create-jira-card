const { OutPutDepenciesTree, splitMethodName } = require('./depenedies/service');
const { saveDependencies } = require('../providers/data-source-provider');


const loadMethodDependencyTree = (apiUrl, viewUrl) => ({
  load: async () => {
    // 2. load the (class, method) with head
    // const results = await loads(apiUrl, viewUrl, datas);
    const results = [
      ['com.ebao.life.claim.bat.payment.batchpaystyle.BatchPayStyleDAO', 'saveTransStyle', 'com.ebao.life.claim.bat.payment.batchpaystyle.BatchPayStyleDisposal', 'disposeSaveTransStyle'],
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
          return ({
            id: callee.id, class: normlizeName.class, method: normlizeName.method,
          });
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
