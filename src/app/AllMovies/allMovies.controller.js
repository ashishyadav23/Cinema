(function () {
    'use strict';
    angular.module('cinema')
        .controller('AllMoviesController', AllMoviesController);
    /**@ngInject */
    function AllMoviesController($rootScope, tmdbMovie, $scope) {
        var vm = this;
        var param = {
            "language": "en-US",
            "page": 1,
            "sort_by": "popularity.desc",
            "include_adult": false,
            "includ_video": false,
            "primary_release_year": "2017",
            "with_original_language": "hi",
            "year": 2017,
            "with_genres": "",

        };
        init();

        function init() {
            vm.searchQuery = "";
            $rootScope.headertitle = "Movies";
            vm.searchClicked = searchClicked;
            vm.searchOnChange = searchOnChange;
        }

        function searchClicked() {
            $scope.$broadcast('searchQueryChanged', vm.searchQuery);
        }

        $scope.$on('searchQueryChanged', function (event, data) {
            getSearchMovies(data);
        });

        function searchOnChange() {
            if (vm.searchQuery.length > 0) {
                getSearchMovies(vm.searchQuery);
            } else {
                vm.movieList = [];
            }

        }
        function getSearchMovies(searchQuery) {
            if (searchQuery.length > 0) {
                tmdbMovie.search(searchQuery, param, function successCallback(success) {
                    console.log("success", angular.toJson(success));
                    vm.movieList = returnValuableResult(success);

                }, function errorCallback(error) {

                });
            } else {
                vm.movieList = [];
            }

        }

        function returnValuableResult(success) {
            var movieList = [];
            if (success.hasOwnProperty('results')) {
                if (success.results.length > 0) {
                    success.results.map(function (el) {
                        if (el.vote_average > 0 && el.release_date != "") {
                            movieList.push(el);
                        }
                    });
                    return movieList.length != 0 ? movieList : 0;
                }
            }
        }

        function getAllMovies() {
            tmdbMovie.discover(param, function successCallback(success) {
                console.log(success);
            }, function errorCallback(error) {
                console.log(error);
            })
        }

    }
})()