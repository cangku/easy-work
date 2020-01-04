/**
 * 登录：-l, --login 启动登录逻辑
 *  --login-qr-output [format[@path]] 指定二维码输出形式 format: image base64; path: 输出结果到指定的路径
 *  --login-result-output <path> 输出登录结果到指定文件
 *
 * 预览：-p, --preview <project_root> 预览代码
 *  --preview-qr-output [format[@path]]
 *  --preview-info-output <path>
 *  --compile-condition '<json>' pathName 和 query
 *
 * 自动预览：--auto-preview <project_root>
 *  --auto-preview-info-output <path>
 *
 * 上传代码：-u, --upload <version@project_root>
 *  --upload-desc <desc>
 *  --upload-info-output <path>
 */
const { echo, exec, exit, which } = require('shelljs');
const { cli: wechat, tool: wechatTool } = require('./where');

// console.log(location);

// shell.exec(`${wechat} --help`);

// shell.exec(`${wechat} --login --login-result-output ${__dirname}/a.json`);

// 开发者工具必须存在
if (!which(`${wechat}`)) {
    echo('Sorry, this script requires wechat web dev tools.');
    exit(1);
}

// - 检测工具是否安装
// - 检测项目依赖是否安装
// - 检测项目是否构建完成
// - 上传项目是否成功
//      - 未构建
//      - 未登录
//        -

// shell.exec(`${wechat} -p /Users/unofficial/www/work/dw-xcx-lifestream/dist`);

// 添加事件监听
function addListener() {
    this.stderr.on('data', err => {
        // 开发者工具没有启动
        if (/Runtime error: Error/.test(err)) {
            console.log('error', wechat);
            child = exec(`${wechatTool} -o`);
        } else {
            console.log('stderr', err);
        }
    })

    this.stdout.on('data', data => {
        console.log('stdout', data);
    })
}

try {
    const version = '2.0.0';
    const projectRoot = '/Users/unofficial/www/work/dw-xcx-lifestream/dist';
    let child;
    child = exec(`${wechat} -u ${version}@${projectRoot}`, { async: true, silent: true });
    // child.code.on('data', data => {
    //     console.log('code', data);
    // })
    addListener.call(child);
    // child.stderr.on('data', err => {
    //     // 开发者工具没有启动
    //     if (/Runtime error: Error/.test(err)) {
    //         console.log('error', wechat);
    //         child = exec(`${wechatTool} -o`);
    //     } else {
    //         console.log('stderr', err);
    //     }
    // })

    // child.stdout.on('data', data => {
    //     console.log('stdout', data);
    // })
} catch (e) {

}

