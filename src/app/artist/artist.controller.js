(function () {
    'use Strict';
    angular.module('cinema')
        .controller('ArtistController', ArtistController);
    /** @ngInject */
    function ArtistController(tmdbTV, CinemaService, $location, $rootScope, $sce, $filter, ArtistService, tmdbMovie, $scope, $routeParams) {
        var vm = this;
        var param = {
            "language": "en-US",
            "page": 1,
            "with_people": 0
        };
        init();

        function init() {
            if (!ArtistService.selectedArtist) {
                getArtistDetailsById($routeParams.id);
            } else {
                vm.artistBio = "";
                vm.artistMovies = {
                    "page": "",
                    "list": [],
                    "totalPage": ""
                };
                vm.selectedArtist = ArtistService.getSelectedArtist();
                console.log("SelectedArtist", vm.selectedArtist);
                if (angular.isDefined(vm.selectedArtist)) {
                    loadData();
                }
            }
        }

        $scope.$on('refresh', function ($event, data) {
            init();
        });

        function getArtistDetailsById(id) {
            tmdbMovie.getArtistById(id, param, function successCallback(success) {
                ArtistService.setSelectedArtist(success);
                $scope.$broadcast('refresh', success);
            }, function errorCallback() {
            });
        }

        vm.artistMoviesSwiper = function (swiper) {
            swiper.initObservers();
            swiper.on('onReachEnd', function () {
                param.page++;
                getmovies();
            });
        };

        function loadData() {
            getmovies();
            getTvShows();
            getBio();
        }

        function getmovies() {
            param.with_people = vm.selectedArtist.id;
            tmdbMovie.discover(param,
                function success(success) {
                    if (success.hasOwnProperty('results')) {
                        if (success.results.length > 0) {
                            vm.artistMovies = vm.artistMovies.concat(success.results);
                        }
                    }
                },
                function error() {
                    console.log("error", angular.toJson(error));
                });
        }

        function getTvShows() {
            param.with_people = vm.selectedArtist.id;
            tmdbTV.tv.discover(param, function successCallback(success) {
                console.log("ArtistTv", success);
            }, function errorCallback(error) {
            });
        }

        vm.calculateAge = function (birthday, deathday) {
            var diffInYear = "";
            if ((angular.isString(birthday) && birthday != "")) {
                var dob = new Date(birthday);
                var currentDt = new Date();
                if ((angular.isString(deathday) && deathday != "")) {
                    var deathDate = new Date(deathday);
                    if (angular.isDate(deathDate)) {
                        diffInYear = (deathDate.getFullYear() - dob.getFullYear());
                    }
                } else {
                    diffInYear = (currentDt.getFullYear() - dob.getFullYear());
                }
            }
            return diffInYear;
        }

        function getBio() {
            ArtistService.getArtistInfo(vm.selectedArtist.id).then(successCallback, errorCallback);

            function successCallback(successBio) {
                vm.artistBio = successBio.data;
                console.log("artistBio", vm.artistBio);
            }

            function errorCallback(error) {
                console.log("artist bio", angular.toJson(error));
            }
        }

        vm.openMovieWiki = function (movie) {
            CinemaService.collection.setSelectedMovie(movie);
            $location.path('/movieWiki/' + movie.id);
        }

    }
})()