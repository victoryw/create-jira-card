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

// eslint-disable-next-line no-multi-assign
module.exports = exports = loadDependencyProvider;
