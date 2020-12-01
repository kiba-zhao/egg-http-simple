/**
 * @fileOverview 简单示例
 * @name simple.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

module.exports = app => {
  return app.httpSimple.rest('http://test/simple');
};
