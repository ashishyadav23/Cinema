(function () {
    'use strict';

    angular
        .module('cinema')
        .controller('TvShowsController', TvShowsController);

    /** @ngInject */
    function TvShowsController(tmdbMovie, tmdbTV, tmdbApiKey, CinemaService, TvShowService, $location, $rootScope) {
        var vm = this;
        tmdbMovie.setup(tmdbApiKey, true);
        var param = {
            "language": "en-US",
            "page": 1
        };

        init();
        function init() {

            /**TV shows  */

            vm.popularTvShows = [];
            vm.ontheAirShows = [];
            vm.arrivingShows = [];
            vm.topRatedShows = [];
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
                    param.page++;
                    getpopularTv(param);
                });
            };

            vm.topRatedShowsSwiper = function (swiper) {
                swiper.initObservers();
                swiper.on('onReachEnd', function () {
                    param.page++;
                    getTopRatedShows(param);
                });
            };

            vm.ontheAirShowsSwiper = function (swiper) {
                swiper.initObservers();
                swiper.on('onReachEnd', function () {
                    param.page++;
                    getOnTheAirShows(param);
                });
            };

            vm.arrivingShowsSwiper = function (swiper) {
                swiper.initObservers();
                swiper.on('onReachEnd', function () {
                    param.page++;
                    getArrivingShows(param);
                });
            };
        }

        vm.opentvShowsWiki = function (show) {
            CinemaService.collection.setSelectedTv(show);
            $location.path('tvShowsWiki');
        };

        vm.openSeeAll = function (dataList) {
            CinemaService.setSeeAllList(dataList);
            $location.path('/dashboard');

        }

        function getpopularTv() {
            tmdbTV.tv.popular(param,
                function success(success) {
                    if (success.hasOwnProperty('results')) {
                        if (success.results.length > 0) {
                            vm.popularTvShows = vm.popularTvShows.concat(success.results);
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
                            vm.topRatedShows = vm.topRatedShows.concat(success.results);
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
                            vm.ontheAirShows = vm.ontheAirShows.concat(success.results);
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
                            vm.arrivingShows = vm.arrivingShows.concat(success.results);
                        }
                    }
                }, function error() {
                    console.log("error", angular.toJson(error));
                });
        }
    }
})();
