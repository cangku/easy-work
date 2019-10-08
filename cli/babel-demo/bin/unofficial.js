#! /usr/bin/env node
const program = require('commander');

program.version(require('../package').version).usage('<command> [options]');

// babel
program
    .command('babel <file-or-dir>')
    .description('Babel is a JavaScript compiler')
    .option('-o --out <file-or-dir>', 'output it to the file or directory')
    .action((...args) => {
        const cmd = args.pop();
        require('../lib/babel')(args, cmd);
    });

program
    .command('dev [entry]')
    .description('start a dev server for development')
    .action(() => {
        require('../lib/dev')();
    });

program.parse(process.argv);

program.arguments('<command>').action(cmd => {
    program.outputHelp();
    // console.log(`  ` + chalk.red(`Unknown command ${chalk.yellow(cmd)}.`));
    // console.log();
    // suggestCommands(cmd);
});

program.commands.forEach(c => c.on('--help', () => console.log()));
// pi
// if (!process.argv.slice(2).length) {
//     program.outputHelp();
// }
