#!/usr/bin/env node

const program = require('commander');
const createCardsService = require('./services/create-issues-service');
const loadDependencyService = require('./services/load-method-dependency-service');
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
program
  .command('update')
  .description('output the load dependecy tree')
  .option('-l, --url <dependency service root>', 'dependency service root')
  .option('-v, --view <dependency view service root>', 'dependency view service root')
  .action((options) => {
    const service = loadDependencyService(options.url, options.view);
    service.load();
  });

program.parse(process.argv);
