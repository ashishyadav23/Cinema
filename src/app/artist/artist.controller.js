(function () {
    'use Strict';
    angular.module('cinema')
        .controller('ArtistController', ArtistController);
    /** @ngInject */
    function ArtistController(tmdbTV, CinemaService, $location, $rootScope, $scope, $sce, $filter, movieWikiService, tmdbMovie) {
        var vm = this;
        var param = {
            "language": "en-US",
            "page": 1,
            "with_people": 0
        };
        init();

        function init() {
            vm.artistBio = "";
            vm.artistMovies = [];
            vm.selectedArtist = movieWikiService.getSelectedArtist();

            if (angular.isDefined(vm.selectedArtist)) {
                loadData();
            }
        }

        vm.artistMoviesSwiper = function (swiper) {
            swiper.initObservers();
            swiper.on('onReachEnd', function () {
                param.page++;
                getmovies();
            });
        };

        function loadData() {
            getmovies();
            getBio();
        }

        function getmovies() {
            param.with_people = vm.selectedArtist.id;
            tmdbMovie.discover(param,
                function success(success) {
                    if (success.hasOwnProperty('results')) {
                        if (success.results.length > 0) {
                            vm.artistMovies = vm.artistMovies.concat(success.results);
                        }
                    }
                }, function error() {
                    console.log("error", angular.toJson(error));
                });
        }

        function getBio() {
            movieWikiService.getArtistInfo(vm.selectedArtist.id).then(successCallback, errorCallback);
            function successCallback(successBio) {
                console.log("artist bio", angular.toJson(successBio));
            }
            function errorCallback(error) {
                console.log("artist bio", angular.toJson(error));
            }
        }

        vm.openMovieWiki = function (movie) {
            CinemaService.setSelectedMovie(movie);
            $location.path('/movieWiki');
        }

    }
})()