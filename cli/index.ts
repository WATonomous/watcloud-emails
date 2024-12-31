#!/usr/bin/env node

import { render } from '@react-email/components';
import { Command } from 'commander';
import fs from 'fs';
import { waitForAssets } from '../utils/watcloud-uri';

const program = new Command();

// Returns the email template with the given name and performs any necessary initialization.
async function getTemplate(template_name: string, props_array: any[] = []) {
    const mod = require(`../emails/${template_name}`);
    if (mod.init) {
        await Promise.all(props_array.map(mod.init));
    }
    await waitForAssets();

    return mod.default;
}

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
        let data = {};
        if (options.data) {
            if (options.data === '-') {
                // Read from stdin
                data = JSON.parse(fs.readFileSync(0, 'utf-8'));
            } else {
                data = JSON.parse(options.data);
            }
        }

        const template = await getTemplate(template_name, [data]);

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
    .command('generate-bulk <template_name>')
    .description('Generate multiple emails from a template')
    .option('-d, --data <data>', 'Data to pass to the template. Should be a JSON array of objects')
    .option('-o, --output <output>', 'Output file. A JSON array of HTML and text emails will be written to this file')
    .action(async (template_name, options) => {
        let data = [];
        if (options.data) {
            if (options.data === '-') {
                // Read from stdin
                data = JSON.parse(fs.readFileSync(0, 'utf-8'));
            } else {
                data = JSON.parse(options.data);
            }
        }

        const template = await getTemplate(template_name, data);

        const out = await Promise.all(data.map(async (d: any) => ({
            html: await render(template(d)),
            text: await render(template(d), { plainText: true }),
        })));

        if (options.output) {
            fs.writeFileSync(options.output, JSON.stringify(out));
        } else {
            console.log(JSON.stringify(out, null, 2));
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
