/**
 * @author unofficial<cangku@unofficial.cn>
 * @description 迁移 wepy 到 taro 的插件。插件只是提供迁移过程中的基础配置，业务相关的配置可以通过回调函数修改。
 */

import path from 'path';
import fs from 'fs';
import { unique, isArray } from './utils';

export default class {
    pages = false;

    /**
     * 插件配置
     * @param outputRoot 编译输入目录
     * @param packageRoot 包名 默认
     */
    constructor(c) {
        this.config = Object.assign(
            {
                outputRoot: '../dist',
                packageRoot: '',
                needComponents: [],
                sub: true
            },
            c
        );
        this.config.packageRoot = path.basename(this.config.outputRoot);
    }

    /**
     * [ 'type', 'code', 'file', 'output', 'done', 'next', 'catch' ]
     */
    apply(op) {
        switch (op.type) {
            case 'app':
                break;
            case 'config':
                if (/app\.json/.test(op.file)) {
                    // 自定义 pages
                    if (
                        this.config.pages &&
                        isArray(this.config.pages) &&
                        this.config.pages.length
                    ) {
                        let code = JSON.parse(op.code);
                        code.pages = this.config.pages;
                        op.code = JSON.stringify(code);
                    }

                    this.updateTaroAppConfig(op);
                }
                break;
            case 'page':
                let relativePath = path.relative(
                    path.dirname(op.file),
                    this.config.outputRoot
                );
                op.code = op.code.replace(
                    /("|')use strict("|');/,
                    this.needRequireTaro(op)
                        ? `$&require("${relativePath}/app.js");var taro=require("${relativePath}/../npm/@tarojs/taro-weapp/index.js");`
                        : `$&require("${relativePath}/app.js");`
                );
                this.updateRoute(op);
                break;
            case 'component':
                if (this.needRequireTaro(op)) {
                    let relativePath = path.relative(
                        path.dirname(op.file),
                        this.config.outputRoot
                    );
                    op.code = op.code.replace(
                        /("|')use strict("|');/,
                        `$&var taro=require("${relativePath}/../npm/@tarojs/taro-weapp/index.js");`
                    );
                }
                this.updateRoute(op);
                break;
            case 'wxml':
            case 'js':
            case 'css':
                this.updateRoute(op);
                break;
            default:
        }
        this.config.callback && this.config.callback(op);
        op.next();
    }

    /**
     * @desc 更新 wepy app config pages 到 taro app config
     * @TODO: wepy subpackage 暂未更新到 taro 中
     * @param {*} op wepy params
     */
    updateTaroAppConfig(op) {
        const { pages } = JSON.parse(op.code);
        this.pages = pages;
        const taroAppJsonPath = path.join(
            this.config.outputRoot,
            '../',
            'app.json'
        );
        let taroAppConfig = {};
        try {
            taroAppConfig = require(path.resolve(taroAppJsonPath));
        } catch (e) {
            if (e.code === 'MODULE_NOT_FOUND') {
                console.log(
                    `{
    "name": "wepy-plugin-migrate",
    "error": "config error",
    "code": "MODULE_NOT_FOUND",
    "todo": [
        "Wepy config target 配置为 Taro 编译目录下第一级目录",
        "插件配置 outputRoot 设置为 Wepy config target"
    ]
}`
                );
                process.exit();
            } else {
                throw e;
            }
        }

        // TODO: watch 模式下多次重复编译可能导致 path 同时存在 pages 或者 subpackage pages 中，运行时同一页面不能出现两次。

        // package page or subpackage page
        if (this.config.sub) {
            taroAppConfig.subpackages = taroAppConfig.subpackages || [];
            const subRoots = taroAppConfig.subpackages.map(
                subpackage => subpackage.root
            );
            const index = subRoots.indexOf(this.config.packageRoot);
            if (index !== -1) {
                const newPages = taroAppConfig.subpackages[index].pages.concat(
                    pages
                );
                taroAppConfig.subpackages[index].pages = unique(newPages);
            } else {
                taroAppConfig.subpackages.push({
                    root: this.config.packageRoot,
                    pages
                });
            }
        } else {
            if (this.config.packageRoot) {
                const migratePages = pages.map(
                    page => `${this.config.packageRoot}/${page}`
                );
                const newPages = taroAppConfig.pages.concat(migratePages);
                taroAppConfig.pages = unique(newPages);
            }
        }
        fs.writeFileSync(taroAppJsonPath, JSON.stringify(taroAppConfig));
    }

    /**
     * @desc 路由替换
     * @param {*} op wepy params
     */
    updateRoute(op) {
        const reg = new RegExp(this.pages.join('|'), 'g');
        op.code = op.code.replace(
            reg,
            /^\//.test('$&')
                ? `/${this.config.packageRoot}$&`
                : `${this.config.packageRoot}/$&`
        );
    }

    /**
     * @desc 是否需要引入taro
     */
    needRequireTaro(op) {
        if (
            this.config.needComponents &&
            isArray(this.config.needComponents) &&
            this.config.needComponents.length
        ) {
            const reg = new RegExp(this.config.needComponents.join('|'));
            return reg.test(op.file);
        }
        return false;
    }
}
