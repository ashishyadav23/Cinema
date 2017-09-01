(function () {
    'use strict';

    angular
        .module('cinema')
        .controller('TvShowsController', TvShowsController);

    /** @ngInject */
    function TvShowsController(tmdbMovie, $scope, tmdbTV, tmdbApiKey, CinemaService, TvShowService, $location, $rootScope, $routeParams) {
        var vm = this;
        tmdbMovie.setup(tmdbApiKey, true);
        var param = {
            "language": "en-US",
            "page": 1
        };
        var pageCount = {
            "arrivingStatus": false,
            "popularStatus": false,
            "topRatedStatus": false,
            "onTheAirStatus": false
        }

        init();
        function init() {

            if (!CinemaService.collection.currentNavItem) {
                $scope.$broadcast('refresh', $routeParams.key);

            } else {
                /**TV shows  */

                vm.popularTvShows = {
                    "page": "",
                    "totalPage": "",
                    "list": []
                };
                vm.ontheAirShows = {
                    "page": "",
                    "totalPage": "",
                    "list": []
                };
                vm.arrivingShows = {
                    "page": "",
                    "totalPage": "",
                    "list": []
                };
                vm.topRatedShows = {
                    "page": "",
                    "totalPage": "",
                    "list": []
                };
                vm.currentNavItem = CinemaService.collection.currentNavItem;
                vm.navbarClick = navbarClick;
                $rootScope.headerTitle = "Dashboard";
                $rootScope.direction = 0;
                loadAllShowsData();
                initiliazeSwiper();

                // if (window.cordova) {
                var admobid = {};
                if (/(android)/i.test(navigator.userAgent)) { // for android & amazon-fireos
                    admobid = {
                        banner: 'ca-app-pub-xxx/xxx', // or DFP format "/6253334/dfp_example_ad"
                        interstitial: 'ca-app-pub-xxx/yyy'
                    };
                    console.log(1);
                } else if (/(ipod|iphone|ipad)/i.test(navigator.userAgent)) { // for ios
                    admobid = {
                        banner: 'ca-app-pub-xxx/zzz', // or DFP format "/6253334/dfp_example_ad"
                        interstitial: 'ca-app-pub-xxx/kkk'
                    };
                    console.log(2);
                } else { // for windows phone
                    admobid = {
                        banner: 'ca-app-pub-xxx/zzz', // or DFP format "/6253334/dfp_example_ad"
                        interstitial: 'ca-app-pub-xxx/kkk'
                    };
                    console.log(3);
                }
            }

        }

        $scope.$on('refresh', function (data) {
            CinemaService.collection.currentNavItem = data;
            init();
        })

        function loadAllShowsData() {
            getpopularTv();
            getTopRatedShows();
            getArrivingShows();
            getOnTheAirShows();
        }

        function navbarClick(pageId) {
            CinemaService.collection.navbarClick(pageId);
        }

        function initiliazeSwiper() {
            vm.popularShowsSwiper = function (swiper) {
                swiper.initObservers();
                swiper.on('onReachEnd', function () {
                    if (vm.popularTvShows.page < vm.popularTvShows.totalPage && pageCount.popularStatus) {
                        pageCount.popularStatus = false;
                        param.page = angular.copy(vm.popularTvShows.page) + 1;
                        getpopularTv(param);
                    }

                });
            };

            vm.topRatedShowsSwiper = function (swiper) {
                swiper.initObservers();
                swiper.on('onReachEnd', function () {
                    if (vm.topRatedShows.page < vm.topRatedShows.totalPage && pageCount.topRatedStatus) {
                        pageCount.topRatedStatus = false;
                        param.page = angular.copy(vm.topRatedShows.page) + 1;
                        getTopRatedShows(param);
                    }
                });
            };

            vm.ontheAirShowsSwiper = function (swiper) {
                swiper.initObservers();
                swiper.on('onReachEnd', function () {
                    if (vm.ontheAirShows.page < vm.ontheAirShows.totalPage && pageCount.onTheAirStatus) {
                        pageCount.onTheAirStatus = false;
                        param.page = angular.copy(vm.ontheAirShows.page) + 1;
                        getOnTheAirShows(param);
                    }
                });
            };

            vm.arrivingShowsSwiper = function (swiper) {
                swiper.initObservers();
                swiper.on('onReachEnd', function () {
                    if (vm.arrivingShows.page < vm.arrivingShows.totalPage && pageCount.arrivingStatus) {
                        pageCount.arrivingStatus = false;
                        param.page = angular.copy(vm.arrivingShows.page) + 1;
                        getArrivingShows(param);
                    }
                });
            };
        }

        vm.opentvShowsWiki = function (show) {
            CinemaService.collection.setSelectedTv(show);
            $location.path('tvShowsWiki/' + show.id);
        };

        vm.openSeeAll = function (dataList, headerTitle, params) {
            var jsonObject = {
                "type": params,
                "status": 1
            }
            CinemaService.collection.selectedSeeAllType = 1;
            CinemaService.collection.setSeeAllTvShows(dataList);
            $rootScope.headerTitle = headerTitle;
            $location.path('/seeAllList/' + params+"/"+1);

        }
        function setterData(request, response) {
            request.page = response.page;
            request.list = request.list.concat(response.results);
            request.totalPage = response.total_pages;
            return request;
        }

        function getpopularTv() {
            tmdbTV.tv.popular(param,
                function success(success) {
                    if (success.hasOwnProperty('results')) {
                        if (success.results.length > 0) {
                            pageCount.popularStatus = true;
                            vm.popularTvShows = setterData(vm.popularTvShows, success);
                        }
                    }
                }, function error() {
                    console.log("error", angular.toJson(error));
                });
        }

        function getTopRatedShows() {
            tmdbTV.tv.topRated(param,
                function success(success) {
                    if (success.hasOwnProperty('results')) {
                        if (success.results.length > 0) {
                            pageCount.topRatedStatus = true;
                            vm.topRatedShows = setterData(vm.topRatedShows, success);
                        }
                    }
                }, function error() {
                    console.log("error", angular.toJson(error));
                });
        }

        function getOnTheAirShows() {
            tmdbTV.tv.onAir(param,
                function success(success) {
                    if (success.hasOwnProperty('results')) {
                        if (success.results.length > 0) {
                            pageCount.onTheAirStatus = true;
                            vm.ontheAirShows = setterData(vm.ontheAirShows, success);
                        }
                    }
                }, function error() {
                    console.log("error", angular.toJson(error));
                });
        }

        function getArrivingShows() {
            tmdbTV.tv.onAirToday(param,
                function success(success) {
                    if (success.hasOwnProperty('results')) {
                        if (success.results.length > 0) {
                            pageCount.arrivingStatus = true;
                            vm.arrivingShows = setterData(vm.arrivingShows, success);
                        }
                    }
                }, function error() {
                    console.log("error", angular.toJson(error));
                });
        }
    }
})();
