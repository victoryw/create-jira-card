const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const datas = require('./data');
const { loadRoot } = require('./depenedies/service');

const csvWriter = createCsvWriter({
  path: './file.csv',
  header: [
    { id: 'class', title: 'class' },
    { id: 'method', title: 'method' },
    { id: 'callerClass', title: 'headerClass' },
    { id: 'callerMethod', title: 'headerMethod' },
    { id: 'view', title: 'view' },
  ],
});


const loads = async (_url, _url2, todo) => {
  const result2 = await loadRoot(_url, _url2, todo[0], todo[1]);
  return result2;
};

const loadDependency = (_url, _url2) => ({
  load: async () => {
    const totalResults = (await Promise.all(datas.map(async (data) => {
      const result = await loads(_url, _url2, data);
      return result;
    }))).flatMap(x => x);

    const tableMethodCalls = totalResults.flatMap(x => x).map((tableMethodCall) => {
      return {
        callerClass: tableMethodCall.callerClass,
        callerMethod: tableMethodCall.callerMethod,
        view: tableMethodCall.view,
        class: tableMethodCall.class,
        method: tableMethodCall.method,
      };
    });
    await csvWriter.writeRecords(tableMethodCalls);
    console.log('it work out');
  },
});

// eslint-disable-next-line no-multi-assign
module.exports = exports = loadDependency;
