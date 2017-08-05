(function () {
    'use strict';

    angular
        .module('cinema')
        .controller('SeeAllListController', SeeAllListController);

    /** @ngInject */
    function SeeAllListController(CinemaService, $scope, tmdbMovie, tmdbTV, $location, $rootScope, $timeout, $routeParams, $route) {
        var vm = this;
        var param = {
            "language": "en-US",
            "page": 1,
            "region": "IN"
        };
        $timeout(function () {
            init();
        }, 100);

        function init() {
            vm.searchQuery = "";
            $rootScope.direction = 1;
            vm.openMovieWiki = openMovieWiki;
            vm.openTvWiki = openTvWiki;
            if (CinemaService.collection.seeAllMovies == "" && CinemaService.collection.seeAllTvShows=="") {
                vm.seeAllList = {
                    "page": "",
                    "list": [],
                    "totalPage": ""
                }
                callWhenPageRefresh();

            } else {
                vm.type = CinemaService.collection.selectedSeeAllType;
                if (vm.type == 0) {
                    vm.seeAllList = CinemaService.collection.seeAllMovies;
                } else {
                    vm.seeAllList = CinemaService.collection.seeAllTvShows;
                }
                console.log("List", vm.seeAllList);
            }
        }

        function callWhenPageRefresh() {
            var jsonObject = {
                "type": $routeParams.type,
                "status": $routeParams.status
            }
            console.log("params", angular.toJson(jsonObject));
            if (jsonObject.status == "0") {
                switch (jsonObject.type) {
                    case 'upcoming_movies':
                        getUpComingMovies(jsonObject.status);
                        break;
                    case 'top_rated_movies':
                        getTopRatedMovies(jsonObject.status);
                        break;
                    case 'now_playing_movies':
                        getNowPlayingMovies(jsonObject.status);
                        break;
                    case 'popular_movies':
                        getPopularMovies(jsonObject.status);
                        break;
                }
            } else {
                switch (jsonObject.type) {
                    case 'popular_shows':
                        getpopularTv(jsonObject.status);
                        break;
                    case 'top_rated_shows':
                        getTopRatedShows(jsonObject.status);
                        break;
                    case 'on_the_air_shows':
                        getOnTheAirShows(jsonObject.status);
                        break;
                    case 'arriving_today_shows':
                        getArrivingShows(jsonObject.status);
                        break;
                }

            }

        }
        function setterData(request, response) {
            request.page = response.page;
            request.totalPage = response.total_pages;
            request.list = request.list.concat(response.results);
            return request;
        }

        function reinit(typeStatus, success) {
            CinemaService.collection.selectedSeeAllType = parseInt(typeStatus);
            var jsonObject = {
                "page": success.page,
                "list": success.results,
                "totalPage": success.total_pages
            }
            if (CinemaService.collection.selectedSeeAllType == 0) {
                CinemaService.collection.setSeeAllMovies(jsonObject);
            } else {
                CinemaService.collection.setSeeAllTvShows(jsonObject);
            }
            $route.reload();

        }

        function getPopularMovies(typeStatus) {
            tmdbMovie.popular(param,
                function success(success) {
                    if (success.hasOwnProperty('results')) {
                        if (success.results.length > 0) {
                            if (angular.isDefined(typeStatus)) {
                                reinit(typeStatus, success);
                            } else {
                                vm.seeAllList = setterData(vm.seeAllList, success);
                            }
                        }
                    }
                }, function error() {
                    console.log("error", angular.toJson(error));
                });
        }

        function getTopRatedMovies(typeStatus) {
            tmdbMovie.topRated(param,
                function success(success) {
                    if (success.hasOwnProperty('results')) {
                        if (success.results.length > 0) {
                            if (angular.isDefined(typeStatus)) {
                                reinit(typeStatus, success);
                            } else {
                                vm.seeAllList = setterData(vm.seeAllList, success);
                            }
                        }
                    }
                }, function error() {
                    console.log("error", angular.toJson(error));
                });
        }
        function getUpComingMovies(typeStatus) {
            tmdbMovie.upcoming(param,
                function success(success, status, header) {
                    if (success.hasOwnProperty('results')) {
                        if (success.results.length > 0) {
                            if (angular.isDefined(typeStatus)) {
                                reinit(typeStatus, success);
                            } else {
                                vm.seeAllList = setterData(vm.seeAllList, success);
                            }
                        }
                    }
                }, function error() {
                    console.log("error", angular.toJson(error));
                });
        }
        function getNowPlayingMovies(typeStatus) {
            tmdbMovie.nowPlaying(param,
                function success(success, status, header) {
                    if (success.hasOwnProperty('results')) {
                        if (success.results.length > 0) {
                            if (angular.isDefined(typeStatus)) {
                                reinit(typeStatus, success);
                            } else {
                                vm.seeAllList = setterData(vm.seeAllList, success);
                            }
                        }
                    }
                }, function error() {
                    console.log("error", angular.toJson(error));
                });
        }
        function getpopularTv(typeStatus) {
            tmdbTV.tv.popular(param,
                function success(success) {
                    if (success.hasOwnProperty('results')) {
                        if (success.results.length > 0) {
                            if (angular.isDefined(typeStatus)) {
                                reinit(typeStatus, success);
                            } else {
                                vm.seeAllList = setterData(vm.seeAllList, success);
                            }
                        }
                    }
                }, function error() {
                    console.log("error", angular.toJson(error));
                });
        }

        function getTopRatedShows(typeStatus) {
            tmdbTV.tv.topRated(param,
                function success(success) {
                    if (success.hasOwnProperty('results')) {
                        if (success.results.length > 0) {
                            if (angular.isDefined(typeStatus)) {
                                reinit(typeStatus, success);
                            } else {
                                vm.seeAllList = setterData(vm.seeAllList, success);
                            }
                        }
                    }
                }, function error() {
                    console.log("error", angular.toJson(error));
                });
        }

        function getOnTheAirShows(typeStatus) {
            tmdbTV.tv.onAir(param,
                function success(success) {
                    if (success.hasOwnProperty('results')) {
                        if (success.results.length > 0) {
                            if (angular.isDefined(typeStatus)) {
                                reinit(typeStatus, success);
                            } else {
                                vm.seeAllList = setterData(vm.seeAllList, success);
                            }
                        }
                    }
                }, function error() {
                    console.log("error", angular.toJson(error));
                });
        }

        function getArrivingShowss(typeStatus) {
            tmdbTV.tv.onAirToday(param,
                function success(success) {
                    if (success.hasOwnProperty('results')) {
                        if (success.results.length > 0) {
                            if (angular.isDefined(typeStatus)) {
                                reinit(typeStatus, success);
                            } else {
                                vm.seeAllList = setterData(vm.seeAllList, success);
                            }
                        }
                    }
                }, function error() {
                    console.log("error", angular.toJson(error));
                });
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
