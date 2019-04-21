const axios = require('axios');
const { parser } = require('csv-table-parser');

const jiraHttpClient = axios.create();
jiraHttpClient.interceptors.request.use((config) => {
  // eslint-disable-next-line no-param-reassign
  config.auth = {
    username: '',
    password: '',
  };
  return config;
}, error => Promise.reject(error));

const createJiraCard = async (card) => {
  console.log(card);
  const response = await jiraHttpClient.post('http://www.baidu.com', card);
  return response;
};

function transfromToCard(servlet, menu) {
  // const servlet = '';
  // const menu = 'a->b->c';

  return {
    fields: {
      project: {
        key: 'LPJO',
      },
    },
    summary: `[理赔测试] ${servlet}`,
    descript: `待处理的servlet: \\\\\\\\${servlet} \\\\\\\\涉及的菜单：${menu}`,
    issuetype: {
      id: '10100',
    },
  };
}

const inputs = `menu, servlet
alice, 15
bob, 25
`;

const csvObject = parser(inputs);

csvObject.map(row => transfromToCard(row.servlet, row.menu)).forEach((card) => {
  createJiraCard(card);
});
