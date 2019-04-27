const jiraIssuesProvider = require('../providers/jira-issue-provider');

const totalissueTypes = `
修改给付方式 ：com.ebao.life.claim.std.changepayment.ChangePaymentServlet
menu1 ：com.example.class1
menu2 ：com.example.class2
`;

const examples = totalissueTypes.split('\n').filter(issue => issue !== '').map((issue) => {
  const contents = issue.split('：');
  return {
    servlet: contents[1],
    menu: contents[0],
  };
});

const createCardsService = (username, password, url) => {
  const jiraIssueUrl = `${url}/rest/api/2/issue`;
  const jiraUser = username;
  const jiraPw = password;

  const provider = jiraIssuesProvider(jiraUser, jiraPw, jiraIssueUrl);

  const transfromToCard = (servlet, menu) => ({
    fields: {
      project: {
        key: 'LPJO',
      },
      issuetype: {
        id: '10100',
      },
      summary: `[理赔进程] ${servlet}`,
      description: `待处理的servlet: \\\\\\\\${servlet} \\\\\\\\涉及的菜单：${menu}`,
    },
  });

  return {
    create: () => {
      examples.map(row => transfromToCard(row.servlet, row.menu)).forEach((card) => {
        const response = provider.create(card);
        return response;
      });
    },
  };
};

// eslint-disable-next-line no-multi-assign
module.exports = exports = createCardsService;
