const Koa = require('koa');
const koaBody = require('koa-body');
const config = require('./config/server');
const puppeteer = require('./puppeteer');

const app = new Koa();
app.use(koaBody());
app.use(async ctx => {
    const body = ctx.request.body;
    // body string => json
    const pupp = await puppeteer('https://www.remove.bg/');
    ctx.body = 23;
});
const port = process.env.PORT || config.port;
app.listen(port);
