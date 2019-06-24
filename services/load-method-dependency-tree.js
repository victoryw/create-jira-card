const { loadRoot, OutPutDepenciesTree } = require('./depenedies/service');

const loads = async (_url, _url2, todos) => {
  const results = await Promise.all(todos.map(async (todo) => {
    const result2 = await loadRoot(_url, _url2, todo[0], todo[1]);
    return result2;
  }));
  return results.flatMap(b => b);
};


const loadMethodDependencyTree = (apiUrl, viewUrl) => ({
  load: async () => {
    // 2. load the (class, method) head
    // const results = await loads(apiUrl, viewUrl, datas);
    const results = [['com.ebao.life.claim.bat.payment.batchpaystyle.BatchPayStyleServlet', 'doProcess']];
    // 3. load the (head) dependency
    const totalResult = await Promise.all(results.map(async (result) => {
      // eslint-disable-next-line operator-linebreak
      const singleCallTree =
        await OutPutDepenciesTree(apiUrl, viewUrl, result[0], result[1]);
      return singleCallTree;
    }));
    // 4. save the data
    console.log(totalResult);
    return `${results}-${viewUrl}`;
  },
});

// eslint-disable-next-line no-multi-assign
module.exports = exports = loadMethodDependencyTree;
