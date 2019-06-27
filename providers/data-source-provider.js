const mysql = require('mysql2/promise');

const createAnalyzeCon = async () => {
  const conn = await mysql.createConnection({
    host: '10.127.151.14',
    port: 8306,
    user: 'root',
    password: 'prisma',
    database: 'default@default',
    connectTimeout: 180000,
  });
  return conn;
};

const saveDependencies = async (callHeads) => {
  const flatCallees = callHeads.flatMap(head => head.callees.map(headCallee => ({
    sourceClass: head.sourceClass,
    sourceMethod: head.sourceMethod,
    headClass: head.headClass,
    headMethod: head.headMethod,
    calleeId: headCallee.id,
    calleeClass: headCallee.class,
    calleeMethod: headCallee.method,
    calleeMethodId: headCallee.methodId,
    headCallView: head.headCallView,
  })));
  const valueStrs = flatCallees.map(result => `('${result.sourceClass}', '${result.sourceMethod}', '${result.headClass}', '${result.headMethod}', '${result.calleeId}', '${result.calleeClass}', '${result.calleeMethod}', '${result.headCallView}')`);
  const valueStr = valueStrs.join(',');
  const bulkInsert = ['INSERT INTO MethodCallTree(sourceClass, sourceMethod, headClass, headMethod, calleeId, calleeClass, calleeMethod, headCallView) Values'];
  const bulkInsertArrays = bulkInsert.concat(valueStr);

  const insertSql = bulkInsertArrays.join(' ');
  const con = await createAnalyzeCon();
  const result = await con.execute(insertSql);
  return result;
};

// eslint-disable-next-line no-multi-assign
module.exports = exports = { saveDependencies };
