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


        vm.colorTiles = (function () {
            var tiles = [];
            for (var i = 0; i < vm.seeAllMovieList.length; i++) {
                tiles.push({
                    colspan: randomSpan(),
                    rowspan: randomSpan(),
                });
            }
            return tiles;
        })();

        function randomSpan() {
            var r = Math.random();
            if (r < 0.8) {
                return 1;
            } else if (r < 0.9) {
                return 2;
            } else {
                return 3;
            }
        }

    }
})();
