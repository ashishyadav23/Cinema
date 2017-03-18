(function () {
    'use Strict';
    angular.module('cinema')
        .controller('tvShowsWikiController', tvShowsWikiController);
    /** @ngInject */
    function tvShowsWikiController(tmdbTV, CinemaService, $location, $rootScope, $scope, $sce, $filter) {
        var vm = this;
        init();
        var param = {
            "language": "en-US",
            "page": 1
        };

        function init() {

            vm.onReadySwiper = function (swiper) {
                swiper.initObservers();
            }

            vm.selectedTv = CinemaService.getSelectedTv();
            console.log("TvShows", angular.toJson(vm.selectedTv));
            $rootScope.headerTitle = vm.selectedTv.original_name;

            vm.similarTvList = [];
            vm.castList = [];
            vm.selectedTvVideos = [];
            vm.onSelectedTv = onSelectedTv;
            loadTvShowsDetails();
        }

        function loadTvShowsDetails() {
            getSimilarTv();
            getselectedTvVideos();
            getSelectedTvCast();
        }

        function getSimilarTv() {
            tmdbTV.tv.similar(vm.selectedTv.id, param,
                function success(success) {
                    if (success.hasOwnProperty('results')) {
                        if (success.results.length > 0) {
                            vm.similarTvList = vm.similarTvList.concat(success.results);
                        }
                    }
                }, function error() {
                    console.log("error", angular.toJson(error));
                });
        }

        function getselectedTvVideos() {
            tmdbTV.tv.videos(vm.selectedTv.id, param,
                function success(success) {
                    if (success.hasOwnProperty('results')) {
                        if (success.results.length > 0) {
                            angular.forEach(success.results, function (value, key) {
                                if (value.hasOwnProperty('site')) {
                                    if (angular.equals(value.site, 'YouTube')) {
                                        var videoUrl = $sce.trustAsResourceUrl('https://www.youtube.com/embed/' + value.key + '?rel=0&amp;showinfo=0');
                                        vm.selectedTvVideos.push(videoUrl);
                                    }
                                }

                            });
                        }
                    }
                }, function error() {
                    console.log("error", angular.toJson(error));
                });
        }

        function getSelectedTvCast() {
            tmdbTV.tv.credits(vm.selectedTv.id, param,
                function success(success) {
                    if (success.hasOwnProperty('id')) {
                        if (success.cast.length > 0) {
                            vm.castList = success.cast;
                            console.log("TV castList", angular.toJson(vm.castList));

                        } else {
                            vm.castList = [];
                        }


                    }
                }, function error() {
                    console.log("error", angular.toJson(error));
                });
        }

        vm.similarTvSwiper = function (swiper) {
            swiper.initObservers();
            swiper.on('onReachEnd', function () {
                param.page++;
                getSimilarTv(param);
            });
        };


        function onSelectedTv(data) {

        }

    }
})()