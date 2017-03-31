(function () {
    'use strict';

    angular
        .module('cinema')
       .controller('DashboardController', DashboardController);

    /** @ngInject */
    function DashboardController($scope, webDevTec, toastr, tmdbMovie, tmdbTV, tmdbApiKey, CinemaService, $location, $rootScope) {
        var vm = this;
        init();
        function init() {
            $rootScope.headerTitle = "Dashboard";
            vm.openMovieWiki = openMovieWiki;
            vm.seeAllMovieList = CinemaService.getSeeAllList();
        }

        function openMovieWiki(item) {
            CinemaService.setSelectedMovie(item);
            $location.path('/movieWiki');
        }
    }
})();
