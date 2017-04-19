(function () {
    'use Strict';
    angular.module('cinema')
        .controller('tvShowsWikiController', tvShowsWikiController);
    /** @ngInject */
    function tvShowsWikiController(tmdbTV, TvShowService, $location, $rootScope, $sce, $filter, $timeout) {
        var vm = this;
        init();
        loadVm();
        var param = {
            "language": "en-US",
            "page": 1
        };

        function init() {
            $rootScope.direction = 1;
            vm.onReadySwiper = function (swiper) {
                swiper.initObservers();
            }

            vm.selectedTv = TvShowService.getSelectedTv();
            $rootScope.headerTitle = vm.selectedTv.original_name;

            clearList();

        }
        function clearList() {
            vm.similarTvList = [];
            vm.castList = [];
            vm.selectedTvVideos = [];
            vm.showDetail = {};
        }

        function loadVm() {
            vm.onSelectedTv = onSelectedTv;
            loadTvShowsDetails();
        }

        function loadTvShowsDetails() {
            getShowDetails(vm.selectedTv.original_name);
            getSeasonsData();
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
                        } else {
                            vm.selectedTvVideos = [];
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
            $timeout(function () {
                clearList();
                vm.selectedTv = data;
                $rootScope.headerTitle = vm.selectedTv.original_name;
                TvShowService.setSelectedTv(data);
                loadTvShowsDetails();
            }, 100);

        }

        vm.renderHtml = function (html_code) {
            return $sce.trustAsHtml(html_code);
        };

        function getShowDetails(showName) {
            vm.showDetail = {};
            vm.seasonList = [];
            TvShowService.getTvShowWikiFromMaze(showName).then(successCallback, errorCallback);
            function successCallback(success) {
                vm.showDetail = success.data;
                if (vm.showDetail._embedded.episodes.length > 0) {
                    vm.seasonList = getSeasonsData(vm.showDetail._embedded.episodes);
                    console.log("VM.SESON", angular.toJson(vm.seasonList));
                }
            }
            function errorCallback(error) {
            }
        }

        // _embedded.episodes
        function getSeasonsData(arrayList) {
            var seasonList = [];
            var seasons = {};
            seasons['image'] = '';
            seasons['headerTag'] = 'season';
            seasons['episodesList'] = [];
            seasons['id'] = '';
            angular.forEach(arrayList, function (value, key) {
                if (dataExists(seasonList, value)) {
                    // var position = seasonList.findIndex(function (x) {
                    //     return x.id === value.season;
                    // });
                    var position = getIndex(seasonList, value);
                    seasonList[position].episodesList.push(value);

                } else {
                    var seasons = {};
                    seasons['image'] = value.image ? value.image.medium : '';
                    seasons['headerTag'] = 'season' + '' + value.season ? value.season : '';
                    seasons['episodesList'] = [value];
                    seasons['id'] = value.season ? value.season : '';
                    seasonList.push(seasons);
                }
            });
            return seasonList;
        }

        function getIndex(arrayList, item) {
            for (var position = 0; position < arrayList.length; position++) {
                var element = arrayList[position];
                if (element.id === item.season) {
                    return position;
                }

            }
        }

        function dataExists(seasonList, item) {
            return seasonList.some(function (el) {
                return el.id === item.season;
            })
        }

    }
})()