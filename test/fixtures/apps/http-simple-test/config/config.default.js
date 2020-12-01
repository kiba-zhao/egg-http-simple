'use strict';

exports.keys = '123456';

exports.customLoader = {
  httpApi: {
    directory: 'app/httpApi',
    inject: 'app',
    loadunit: true,
    caseStyle: 'upper',
  },
};
