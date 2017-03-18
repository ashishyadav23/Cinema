(function () {
    'use strict';

    angular
        .module('cinema')
        .controller('MovieWikiController', MovieWikiController);

    /** @ngInject */
    function MovieWikiController(tmdbMovie,CinemaService, $rootScope, $timeout, $filter, $sce,$location,movieWikiService) {
        var vm = this;
        var param = {
            "language": "en-US",
        };

        init();

        function init() {
            vm.selectedMovie = CinemaService.getSelectedMovie();
            $rootScope.headerTitle = vm.selectedMovie.original_title;
            vm.openArtistWiki = openArtistWiki;
            getSimilarMovies();
        }

        function getSimilarMovies() {
            tmdbMovie.similar(vm.selectedMovie.id, param,
                function success(success) {
                    if (success.hasOwnProperty('results')) {
                        if (success.results.length > 0) {
                            vm.similarMoviesList = success.results;
                            console.log("vm.similarMoviesList", angular.toJson(vm.similarMoviesList));
                            $timeout(function () {
                                getVideos();
                            }, 50);

                        } else {
                            vm.similarMoviesList = [];
                        }


                    }
                }, function error() {
                    console.log("error", angular.toJson(error));
                });

        }


        function getCast() {
            tmdbMovie.credits(vm.selectedMovie.id, param,
                function success(success) {
                    if (success.hasOwnProperty('id')) {
                        if (success.cast.length > 0) {
                            vm.castList = $filter('limitTo')(success.cast, 5, 0);
                            getmovieDetails();
                        } else {
                            vm.castList = [];
                        }


                    }
                }, function error() {
                    console.log("error", angular.toJson(error));
                });
        };

        function getVideos() {
            tmdbMovie.videos(vm.selectedMovie.id, param,
                function success(success) {
                    if (success.hasOwnProperty('results')) {
                        var keepGoing = true;
                        if (success.results.length > 1) {
                            var outputVideo = $filter('limitTo')(success.results, 5, 0);
                            angular.forEach(success.results, function (value, key) {
                                if (keepGoing) {
                                    if (value.name.includes('Official')) {
                                        vm.videoUrl = $sce.trustAsResourceUrl('https://www.youtube.com/embed/' + value.key + '?rel=0&amp;showinfo=0');
                                        keepGoing = false;
                                    }
                                }

                            });
                        } else {
                            vm.videoUrl = "";
                        }


                        console.log("vm.similarMoviesList", angular.toJson(vm.similarMoviesList));
                        getCast();

                    }
                }, function error() {
                    console.log("error", angular.toJson(error));
                });
        }

        function getmovieDetails() {
            tmdbMovie.details(vm.selectedMovie.id, param,
                function success(success) {
                    console.log("getmovieDetails", angular.toJson(success));
                    vm.movieDetails = success;
                }, function error() {
                    console.log("error", angular.toJson(error));
                });
        };



        vm.onReadySwiper = function (swiper) {
            swiper.initObservers();
        };

        vm.viewSelectedMovie = function (selectedItem) {
            openMovieWiki(selectedItem);
        }

        function openMovieWiki(response) {
            $timeout(function () {
                vm.selectedMovie = response;
                $rootScope.headerTitle = response.original_title;
                getSimilarMovies();
            }, 100);


            CinemaService.setSelectedMovie(response);
        }

        function openArtistWiki(artist) {
            console.log("Artist", angular.toJson(artist));
            movieWikiService.setSelectedArtist(artist);
            $location.path('/artist');
        }


    }
})();
