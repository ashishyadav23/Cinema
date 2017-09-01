(function () {
  'use strict';

  angular
    .module('cinema')
    .config(routeConfig);

  function routeConfig($routeProvider) {
    $routeProvider
      .when('/dashboard', {
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'vm'
      })
      .when('/artist/:id', {
        templateUrl: 'app/artist/artist.html',
        controller: 'ArtistController',
        controllerAs: 'vm'
      })
      .when('/tvshows/:key', {
        templateUrl: 'app/tvshows/tvshows.html',
        controller: 'TvShowsController',
        controllerAs: 'vm'
      })
      .when('/', {
        templateUrl: 'app/landing/landing.html',
        controller: 'LandingPageController',
        controllerAs: 'vm'
      })
      // .when('/people', {
      //   templateUrl: 'app/people/people.html',
      //   controller: 'PeopleController',
      //   controllerAs: 'vm'
      // })
      .when('/genre/:id', {
        templateUrl: 'app/genres/genre/genre.html',
        controller: 'GenreController',
        controllerAs: 'vm'
      })
      .when('/Tvshows', {
        templateUrl: 'app/AllTvshows/alltvshows.html',
        controller: 'AllTvshowsController',
        controllerAs: 'vm'
      })
      .when('/Movies', {
        templateUrl: 'app/AllMovies/allmovies.html',
        controller: 'AllMoviesController',
        controllerAs: 'vm'
      })
      .otherwise({
        redirectTo: '/'
      });
  }

})();
