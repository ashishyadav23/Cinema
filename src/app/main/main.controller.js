(function () {
  'use strict';

  angular
    .module('cinema')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(tmdbMovie, tmdbTV, tmdbApiKey, CinemaService, TvShowService, $location, $rootScope, $filter) {
    var vm = this;
    $rootScope.showToolbar = true;
    var param = {
      "language": "en-US",
      "page": 1,
      "region": "IN"
    };
    var pageCount = {
      "upComming": 0,
      "upcomingStatus": true,
      "popular": 0,
      "popularStatus": true,
      "topRated": 0,
      "topRatedStatus": true,
      "nowPlaying": 0,
      "nowPlayingStatus": true
    }

    init();
    function init() {

      /**Movies  */
      vm.currentNavItem = CinemaService.collection.currentNavItem != "" ? CinemaService.collection.currentNavItem : "movies";
      vm.navbarClick = navbarClick;
      vm.popularMovies = {
        "page": "",
        "totalPage": "",
        "list": []
      };
      vm.nowPlayingMovies = {
        "page": "",
        "totalPage": "",
        "list": []
      };
      vm.upComingMovies = {
        "page": "",
        "totalPage": "",
        "list": []
      };
      vm.topRatedMovies = {
        "page": "",
        "totalPage": "",
        "list": []
      };

      vm.selectedType = "";
      $rootScope.headerTitle = "Dashboard";
      $rootScope.direction = 0;

      loadAllMoviesData();

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
      }
    }


    function loadAllMoviesData() {
      getUpComingMovies();
      getNowPlayingMovies();
      getPopularMovies();
      getTopRatedMovies();
    }

    function navbarClick(pageId) {
      CinemaService.collection.navbarClick(pageId);
    }

    function initiliazeSwiper() {
      vm.upComingMovieSwiper = function (swiper) {
        swiper.initObservers();
        swiper.on('onReachEnd', function () {
          if (vm.upComingMovies.page < vm.upComingMovies.totalPage && pageCount.upcomingStatus) {
            pageCount.upcoming = false;
            param.page = vm.upComingMovies.page++;
            getUpComingMovies(param);
          }

        });
      };

      vm.popularMoviesSwiper = function (swiper) {
        swiper.initObservers();
        swiper.on('onReachEnd', function () {
          if (vm.popularMovies.page < vm.popularMovies.totalPage && pageCount.popularStatus) {
            pageCount.popularStatus = false;
            param.page = vm.popularMovies.page++;
            getPopularMovies(param);
          }

        });
      };

      vm.topRatedMoviesSwiper = function (swiper) {
        swiper.initObservers();
        swiper.on('onReachEnd', function () {
          if (vm.topRatedMovies.page < vm.topRatedMovies.totalPage && pageCount.topRatedStatus) {
            pageCount.topRatedStatus = false;
            param.page = vm.topRatedMovies.page++;
            getTopRatedMovies(param);

          }

        });
      };

      vm.nowPlayingMoviesSwiper = function (swiper) {
        swiper.initObservers();
        swiper.on('onReachEnd', function () {
          if (vm.nowPlayingMovies.page < vm.nowPlayingMovies.totalPage && pageCount.nowPlayingStatus) {
            pageCount.nowPlayingStatus = false;
            param.page = vm.nowPlayingMovies.page++;
            getNowPlayingMovies(param);
          }
        });
      };
    }



    vm.openMovieWiki = function (movie) {
      CinemaService.collection.setSelectedMovie(movie);
      $location.path('/movieWiki/' + movie.id);
    };

    vm.openSeeAll = function (dataList, sets) {
      CinemaService.collection.selectedSeeAllType = 0;
      CinemaService.collection.setSeeAllMovies(dataList);
      $rootScope.headerTitle = sets;
      $location.path('/seeAllList');

    }

    function setterData(request, response) {
      request.page = response.page;
      request.totalPage = response.total_pages;
      request.list = request.list.concat(response.results);
      return request;
    }

    function getPopularMovies() {
      tmdbMovie.popular(param,
        function success(success) {
          if (success.hasOwnProperty('results')) {
            if (success.results.length > 0) {
              pageCount.popularStatus = true;
              pageCount.popular = success.page;
              vm.popularMovies = setterData(vm.popularMovies, success);
            }
          }
        }, function error() {
          console.log("error", angular.toJson(error));
        });
    }

    function getTopRatedMovies() {
      tmdbMovie.topRated(param,
        function success(success) {
          if (success.hasOwnProperty('results')) {
            if (success.results.length > 0) {
              pageCount.topRated = success.page;
              pageCount.topRatedStatus = true;
              vm.topRatedMovies = setterData(vm.topRatedMovies, success);

            }
          }
        }, function error() {
          console.log("error", angular.toJson(error));
        });
    }
    function getUpComingMovies(param) {
      tmdbMovie.upcoming(param,
        function success(success, status, header) {
          if (success.hasOwnProperty('results')) {
            if (success.results.length > 0) {
              pageCount.upComming = success.page;
              pageCount.upcomingStatus = true;
              vm.upComingMovies = setterData(vm.upComingMovies, success);

            }
          }
        }, function error() {
          console.log("error", angular.toJson(error));
        });
    }
    function getNowPlayingMovies() {
      tmdbMovie.nowPlaying(param,
        function success(success, status, header) {
          if (success.hasOwnProperty('results')) {
            if (success.results.length > 0) {
              pageCount.nowPlaying = success.page;
              pageCount.nowPlayingStatus = true;
              vm.nowPlayingMovies = setterData(vm.nowPlayingMovies, success);


            }
          }
        }, function error() {
          console.log("error", angular.toJson(error));
        });
    }
  }
})();
