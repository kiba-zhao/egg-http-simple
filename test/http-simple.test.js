'use strict';

const mock = require('egg-mock');
const nock = require('nock');
const assert = require('power-assert');

const TEST_HOST = 'http://test';
describe('test/http-simple.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/http-simple-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  describe('simple', () => {

    const SIMPLE_PATH = '/simple';

    it('find', async () => {

      const condition = { chaha: 333, btest: 'asdasf', bool: true };
      const opts = { appId: 'appId', authId: 'authId' };
      const resBody = { haha: 123, test: 'asdasd' };

      nock(TEST_HOST)
        .matchHeader('accept', 'application/json')
        .matchHeader('App-ID', opts.appId)
        .matchHeader('Auth-ID', opts.authId)
        .get(SIMPLE_PATH)
        .query(condition)
        .reply(200, resBody, { 'Content-Type': 'application/json; charset=utf-8' });

      const res = await app.httpApi.Simple.find(condition, opts);
      assert.deepStrictEqual(res, resBody);

    });

    it('findOne', async () => {

      const id = 'id';
      const condition = { chaha: 333, btest: 'asdasf', bool: true };
      const opts = { appId: 'appId', authId: 'authId' };
      const resBody = { haha: 123, test: 'asdasd' };

      nock(TEST_HOST)
        .matchHeader('accept', 'application/json')
        .matchHeader('App-ID', opts.appId)
        .matchHeader('Auth-ID', opts.authId)
        .get(`${SIMPLE_PATH}/${id}`)
        .query(condition)
        .reply(200, resBody, { 'Content-Type': 'application/json; charset=utf-8' });

      const res = await app.httpApi.Simple.findOne({ ...condition, id }, opts);
      assert.deepStrictEqual(res, resBody);

    });

    it('createOne', async () => {

      const entity = { tasdas: { yahaha: 'asdasd' } };
      const opts = { appId: 'appId', authId: 'authId' };
      const resBody = { haha: 123, test: 'asdasd' };

      nock(TEST_HOST)
        .matchHeader('accept', 'application/json')
        .matchHeader('App-ID', opts.appId)
        .matchHeader('Auth-ID', opts.authId)
        .post(SIMPLE_PATH, entity)
        .reply(201, resBody, { 'Content-Type': 'application/json; charset=utf-8' });

      const res = await app.httpApi.Simple.createOne(entity, opts);
      assert.deepStrictEqual(res, resBody);

    });

    it('replaceOne', async () => {

      const id = 'id';
      const condition = { chaha: 333, btest: 'asdasf', bool: true };
      const entity = { tasdas: { yahaha: 'asdasd' } };
      const opts = { appId: 'appId', authId: 'authId' };
      const resBody = { haha: 123, test: 'asdasd' };

      nock(TEST_HOST)
        .matchHeader('accept', 'application/json')
        .matchHeader('App-ID', opts.appId)
        .matchHeader('Auth-ID', opts.authId)
        .put(`${SIMPLE_PATH}/${id}`, entity)
        .query(condition)
        .reply(200, resBody, { 'Content-Type': 'application/json; charset=utf-8' });

      const res = await app.httpApi.Simple.replaceOne(entity, { ...condition, id }, opts);
      assert.deepStrictEqual(res, resBody);

    });

    it('updateOne', async () => {

      const id = 'id';
      const condition = { chaha: 333, btest: 'asdasf', bool: true };
      const entity = { tasdas: { yahaha: 'asdasd' } };
      const opts = { appId: 'appId', authId: 'authId' };
      const resBody = { haha: 123, test: 'asdasd' };

      nock(TEST_HOST)
        .matchHeader('accept', 'application/json')
        .matchHeader('App-ID', opts.appId)
        .matchHeader('Auth-ID', opts.authId)
        .patch(`${SIMPLE_PATH}/${id}`, entity)
        .query(condition)
        .reply(200, resBody, { 'Content-Type': 'application/json; charset=utf-8' });

      const res = await app.httpApi.Simple.updateOne(entity, { ...condition, id }, opts);
      assert.deepStrictEqual(res, resBody);

    });

    it('delete', async () => {

      const condition = { chaha: 333, btest: 'asdasf', bool: true };
      const opts = { appId: 'appId', authId: 'authId' };
      const resBody = { haha: 123, test: 'asdasd' };

      nock(TEST_HOST)
        .matchHeader('accept', 'application/json')
        .matchHeader('App-ID', opts.appId)
        .matchHeader('Auth-ID', opts.authId)
        .delete(SIMPLE_PATH)
        .query(condition)
        .reply(204, resBody, { 'Content-Type': 'application/json; charset=utf-8' });

      const res = await app.httpApi.Simple.deleteAll(condition, opts);
      assert.deepStrictEqual(res, resBody);

    });

    it('deleteOne', async () => {

      const id = 'id';
      const condition = { chaha: 333, btest: 'asdasf', bool: true };
      const opts = { appId: 'appId', authId: 'authId' };
      const resBody = { haha: 123, test: 'asdasd' };

      nock(TEST_HOST)
        .matchHeader('accept', 'application/json')
        .matchHeader('App-ID', opts.appId)
        .matchHeader('Auth-ID', opts.authId)
        .delete(`${SIMPLE_PATH}/${id}`)
        .query(condition)
        .reply(204, resBody, { 'Content-Type': 'application/json; charset=utf-8' });

      const res = await app.httpApi.Simple.deleteOne({ ...condition, id }, opts);
      assert.deepStrictEqual(res, resBody);

    });
  });

});
