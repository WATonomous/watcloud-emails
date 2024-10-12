import { Command } from 'commander';
const program = new Command();

program
    .description('A CLI tool for working with WATcloud emails')


program
    .command('generate <template_name>')
    .description('Generate an email from a template')
    .action((template_name) => {
        console.log(`Generating email from template ${template_name}`);
    });

program.parse();