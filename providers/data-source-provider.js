const mysql = require('mysql');

const connection = mysql.createConnection({
  host: '10.127.151.14',
  port: 8306,
  user: 'root',
  password: 'prisma',
  database: 'default@default',
});

const saveDependencies = (callHeads) => {
  const flatCallees = callHeads.flatMap(head => head.callees.map(headCallee => ({
    sourceClass: head.sourceClass,
    sourceMethod: head.sourceMethod,
    headClass: head.headClass,
    headMthod: head.headMethod,
    calleeId: headCallee.id,
    calleeClass: headCallee.class,
    calleeMethod: headCallee.method,
    headCallView: head.headCallView,
  })));
};

// eslint-disable-next-line no-multi-assign
module.exports = exports = { saveDependencies };
