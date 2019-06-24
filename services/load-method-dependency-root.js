const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const datas = require('./data');
const loadUri = require('./depenedies/service');

const csvWriter = createCsvWriter({
  path: '/Users/victoryw/myfiles/TW-Projects/picc/create-card-factory/file.csv',
  header: [
    { id: 'class', title: 'class' },
    { id: 'method', title: 'method' },
    { id: 'caller', title: 'caller' },
    { id: 'view', title: 'view' },
  ],
});


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
    const tableMethodCalls = totalResults.flatMap(x => x).map((tableMethodCall) => {
      const newResult = tableMethodCall.caller.flatMap(call => ({
        caller: call,
        view: tableMethodCall.view,
        class: tableMethodCall.class,
        method: tableMethodCall.method,
      }));
      return newResult;
    }).flatMap(x => x);
    await csvWriter.writeRecords(tableMethodCalls);
  },
});

// eslint-disable-next-line no-multi-assign
module.exports = exports = loadDependency;
