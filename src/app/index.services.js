(function () {
    'use strict';

    angular.module('cinema')
        .service('CinemaService', CinemaService);
    function CinemaService($location, $q, $http) {
        var appService = this;
        appService.collection = {
            "nowPlaying": "",
            "selectedSeeAllType": '',
            "setNowPlaying": setNowPlaying,
            "selectedMovie": "",
            "setSelectedMovie": setSelectedMovie,
            "seeAllMovies": [],
            "setSeeAllMovies": setSeeAllMovies,
            "seeAllTvShows": [],
            "setSeeAllTvShows": setSeeAllTvShows,
            "navbarClick": navbarClick,
            "selectedTv": "",
            "setSelectedTv": setSelectedTv,
            "currentNavItem": "",
            "getTvShowWikiFromMaze": getTvShowWikiFromMaze

        }
        return appService;

        function setNowPlaying(response) {
            appService.collection.nowPlaying = response;
        }

        function setSelectedMovie(response) {
            appService.collection.selectedMovie = response;
        }
        function setSelectedTv(response) {
            appService.collection.selectedTv = response;
        }

        function setSeeAllMovies(response) {
            appService.collection.seeAllMovies = response;
        }

        function setSeeAllTvShows(response) {
            appService.collection.seeAllTvShows = response;
        }


        function navbarClick(pageId) {
            if (angular.equals(pageId, 1)) {
                appService.collection.currentNavItem = 'movies';
                $location.path('/dashboard').replace();
            } else if (angular.equals(pageId, 2)) {
                appService.collection.currentNavItem = 'tvshows';
                $location.path('/tvshows/tvshows').replace();;
            }
        }

        function getTvShowWikiFromMaze(query) {
            var deferred = $q.defer();
            // http://api.tvmaze.com/search/shows?q=game%20of%20thrones
            var url = 'http://api.tvmaze.com/singlesearch/shows?embed=episodes&q=' + query;
            $http.get(url).then(function (success) {
                deferred.resolve(success);
            }, function (error) {
                deferred.reject(error);
            })
            return deferred.promise;

        }

    }


})();
