(function () {
    'use strict';

    angular
        .module('cinema')
        .controller('MoviesListController', MoviesListController);

    /** @ngInject */
    function MoviesListController(CinemaService, $location, $rootScope) {
        var vm = this;
        init();
        function init() {
            $rootScope.headerTitle = "Dashboard"
            vm.openMovieWiki = openMovieWiki
            vm.seeAllMovieList = CinemaService.collection.seeAllMovies;
        }

        function openMovieWiki(item) {
            CinemaService.setSelectedMovie(item)
            $location.path('/movieWiki')
        }

    }
})();
