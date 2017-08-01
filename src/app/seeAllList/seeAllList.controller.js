(function () {
    'use strict';

    angular
        .module('cinema')
        .controller('SeeAllListController', SeeAllListController);

    /** @ngInject */
    function SeeAllListController(CinemaService, $location, $rootScope, $timeout) {
        var vm = this;
        $timeout(function () {
            init();
        }, 100);

        function init() {
            vm.searchQuery = "";
            $rootScope.direction = 1;
            vm.openMovieWiki = openMovieWiki;
            vm.openTvWiki = openTvWiki;
            vm.type = CinemaService.collection.selectedSeeAllType;
            if (vm.type == 0) {
                vm.seeAllList = CinemaService.collection.seeAllMovies;
            } else {
                vm.seeAllList = CinemaService.collection.seeAllTvShows;
            }
            console.log("List", vm.seeAllList);
        }

        function openMovieWiki(item) {
            CinemaService.collection.setSelectedMovie(item)
            $location.path('/movieWiki/' + item.id)
        }

        function openTvWiki(item) {
            CinemaService.collection.setSelectedTv(item)
            $location.path('/tvShowsWiki/' + item.id)
        }
        vm.reachedBottom = function () {
            alert("Hello");
        }
    }
})();
