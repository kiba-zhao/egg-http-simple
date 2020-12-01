/**
 * @fileOverview rest接口类
 * @name rest.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';
const { get, isFunction } = require('lodash');

const APP_KEY = Symbol('APP');
const OPTS_KEY = Symbol('OPTS');

const METHODS = {
  post: 'POST',
  put: 'PUT',
  patch: 'PATCH',
  del: 'DELETE',
};
class RestApi {
  constructor(app, opts) {
    this[APP_KEY] = app;
    this[OPTS_KEY] = opts;
  }

  /**
   * 列出匹配条件的所有资源
   * @param {Object} condition 匹配条件
   * @param {Object} opts 可选项
   */
  async find(condition, opts) {
    const { app, url, query, options } = prepare(this, condition, opts);

    const res = await app.curl(`${url}?${query}`, options);
    return res.data;
  }

  /**
   * 获取一个匹配的资源
   * @param {Object} condition 匹配条件
   * @param {Object} opts 可选项
   */
  async findOne(condition, opts) {
    const { id, ..._condition } = condition;
    const { app, url, query, options } = prepare(this, _condition, opts);

    const res = await app.curl(`${url}/${id}?${query}`, options);
    return res.data;
  }

  /**
   * 新建一个资源
   * @param {Object} entity 资源内容
   * @param {Object} opts 可选项
   */
  async createOne(entity, opts) {
    const { app, url, options } = prepareEntity(this, entity, undefined, opts);

    const res = await app.curl(url, { ...options, method: METHODS.post });
    return res.data;
  }

  /**
   * 更新一个匹配资源的内容
   * @param {Object} entity 更新资源内容
   * @param {Object} condition 匹配条件
   * @param {Object} opts 可选项
   */
  async replaceOne(entity, condition, opts) {
    const { id, ..._condition } = condition;
    const { app, url, query, options } = prepareEntity(this, entity, _condition, opts);

    const res = await app.curl(`${url}/${id}?${query}`, { ...options, method: METHODS.put });
    return res.data;
  }

  /**
   * 更新一个匹配资源的部分内容
   * @param {Object} entity 更新资源内容
   * @param {Object} condition 匹配条件
   * @param {Object} opts 可选项
   */
  async updateOne(entity, condition, opts) {
    const { id, ..._condition } = condition;
    const { app, url, query, options } = prepareEntity(this, entity, _condition, opts);

    const res = await app.curl(`${url}/${id}?${query}`, { ...options, method: METHODS.patch });
    return res.data;
  }

  /**
   * 销毁一个匹配的资源
   * @param {Object} condition 匹配条件
   * @param {Object} opts 可选项
   */
  async deleteOne(condition, opts) {
    const { id, ..._condition } = condition;
    const { app, url, query, options } = prepare(this, _condition, opts);

    const res = await app.curl(`${url}/${id}?${query}`, { ...options, method: METHODS.del });
    return res.data;
  }

  /**
   * 销毁匹配的所有资源
   * @param {Object} condition 匹配条件
   * @param {Object} opts 可选项
   */
  async deleteAll(condition, opts) {
    const { app, url, query, options } = prepare(this, condition, opts);

    const res = await app.curl(`${url}?${query}`, { ...options, method: METHODS.del });
    return res.data;
  }
}

module.exports = RestApi;


function prepare(target, condition, opts) {
  const app = target[APP_KEY];
  const { url, inject, ...options } = target[OPTS_KEY];

  const search = new URLSearchParams(condition);
  const headers = options.headers || {};
  if (inject) {
    for (const key in inject) {
      headers[key] = get(opts, inject[key]);
    }
  }

  return { app, url, query: search.toString(), options: { ...options, headers, trasform: undefined } };
}

function prepareEntity(target, entity, condition, opts) {
  const { options, ...others } = prepare(target, condition, opts);
  const { trasform } = target[OPTS_KEY];
  let bodyOpts = null;
  if (isFunction(trasform)) { bodyOpts = trasform(entity); } else { bodyOpts = { data: entity }; }

  return { options: { ...options, ...bodyOpts }, ...others };
}

