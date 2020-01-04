// Tencent\微信web开发者工具\微信开发者工具.exe

const osx = process.platform === 'darwin';
const win = process.platform === 'win32';
const other = !osx && !win;
const fs = require('fs');

//
const which = require('which');
const userhome = require('userhome');

if (other) {
    try {
        module.exports = which.sync('wechatwebdevtools')
    } catch (e) {
        module.exports = null
    }
} else {
    if (osx) {
        const regPath = '/Applications/wechatwebdevtools.app/Contents/MacOS';
        const altPath = userhome(regPath.slice(1))

        const exe = fs.existsSync(regPath)
            ? regPath
            : altPath
        module.exports = {
            cli: `${exe}/cli`,
            tool: `${exe}/wechatwebdevtools`
        }
    } else {
        const suffix = '\\Tencent\\微信web开发者工具';
        const prefixes = [
            process.env.LOCALAPPDATA
            , process.env.PROGRAMFILES
            , process.env['PROGRAMFILES(X86)']
        ]

        for (let i = 0; i < prefixes.length; i++) {
            const exe = prefixes[i] + suffix
            if (fs.existsSync(exe)) {
                module.exports = {
                    cli: `${exe}\\cli.bat`,
                    tool: `${exe}\\微信开发者工具.exe`
                }
                break
            }
        }
    }
}

module.exports = module.exports || null
