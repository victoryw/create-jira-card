const axios = require('axios');

const loadDependencyProvider = async (_url) => {
  const dependencyClient = axios.create();
  try {
    const result = await dependencyClient.get(_url);
    return result.data;
  } catch (error) {
    throw error;
  }
};

async function loadDepenciesTree(_url, className, method) {
  const requestUrl = `${_url}/method/${className}/${method}/invokes?deep=20`;
  const result = await loadDependencyProvider(requestUrl);
  return result;
}

// eslint-disable-next-line no-multi-assign
module.exports = exports = loadDepenciesTree;
