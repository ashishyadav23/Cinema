(function () {
  'use strict';

  angular
    .module('cinema')


    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(tmdbMovie, tmdbTV, tmdbApiKey, CinemaService, $location, $rootScope) {
    var vm = this;
    tmdbMovie.setup(tmdbApiKey, true);
    var param = {
      "language": "en-US",
      "page": 1
    };

    init();
    function init() {

      /**Movies  */
      vm.popularMovies = [];
      vm.nowPlayingMovies = [];
      vm.upComingMovies = [];
      vm.topRatedMovies = [];

      /**TV shows  */

      vm.popularTvShows = [];
      vm.ontheAirShows = [];
      vm.arrivingShows = [];
      vm.topRatedShows = [];

      vm.selectedType = "";
      vm.getDataOntype = getDataOntype;
      $rootScope.headerTitle = "Dashboard";
      loadAllShowsData();

      loadAllMoviesData();

      initiliazeSwiper();

    }

    function loadAllMoviesData() {
      getUpComingMovies();
      getNowPlayingMovies();
      getPopularMovies();
      getTopRatedMovies();

      // loadAllShowsData();
    }

    function loadAllShowsData() {
      getpopularTv();
      getTopRatedShows();
      getArrivingShows();
      getOnTheAirShows();
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



    vm.openMovieWiki = function (movie) {
      CinemaService.setSelectedMovie(movie);
      $location.path('/movieWiki');
    };

    vm.opentvShowsWiki = function (show) {
      CinemaService.setSelectedTv(show);
      $location.path('tvShowsWiki');
    };

    vm.openSeeAll = function (dataList) {
      CinemaService.setSeeAllList(dataList);
      $location.path('/dashboard');

    }


    function getPopularMovies() {
      tmdbMovie.popular(param,
        function success(success) {
          if (success.hasOwnProperty('results')) {
            if (success.results.length > 0) {
              vm.popularMovies = vm.popularMovies.concat(success.results);
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
              vm.topRatedMovies = vm.topRatedMovies.concat(success.results);
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
              vm.upComingMovies = vm.upComingMovies.concat(success.results);
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
              vm.nowPlayingMovies = vm.nowPlayingMovies.concat(success.results);
            }
          }
        }, function error() {
          console.log("error", angular.toJson(error));
        });
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

    function getDataOntype(type) {
      if (type == 0) {
        vm.selectedType = "All Movies";
        // loadAllMoviesData();


      } else {
        vm.selectedType = "All Tv Shows";
        // loadAllShowsData();


      }
    }

  }
})();