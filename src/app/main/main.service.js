(function () {
    'use strict';
    angular.module('cinema')
        .service('mainService', mainService);
    /**@ngInjcet */
    function mainService(tmdbMovie, tmdbTV) {
        this.getTopRatedMovie = getTopRatedMovie;
        
        function getTopRatedMovie() {

        }
    }
})()