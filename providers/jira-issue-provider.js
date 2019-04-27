const axios = require('axios');

const jiraIssueProvider = (_jiraUser, _jiraPw, _jiraIssueUrl) => {
  const jiraHttpClient = axios.create();
  jiraHttpClient.interceptors.request.use((config) => {
    // eslint-disable-next-line no-param-reassign
    config.auth = {
      username: _jiraUser,
      password: _jiraPw,
    };
    return config;
  }, error => Promise.reject(error));


  return {
    create: async (issue) => {
      const response = await jiraHttpClient.post(_jiraIssueUrl, issue);
      return response;
    },
  };
};

// eslint-disable-next-line no-multi-assign
module.exports = exports = jiraIssueProvider;
