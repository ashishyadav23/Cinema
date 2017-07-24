(function () {
  'use strict';

  angular
    .module('cinema')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(tmdbMovie, tmdbTV, tmdbApiKey, CinemaService, TvShowService, $location, $rootScope, $filter) {
    var vm = this;
    tmdbMovie.setup(tmdbApiKey, true);
    var param = {
      "language": "en-US",
      "page": 1
    };

    init();
    function init() {

      /**Movies  */
      vm.currentNavItem = CinemaService.collection.currentNavItem != "" ? CinemaService.collection.currentNavItem : "movies";
      vm.navbarClick = navbarClick;
      vm.popularMovies = [];
      vm.nowPlayingMovies = [];
      vm.upComingMovies = [];
      vm.topRatedMovies = [];

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
          param.page++;
          getUpComingMovies(param);
        });
      };

      vm.popularMoviesSwiper = function (swiper) {
        swiper.initObservers();
        swiper.on('onReachEnd', function () {
          param.page++;
          getPopularMovies(param);
        });
      };

      vm.topRatedMoviesSwiper = function (swiper) {
        swiper.initObservers();
        swiper.on('onReachEnd', function () {
          param.page++;
          getTopRatedMovies(param);
        });
      };

      vm.nowPlayingMoviesSwiper = function (swiper) {
        swiper.initObservers();
        swiper.on('onReachEnd', function () {
          param.page++;
          getNowPlayingMovies(param);
        });
      };
    }



    vm.openMovieWiki = function (movie) {
      CinemaService.collection.setSelectedMovie(movie);
      $location.path('/movieWiki');
    };

    vm.openSeeAll = function (dataList,sets) {
      CinemaService.collection.selectedSeeAllType = 0;
      CinemaService.collection.setSeeAllMovies(dataList);
      $rootScope.headerTitle = sets;
      $location.path('/seeAllList');

    }


    function getPopularMovies() {
      tmdbMovie.popular(param,
        function success(success) {
          if (success.hasOwnProperty('results')) {
            if (success.results.length > 0) {
              vm.popularMovies = $filter('orderBy')(vm.popularMovies.concat(success.results), 'vote_average');
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
              vm.topRatedMovies = $filter('orderBy')(vm.topRatedMovies.concat(success.results), 'vote_average');
            }
          }
        }, function error() {
          console.log("error", angular.toJson(error));
        });
    }
    function getUpComingMovies(param) {
      tmdbMovie.upcoming(param,
        function success(success) {
          if (success.hasOwnProperty('results')) {
            if (success.results.length > 0) {
              vm.upComingMovies = $filter('orderBy')(vm.upComingMovies.concat(success.results), 'vote_average');
            }
          }
        }, function error() {
          console.log("error", angular.toJson(error));
        });
    }
    function getNowPlayingMovies() {
      tmdbMovie.nowPlaying(param,
        function success(success) {
          if (success.hasOwnProperty('results')) {
            if (success.results.length > 0) {
              vm.nowPlayingMovies = $filter('orderBy')(vm.nowPlayingMovies.concat(success.results), 'vote_average');

            }
          }
        }, function error() {
          console.log("error", angular.toJson(error));
        });
    }
  }
})();
