(function () {
    'use strict';
    angular.module('cinema')
        .service('mainService', mainService);
    /**@ngInjcet */
    function mainService() {
        this.getTopRatedMovie = getTopRatedMovie;
        
        function getTopRatedMovie() {

        }
    }
})()