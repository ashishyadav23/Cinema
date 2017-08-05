(function () {
    'use strict';

    angular
        .module('cinema')
        .config(routeConfig);

    function routeConfig($routeProvider) {
        $routeProvider
            .when('/seeAllList/:type/:status', {
                templateUrl: 'app/seeAllList/seeAllList.html',
                controller: 'SeeAllListController',
                controllerAs: 'vm'
            })
            .when('/tvShowsWiki/:id', {
                templateUrl: 'app/tvShowsWiki/tvShowsWiki.html',
                controller: 'TvShowsWikiController',
                controllerAs: 'vm'
            })
            .when('/movieWiki/:id', {
                templateUrl: 'app/movieWiki/movieWiki.html',
                controller: 'MovieWikiController',
                controllerAs: 'vm'
            })
            .otherwise({
                redirectTo: '/'
            });
    }

})();
