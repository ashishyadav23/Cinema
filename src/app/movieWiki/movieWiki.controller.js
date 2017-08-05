(function () {
    'use strict';

    angular
        .module('cinema')
        .controller('MovieWikiController', MovieWikiController);

    /** @ngInject */
    function MovieWikiController(tmdbMovie, CinemaService, $scope, $rootScope, $timeout, $filter, $sce, $location, ArtistService, $routeParams,$route) {
        var vm = this;
        var param = {
            "language": "en-US",
            "page": 1
        };
        var pageCount = {
            "recommendStatus": false,
            "similarStatus": false
        }
        init();

        function init() {

            if (!CinemaService.collection.selectedMovie) {
                getMovieDetailsById($routeParams.id);
            } else {
                $rootScope.direction = 1;
                vm.selectedMovie = CinemaService.collection.selectedMovie;
                console.log("SelectedMovie", vm.selectedMovie);
                $rootScope.headerTitle = vm.selectedMovie.title;
                vm.openArtistWiki = openArtistWiki;
                vm.openGenre = openGenre;
                clearData();
                loadMovies();
            }


        }

        $scope.$on('refresh', function ($event, data) {
            init();
        });

        function openGenre(genre) {

        }

        function getMovieDetailsById(id) {
            tmdbMovie.details(id, param, function successCallback(success) {
                CinemaService.collection.setSelectedMovie(success);
                $scope.$broadcast('refresh', success);
            }, function errorCallback() {
                App
            });
        }
        function clearData() {
            vm.similarMoviesList = {
                "page": "",
                "list": [],
                "totalPage": ""
            }
            vm.recommendMoviesList = {
                "page": "",
                "list": [],
                "totalPage": ""
            }
            vm.cast = [];
        }


        function loadMovies() {
            getSimilarMovies();
            getRecommendedMovies();
        }


        function getSimilarMovies() {
            tmdbMovie.similar(vm.selectedMovie.id, param,
                function success(success) {
                    if (success.hasOwnProperty("results")) {
                        if (success.results.length > 0) {
                            pageCount.similarStatus = true;
                            getResponseData(success, vm.similarMoviesList);
                            $timeout(function () {
                                getVideos();
                            }, 50);
                        }
                    }
                }, function error(error) {
                    console.log("error", angular.toJson(error));
                });

        }

        function getResponseData(requestData, arrayList) {
            arrayList.page = requestData.page;
            arrayList.totalPage = requestData.total_pages;
            arrayList.list = arrayList.list.concat(requestData.results);
        }

        function getRecommendedMovies() {
            tmdbMovie.recommendations(vm.selectedMovie.id, param,
                function success(success) {
                    if (success.hasOwnProperty("results")) {
                        if (success.results.length > 0) {
                            pageCount.recommendStatus = true;
                            getResponseData(success, vm.recommendMoviesList);
                            $timeout(function () {
                                getVideos();
                            }, 50);
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
                            vm.castList = success.cast;
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
                if (vm.recommendMoviesList.page < vm.recommendMoviesList.totalPage && pageCount.recommendStatus) {
                    pageCount.recommendStatus = false;
                    param.page = angular.copy(vm.recommendMoviesList.page) + 1;
                    getRecommendedMovies(param);
                }
            });
        }
        vm.similarMoviesListSwiper = function (swiper) {
            swiper.initObservers();
            swiper.on('onReachEnd', function () {
                if (vm.similarMoviesList.page < vm.similarMoviesList.totalPage && pageCount.similarStatus) {
                    pageCount.similarStatus = false;
                    param.page = angular.copy(vm.similarMoviesList.page) + 1;
                    getSimilarMovies(param);
                }
            });
        };


        vm.viewSelectedMovie = function (selectedItem) {
            openMovieWiki(selectedItem);
        }

        function openMovieWiki(response) {
            CinemaService.collection.setSelectedMovie(response);
            $location.path('/movieWiki/' + response.id);
            // $route.reload();
        }


        function openArtistWiki(artist) {
            console.log("Artist", angular.toJson(artist));
            ArtistService.setSelectedArtist(artist);
            $location.path('/artist');
        }


    }
})();
