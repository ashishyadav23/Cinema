(function() {
  'use strict';

  angular
    .module('cinema')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
