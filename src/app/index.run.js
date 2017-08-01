(function () {
  'use strict';

  angular
    .module('cinema')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, tmdbMovie, tmdbApiKey) {

    $log.debug('runBlock end');
    tmdbMovie.setup(tmdbApiKey, true);

  }

})();
