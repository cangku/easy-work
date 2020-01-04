const puppeteer = require('puppeteer-core');

const config = require('./config/puppeteer');
const preload = require('./preload');

// default options
let options = {
    defaultViewport: config.defaultViewport,
    args: [`--user-agent=${config.userAgent}`],
    headless: config.headless,
    userDataDir: config.userDataDir,
    executablePath: config.executablePath
};

// default events
let events = [];

async function startPuppeteer(url) {
    let instance;

    if (!instance) {
        instance = new Puppeteer(url);
    }

    return instance;
}

class Puppeteer {
    url = '';
    constructor(url) {
        this.url = url;
        this.do();
    }
    async do() {
        await start(this.url);
    }
}

// 启动无头浏览器
const start = async url => {
    const browser = await puppeteer.launch(options);
    browser.on('targetcreated', async target => {
        // onload next page
        if (target.type() !== 'page') {
            return;
        }
        const page = await target.page();
        await page.evaluateOnNewDocument(preload);
    });
    /**
     * browser 启动会默认创建一个空白页面
     */
    const pages = await browser.pages();
    if (pages.length === 1) {
        page = pages[0];
    } else {
        page = browser.newPage();
    }

    // onload first page
    await page.evaluateOnNewDocument(preload);
    await page.goto(url);
    await page.evaluate(() => {
        // 重制所有 a 标签 target
        [].slice
            .call(document.querySelectorAll('a'))
            .forEach(a => (a.target = '_self'));
    });

    // await watchDog;

    // const handle = await page.$('#jump');
    // let target;
    // if (handle) {
    //     const props = await handle.getProperty('target');
    //     target = await props.jsonValue();
    //     handle.dispose();
    // }
    // if (target === '_blank') {
    //     await page.evaluate(() => {
    //         const ele = document.getElementById('jump');
    //         ele.target = '_self';
    //     })
    // }
    // page.click('#jump');
    setTimeout(() => {
        browser.close();
    }, 10 * 60 * 1000);
    // 监听响应
    responsePromise = function() {
        return new Promise((resolve, reject) => {
            page.on('response', response => {
                const headers = response.headers();
                const method = response.request().method();
                const status = response.status();

                // Content-type: application/json

                // options
                if (method === 'OPTIONS' || status !== 200) {
                    return;
                }
                // others
                if (
                    /application\/json/.test(headers['content-type']) &&
                    ['GET', 'POST'].includes(method)
                ) {
                    response.json().then(res => {
                        callback.call(response, resolve, res);
                    });
                } else if (/text\/html/.test(headers['content-type'])) {
                    response.text().then(res => {
                        // return res;
                    });
                } else {
                    response.buffer().then(res => {
                        // return res;
                    });
                }
            });
        });
    };
};

module.exports = startPuppeteer;
