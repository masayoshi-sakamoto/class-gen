"use strict";
const fs = require('fs');
const path = require('path');
const commander = require('commander');
const ejs = require('ejs');
const inflector = require('./lib/inflector');
try {
    commander.version('0.0.1').option('-d, --dist [dist]', 'output directory');
    commander.command('entity [className]').action((className) => {
        entities(className);
    });
    commander.command('repository [className]').action((className) => {
        repositories(className);
    });
    commander
        .command('gateway [className]')
        .option('-n --name [appName]')
        .action((className, options) => {
        gateways(className, options);
    });
    commander
        .command('infra [className]')
        .option('-n --name [appName]')
        .action((className, options) => {
        infrastructure(className, options);
    });
    commander.command('store [className]').action((className) => {
        store(className);
    });
    commander
        .command('generate [className]')
        .option('-n --name [appName]')
        .action((className, options) => {
        entities(className);
        repositories(className);
        gateways(className, options);
        infrastructure(className, options);
        store(className);
    });
    commander.parse(process.argv);
}
catch (e) {
    console.error(e);
    process.exit(1);
}
function initialize() {
    commander.dist = !commander.dist ? 'app' : commander.dist;
    if (!fs.existsSync(commander.dist)) {
        fs.mkdirSync(commander.dist);
    }
}
function makeDir(dirpath, newpath) {
    const dist = path.resolve(dirpath, newpath);
    if (!fs.existsSync(dist)) {
        fs.mkdirSync(dist);
    }
    return dist;
}
function generator(params) {
    const { type, dist, filename, outfile, options, name } = params;
    const Filename = !filename ? 'class' : filename;
    const Outfile = !outfile ? name : outfile;
    const template = path.resolve(__dirname, '../templates/' + type + '/' + Filename + '.ejs');
    const content = ejs.render(fs.readFileSync(template, 'utf-8'), options);
    const filepath = path.resolve(dist, Outfile + '.ts');
    fs.writeFileSync(filepath, content, { encoding: 'utf-8', flag: 'w+' });
    console.log('Generated:', filepath);
}
function entities(className) {
    const type = 'entities';
    initialize();
    const dist = makeDir(commander.dist, type);
    const name = className.charAt(0).toUpperCase() + className.slice(1);
    generator({ type, dist, name, options: { name } });
}
function repositories(className) {
    const type = 'repositories';
    initialize();
    const dist = makeDir(commander.dist, type);
    const name = className.charAt(0).toUpperCase() + className.slice(1);
    generator({ type, dist, name, outfile: name + 'Repository', options: { name } });
}
function gateways(className, options) {
    const type = 'gateways';
    options.appName = !options.appName ? 'application' : options.appName;
    const name = className.charAt(0).toUpperCase() + className.slice(1);
    const names = inflector.pluralize(name);
    const appName = options.appName.charAt(0).toUpperCase() + options.appName.slice(1);
    initialize();
    const gateway = makeDir(makeDir(commander.dist, type), appName);
    const translator = makeDir(gateway, 'translator');
    generator({ type, dist: gateway, name, outfile: name.toLowerCase(), options: { name, names, appName } });
    generator({
        type,
        dist: translator,
        name,
        outfile: name.toLowerCase(),
        filename: 'translator',
        options: { name, names, appName }
    });
}
function infrastructure(className, options) {
    const type = 'infrastructure';
    options.appName = !options.appName ? 'application' : options.appName;
    const name = className.charAt(0).toUpperCase() + className.slice(1);
    const names = inflector.pluralize(name);
    const appName = options.appName.charAt(0).toUpperCase() + options.appName.slice(1);
    initialize();
    const dist = makeDir(makeDir(makeDir(makeDir(commander.dist, type), 'network'), appName), 'requests');
    generator({ type, dist, name, outfile: name.toLowerCase(), options: { name, names, appName } });
}
function store(className) {
    const type = 'store';
    const name = className.charAt(0).toUpperCase() + className.slice(1);
    initialize();
    const dist = makeDir(makeDir(commander.dist, type), name.toLowerCase());
    generator({ type, dist, name, outfile: 'index', filename: 'index', options: { name } });
    generator({ type, dist, name, outfile: 'mutations', filename: 'mutations', options: { name } });
    generator({ type, dist, name, outfile: 'state', filename: 'state', options: { name } });
    generator({ type, dist, name, outfile: 'types', filename: 'types', options: { name } });
}
//# sourceMappingURL=index.js.map