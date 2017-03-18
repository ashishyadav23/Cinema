(function () {
    'use strict';

    angular
        .module('cinema')
        .config(routeConfig);

    function routeConfig($routeProvider) {
        $routeProvider
            .otherwise({
                redirectTo: '/'
            });
    }

})();
