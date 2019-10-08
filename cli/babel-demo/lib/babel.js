/**
 *
 * babel
 *
 */
const babel = require('@babel/core');
const inquirer = require('inquirer');
const fs = require('fs');

function inquirerConfig(args, cmd) {
    // 输出目录为指定
    if (!cmd.out) {
        // 判断是输入的是文件还是目录
        return inquirer
            .prompt([
                {
                    type: 'input',
                    message: '请输入输出文件名或者目录',
                    name: 'out'
                }
            ])
            .then(answers => {
                return {
                    input: args[0],
                    output: answers.out
                };
            });
    } else {
        return Promise.resolve({
            input: args[0],
            output: cmd.out
        });
    }
}

async function compiler(args, cmd) {
    inquirerConfig(args, cmd).then(({ input, output }) => {
        new Promise((resolve, reject) => {
            fs.readFile(input, {}, (err, code) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(code);
                }
            });
        })
            .then(code => {
                const options = {
                    filename: output
                };
                return babel.transformAsync(code, options);
            })
            .then(({ code, map, ast }) => {
                // 写入文件
                fs.writeFile(output, code, {}, (err, data) => {
                    if (!err) {
                        console.log(`success: ${input} => ${output}`);
                    } else {
                        console.log(`fail: ${input} ${output}`);
                    }
                });
            });
    });
}

module.exports = (...args) => {
    return compiler(...args).catch(console.error);
};
