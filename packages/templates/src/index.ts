import * as path from 'path';
import * as fs from 'fs';

// Get all .js files in the emails directory (excluding _common directory)
const files = fs.readdirSync(__dirname + '/emails')
    .filter(file => file.endsWith('.js') && !file.includes('_common'));

// Export all found components
export const Emails: Record<string, any> = Object.fromEntries(files.map(file => {
    const componentName = path.basename(file, '.js');
    return [componentName, require(`./emails/${componentName}`)];
}));
