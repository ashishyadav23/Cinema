(function () {
    'use strict';

    angular
        .module('cinema')
        .controller('MovieWikiController', MovieWikiController);

    /** @ngInject */
    function MovieWikiController(tmdbMovie, CinemaService, $rootScope, $timeout, $filter, $sce, $location, ArtistService, $route) {
        var vm = this;
        var param = {
            "language": "en-US",
            "page": 1
        };
        init();

        function init() {
            console.log(window.location);

            $rootScope.direction = 1;
            vm.selectedMovie = CinemaService.collection.selectedMovie;
            console.log("SelectedMovie", vm.selectedMovie);
            $rootScope.headerTitle = vm.selectedMovie.original_title;
            vm.openArtistWiki = openArtistWiki;
            clearData();
            loadMovies();
        }
        function clearData() {
            vm.similarMoviesList = [];
            vm.recommendMoviesList = [];
            vm.cast = [];
        }


        function loadMovies() {
            getSimilarMovies();
            getRecommendedMovies();
        }


        function getSimilarMovies() {
            tmdbMovie.similar(vm.selectedMovie.id, param,
                function success(success) {

                    vm.similarMoviesList = getResponseData(success, vm.similarMoviesList);
                    $timeout(function () {
                        getVideos();
                    }, 50);

                }, function error(error) {
                    console.log("error", angular.toJson(error));
                });

        }

        function getResponseData(requestData, arrayList) {
            var responseData = [];
            if (requestData.hasOwnProperty('results')) {
                if (requestData.results.length > 0) {
                    responseData = $filter('orderBy')(arrayList.concat(requestData.results), 'vote_average');
                    return responseData;
                } else {
                    arrayList = [];
                }
            }
        }

        function getRecommendedMovies() {
            tmdbMovie.recommendations(vm.selectedMovie.id, param,
                function success(success) {
                    vm.recommendMoviesList = getResponseData(success, vm.recommendMoviesList);
                    $timeout(function () {
                        getVideos();
                    }, 50);
                }, function error() {
                    console.log("error", angular.toJson(error));
                });
        }

        function getCast() {
            tmdbMovie.credits(vm.selectedMovie.id, param,
                function success(success) {
                    if (success.hasOwnProperty('id')) {
                        if (success.cast.length > 0) {
                            vm.castList = success.cast;
                            // vm.castList = $filter('limitTo')(success.cast, 5, 0);
                            getmovieDetails();
                        } else {
                            vm.castList = [];
                        }
                    }
                }, function error() {
                    console.log("error", angular.toJson(error));
                });
        }

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
                    vm.movieDetails = success;
                }, function error() {
                    console.log("error", angular.toJson(error));
                });
        };



        vm.onReadySwiper = function (swiper) {
            swiper.initObservers();
        };

        vm.recommendMoviesListSwiper = function (swiper) {
            swiper.initObservers();
            swiper.on('onReachEnd', function () {
                param.page++;
                getRecommendedMovies(param);
            });
        }
        vm.similarMoviesListSwiper = function (swiper) {
            swiper.initObservers();
            swiper.on('onReachEnd', function () {
                param.page++;
                getSimilarMovies(param);
            });
        };


        vm.viewSelectedMovie = function (selectedItem) {
            openMovieWiki(selectedItem);
        }

        function openMovieWiki(response) {
            CinemaService.collection.setSelectedMovie(response);
            $route.reload();
        }


        function openArtistWiki(artist) {
            console.log("Artist", angular.toJson(artist));
            ArtistService.setSelectedArtist(artist);
            $location.path('/artist');
        }


    }
})();
