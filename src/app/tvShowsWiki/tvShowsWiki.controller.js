(function () {
    'use Strict';
    angular.module('cinema')
        .controller('TvShowsWikiController', TvShowsWikiController);
    /** @ngInject */
    function TvShowsWikiController(tmdbTV, $scope, CinemaService, $location, $rootScope, $sce, $filter, $timeout, ArtistService, $routeParams, $route) {
        var vm = this;
        init();
        var param = {
            "language": "en-US",
            "page": 1
        };
        var pageCount = {
            "similarTvShowsStatus": false
        }

        function init() {
            if (!CinemaService.collection.selectedTv) {
                getTvshowDetailsById($routeParams.id);
            } else {
                vm.openArtistWiki = openArtistWiki;
                vm.similarTvSwiper = similarTvSwiper;
                vm.renderHtml = renderHtml;
                vm.similarTvShows = {
                    "page": "",
                    "totalPage": "",
                    "list": []
                };
                clearList();
                $rootScope.direction = 1;
                vm.onReadySwiper = function (swiper) {
                    swiper.initObservers();
                }
                vm.selectedTv = CinemaService.collection.selectedTv;
                $rootScope.headerTitle = vm.selectedTv.original_name;
                loadVm();
            }

        }

        $scope.$on('refresh', function () {
            init();
        })

        function getTvshowDetailsById(id) {
            tmdbTV.tv.details(id, param, function successCallback(success) {
                if (success.hasOwnProperty('id')) {
                    CinemaService.collection.setSelectedTv(success);
                    $scope.$broadcast('refresh', success);
                }

            }, function errorCallback(error) {

            })
        }
        function clearList() {
            vm.similarTvShows = {
                "page": "",
                "list": [],
                "totalPage": ""
            }
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
            getSimilarTv(param);
            getselectedTvVideos();
            getSelectedTvCast();
        }

        function getSimilarTv(param) {
            tmdbTV.tv.similar(vm.selectedTv.id, param,
                function success(success) {
                    if (success.hasOwnProperty('results')) {
                        if (success.results.length > 0) {
                            pageCount.similarTvShowsStatus = true;
                            vm.similarTvShows = setterData(vm.similarTvShows, success);
                        }
                    }
                }, function error() {
                    console.log("error", angular.toJson(error));
                });
        }
        vm.timeConvert = function (n) {
            var num = n;
            var hours = (num / 60);
            var rhours = Math.floor(hours);
            var minutes = (hours - rhours) * 60;
            var rminutes = Math.round(minutes);
            if (rminutes == 0) {
                return rhours + " hrs"
            } else {
                return rhours + " hrs" + rminutes + " mins.";
            }

        }

        function setterData(request, response) {
            request.page = response.page;
            request.list = request.list.concat(response.results);
            request.totalPage = response.total_pages;
            return request;
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

        function similarTvSwiper(swiper) {
            swiper.initObservers();
            swiper.on('onReachEnd', function () {
                if (vm.similarTvShows.page < vm.similarTvShows.totalPage && pageCount.similarTvShowsStatus) {
                    pageCount.similarTvShowsStatus = false;
                    param.page = angular.copy(vm.arrivingShows.page) + 1;
                    getArrivingShows(param);
                }
                param.page++;
                getSimilarTv(param);
            });
        };


        function onSelectedTv(data) {
            $timeout(function () {
                clearList();
                vm.selectedTv = data;
                $rootScope.headerTitle = vm.selectedTv.original_name;
                CinemaService.collection.setSelectedTv(data);
                loadTvShowsDetails();                // $route.reload();
            }, 100);

        }

        function renderHtml(html_code) {
            return $sce.trustAsHtml(html_code);
        };

        function getShowDetails(showName) {
            vm.showDetail = {};
            vm.seasonList = [];
            var promise = CinemaService.collection.getTvShowWikiFromMaze(showName);
            promise.then(function (success) {
                vm.showDetail = success.data;
                if (vm.showDetail._embedded.episodes.length > 0) {
                    vm.seasonList = getSeasonsData(vm.showDetail._embedded.episodes);
                    console.log("VM.SESON", angular.toJson(vm.seasonList));
                }
            }, function (error) {
                console.log("data", error);
            });
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
            return seasonList.reverse();
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

        function openArtistWiki(artist) {
            console.log("artist", artist);
            ArtistService.setSelectedArtist(artist);
            $location.path('/artist/' + artist.id);
        }

    }
})()