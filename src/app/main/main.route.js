(function () {
    'use strict';

    angular
        .module('cinema')
        .config(routeConfig);

    function routeConfig($routeProvider) {
        $routeProvider
            .when('/dashboard', {
                templateUrl: 'app/dashboard/dashboard.html',
                controller: 'DashboardController',
                controllerAs: 'vm'
            })
            .when('/tvShowsWiki', {
                templateUrl: 'app/tvShowsWiki/tvShowsWiki.html',
                controller: 'tvShowsWikiController',
                controllerAs: 'vm'
            })
            .when('/movieWiki', {
                templateUrl: 'app/movieWiki/movieWiki.html',
                controller: 'MovieWikiController',
                controllerAs: 'vm'
            })
            .otherwise({
                redirectTo: '/'
            });
    }

})();