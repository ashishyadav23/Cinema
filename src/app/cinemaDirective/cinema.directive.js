(function () {
    'use strict';
    angular.module('cinema')
        .directive('cinemaSwiper', cinemaSwiper)
        .directive('cinemaTv', cinemaTv);
    /**@nginject*/
    function cinemaSwiper($log, $timeout) {
        return {
            restrict: 'E',
            templateUrl: 'app/cinemaDirective/cinemaSwiper.html',
            scope: {
                data: '=',
                events: '=',
                swiperClick: '&'
            },
            link: linkMovie,
        }
        //link function
        function linkMovie(scope, element, attr) {

            scope.onReadySwiper = scope.events;
            scope.swiperClick = scope.swiperClick;
        }
    };

    /**@nginject */
    function cinemaTv($log, $timeout) {
        return {
            restrict: 'E',
            templateUrl: 'app/cinemaDirective/cinemaTvSwiper.html',
            scope: {
                data: '=',
                events: '=',
                swiperClick: '&'
            },
            link: linkTv,
        }
        //link function
        function linkTv(scope, element, attr) {
            scope.$watch('data', function (newValue, oldValue) {
                angular.forEach(newValue, function (value, key) {
                    if (value.poster_path == null) {
                        newValue[key].poster_path = '';
                        scope.data = newValue;
                    }
                });
            })
            scope.onReadySwiper = scope.events;

            scope.swiperClick = scope.swiperClick;
        }
    }


})()
