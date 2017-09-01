(function () {
    'use strict';
    angular.module('cinema')
        .directive('cinemaSwiper', cinemaSwiper)
        .directive('cinemaTv', cinemaTv);
    /**@nginject*/
    function cinemaSwiper($log, $timeout, $window) {
        return {
            restrict: 'EA',
            templateUrl: 'app/cinemaDirective/carousel/cinemaSwiper.html',
            scope: {
                data: '=',
                events: '=',
                swiperClick: '&'
            },
            link: linkMovie,
        }
        //link function
        function linkMovie(scope, element, attr) {
            console.log(scope.data);
            if ($window.screen.width <= 414) {
                scope.slidesPerView = 3;
                scope.showFullName = false;
            } else {
                scope.slidesPerView = 6;
                scope.showFullName = true;
            }
            scope.onReadySwiper = scope.events;
            scope.swiperClick = scope.swiperClick;
        }
    };

    /**@nginject */
    function cinemaTv($log, $timeout, $window) {
        return {
            restrict: 'E',
            templateUrl: 'app/cinemaDirective/carousel/cinemaTvSwiper.html',
            scope: {
                data: '=',
                events: '=',
                swiperClick: '&'
            },
            link: linkTv,
        }
        //link function
        function linkTv(scope, element, attr) {
            if ($window.screen.width <= 414) {
                scope.slidesPerView = 3;
                scope.showFullName = false;
            } else {
                scope.slidesPerView = 6;
                scope.showFullName = true;
            }

            scope.onReadySwiper = scope.events;

            scope.swiperClick = scope.swiperClick;
        }
    }


})()
