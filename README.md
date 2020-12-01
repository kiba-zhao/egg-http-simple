# egg-http-simple

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-http-simple.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-http-simple
[travis-image]: https://img.shields.io/travis/eggjs/egg-http-simple.svg?style=flat-square
[travis-url]: https://travis-ci.org/eggjs/egg-http-simple
[codecov-image]: https://img.shields.io/codecov/c/github/eggjs/egg-http-simple.svg?style=flat-square
[codecov-url]: https://codecov.io/github/eggjs/egg-http-simple?branch=master
[david-image]: https://img.shields.io/david/eggjs/egg-http-simple.svg?style=flat-square
[david-url]: https://david-dm.org/eggjs/egg-http-simple
[snyk-image]: https://snyk.io/test/npm/egg-http-simple/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-http-simple
[download-image]: https://img.shields.io/npm/dm/egg-http-simple.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-http-simple

<!--
Description here.
-->

## Install

```bash
$ npm i git://github.com/kiba-zhao/egg-http-simple --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.httpSimple = {
  enable: true,
  package: 'egg-http-simple',
};
```

## Configuration

```js
// {app_root}/config/config.default.js
exports.httpSimple = {
  // 从opts中提取值注入到app.curl的headers中
  inject: {
    'App-ID': [ 'appId' ],
    'Auth-ID': [ 'authId' ],
  },
  //　默认app.curl的options参数
  dataType: 'json',
  contentType: 'json',
};
```

see [config/config.default.js](config/config.default.js) for more detail.

## Example

使用customLoader将app/http目录下http model加载到app.httpApi

### customLoader配置 ###

``` javascript
exports.customLoader = {
  httpApi: {
    directory: 'app/http',
    inject: 'app',
    loadunit: true,
    caseStyle: 'upper',
  },
};

```

### http模型 ###

``` javascript
// {app_root}/app/http/simple.js
module.exports = app => {
  return app.httpSimple.rest(`${app.config.httpServers.test}/simple`);
};

```

### 使用http模型示例 ###

``` javascript
const { Service } = require('egg');
class SimpleService extends Service {

  /**
   * 列出匹配条件的所有资源
   * @param {Object} condition 匹配条件
   * @param {Object} opts 可选项
   */
   async find(condition,opts) {
       const { app } = this;
       const res = await app.httpApi.Simple.find(condition,opts);
       return res;
   }

  /**
   * 获取一个匹配的资源
   * @param {Object} condition 匹配条件
   * @param {Object} opts 可选项   
   */
   async findOne(condition,opts) {
       const { app } = this;
       const res = await app.httpApi.Simple.findOne(condition,opts);
       return res;
   }

  /**
   * 新建一个资源
   * @param {Object} entity 资源内容
   * @param {Object} opts 可选项      
   */
   async createOne(entity,opts) {
       const { app } = this;
       const res = await app.httpApi.Simple.createOne(entity,opts);
       return res;   
   }

  /**
   * 更新一个匹配资源的内容
   * @param {Object} entity 更新资源内容
   * @param {Object} condition 匹配条件
   * @param {Object} opts 可选项
   */
   async replaceOne(entity,condition,opts){
       const { app } = this;
       const res = await app.httpApi.Simple.replaceOne(entity,condition,opts);
       return res;
   }

  /**
   * 更新一个匹配资源的部分内容
   * @param {Object} entity 更新资源内容
   * @param {Object} condition 匹配条件
   * @param {Object} opts 可选项
   */
   async updateOne(entity,condition,opts){
       const { app } = this;
       const res = await app.httpApi.Simple.updateOne(entity,condition,opts);
       return res;
   }

  /**
   * 销毁一个匹配的资源
   * @param {Object} condition 匹配条件
   * @param {Object} opts 可选项
   */
   async deleteOne(condition,opts) {
       const { app } = this;
       const res = await app.httpApi.Simple.deleteOne(condition,opts);
       return res;   
   }

  /**
   * 销毁匹配的所有资源
   * @param {Object} condition 匹配条件
   * @param {Object} opts 可选项
   */
   async deleteAll(condition,opts) {
       const { app } = this;
       const res = await app.httpApi.Simple.deleteAll(condition,opts);
       return res;   
   }

}
```

## Questions & Suggestions

Please open an issue [here](https://github.com/eggjs/egg/issues).

## License

[MIT](LICENSE)
