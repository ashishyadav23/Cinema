(function () {
    'use strict';

    angular
        .module('cinema')
        .config(routeConfig);

    function routeConfig($routeProvider) {
        $routeProvider
            .when('/seeAllList', {
                templateUrl: 'app/seeAllList/seeAllList.html',
                controller: 'SeeAllListController',
                controllerAs: 'vm'
            })
            .when('/tvShowsWiki', {
                templateUrl: 'app/tvShowsWiki/tvShowsWiki.html',
                controller: 'TvShowsWikiController',
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
