/**
 * @fileOverview app扩展
 * @name application.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

const pkg = require('../../package.json');
const RestApi = require('../../lib/rest');

const NAME = pkg.eggPlugin.name;
const KEY = Symbol(NAME);
module.exports = {
  get httpSimple() {
    const app = this;
    if (app[KEY]) { return app[KEY]; }

    const config = app.config[NAME] || {};
    const exports = app[KEY] = {};
    exports.rest = (url, opts) => new RestApi(app, { ...config, ...(opts || {}), url });
    return exports;
  },
};
