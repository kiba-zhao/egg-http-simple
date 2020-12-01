'use strict';

/**
 * egg-http-simple default config
 * @member Config#httpSimple
 * @property {String} SOME_KEY - some description
 */
exports.httpSimple = {
  inject: {
    'App-ID': [ 'appId' ],
    'Auth-ID': [ 'authId' ],
  },
  dataType: 'json',
  contentType: 'json',
};
