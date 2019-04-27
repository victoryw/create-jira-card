#!/usr/bin/env node

const program = require('commander');
const createCardsService = require('./services/create-issues-service');
// const


program
  .command('create')
  .description('create issue card to jira')
  .option('-u, --username <username>', 'jira user name')
  .option('-p, --password <password>', 'jira password')
  .option('-l, --url <jira api url>', 'jira api url')
  .action((options) => {
    const service = createCardsService(options.username, options.password, options.url);
    service.create();
  });

program.parse(process.argv);
