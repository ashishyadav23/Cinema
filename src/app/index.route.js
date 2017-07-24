(function () {
  'use strict';

  angular
    .module('cinema')
    .config(routeConfig);

  function routeConfig($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'vm'
      })
      .when('/artist', {
        templateUrl: 'app/artist/artist.html',
        controller: 'ArtistController',
        controllerAs: 'vm'
      })
      .when('/tvshows', {
        templateUrl: 'app/tvshows/tvshows.html',
        controller: 'TvShowsController',
        controllerAs: 'vm'
      })
      // .when('/people', {
      //   templateUrl: 'app/people/people.html',
      //   controller: 'PeopleController',
      //   controllerAs: 'vm'
      // })
      // .when('/Tvshows', {
      //   templateUrl: 'app/AllTvshows/tvshows.html',
      //   controller: 'TvShowsController',
      //   controllerAs: 'vm'
      // })
      // .when('/Movies', {
      //   templateUrl: 'app/AllMovies/tvshows.html',
      //   controller: 'TvShowsController',
      //   controllerAs: 'vm'
      // })
      .otherwise({
        redirectTo: '/'
      });
  }

})();
