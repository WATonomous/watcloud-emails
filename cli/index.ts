import { render } from '@react-email/components';
import { Command } from 'commander';
const program = new Command();

program
    .description('A CLI tool for working with WATcloud emails')


program
    .command('generate <template_name>')
    .description('Generate an email from a template')
    .action(async (template_name) => {
        console.log(`Generating email from template ${template_name}`);

        const template = require(`../emails/${template_name}`).default;

        const html = await render(template({}))

        console.log(html);
    });

program.parse();