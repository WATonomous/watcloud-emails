import { render } from '@react-email/components';
import { Command } from 'commander';
import fs from 'fs';

const program = new Command();

program
    .description('A CLI tool for working with WATcloud emails')


program
    .command('generate <template_name>')
    .description('Generate an email from a template')
    .option('-d, --data <data>', 'Data to pass to the template')
    .option('-o, --output <output>', 'Output file')
    .option('-p, --pretty', 'Pretty print the output')
    .option('-t, --text', 'Generate plain text output')
    .action(async (template_name, options) => {
        const template = require(`../emails/${template_name}`).default;

        let data = {};
        if (options.data) {
            data = JSON.parse(options.data);
        }

        const out = await render(template(data), {
            pretty: options.pretty,
            plainText: options.text,
        })

        if (options.output) {
            fs.writeFileSync(options.output, out);
        } else {
            console.log(out);
        }
    });

program
    .command('list')
    .description('List all available templates')
    .action(() => {
        const files = fs.readdirSync(__dirname + '/../emails');
        const templates = files.map((file) => file.replace(/\.jsx?$|\.tsx?$/, ''));
        console.log('Available templates:');
        for (const template of templates) {
            console.log(template);
        }
    });

program.parse();