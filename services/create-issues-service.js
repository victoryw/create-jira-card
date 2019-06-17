const jiraIssuesProvider = require('../providers/jira-issue-provider');

const totalissueTypes = `
简易理赔->个险简易案件： com.ebao.life.claim.simple.simplecase.SimpleCaseServlet
简易理赔->团险简易案件： com.ebao.life.claim.simple.simplecase.SimpleCaseServlet?page_case_type=2
理赔调查->子任务分配： com.ebao.life.claim.std.inspectionnew.testzhou.InspectionServlet
理赔调查->介绍信打印： com.ebao.life.claim.std.inspectionnew.inspectionletter.InspectionLetterServlet
理赔调查->旧理赔调查： com.ebao.life.claim.std.inspection.InspectionServlet
理赔调查->理赔调查查询： com.ebao.life.claim.std.inspection.InspectionQueryServlet
理赔调查->理赔调查特殊功能： com.ebao.life.claim.std.inspection.InspectionServlet?saction=show_special
理赔调查->调查件处理： com.ebao.life.claim.std.inspectionnew.inspectiondeal.InspectionDealServlet
理赔调查->调查任务分配： com.ebao.life.claim.std.inspectionnew.InspectionServlet
理赔调查->查勘费凭证查询打印： com.ebao.life.claim.std.printSurvey.PrintSurveyServlet
理赔调查->查勘费凭证查询补打： com.ebao.life.claim.std.printSurvey.RePrintSurveyServlet
理赔调查->理赔调查个案查询： com.ebao.life.claim.std.inspection.InspectionIndividualQueryServlet
弹性福利平台理赔->理赔初审： com.ebao.life.fb.claim.report.ClaimReportServlet
弹性福利平台理赔->理赔申请释放： com.ebao.life.fb.claim.report.ClaimReportServlet?sAction=IN_RELEASE_CASE
医保通批次理赔->保单信息同步至医保通： com.ebao.life.claim.bat.medicalsys.policysync.PolicySyncServlet
医保通批次理赔->医保通保单拖回核心： com.ebao.life.claim.bat.medicalsys.policytocore.PolicyTocoreServlet
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
