(function () {
    'use strict';

    angular.module('cinema')
        .service('CinemaService', CinemaService);
    function CinemaService() {
        var nowPlaying = "";
        this.getNowPlaying = getNowPlaying;
        this.setNowPlaying = setNowPlaying;


        function getNowPlaying() {
            return this.nowPlaying;
        }
        function setNowPlaying(response) {
            this.nowPlaying = response;
        }

        var selectedMovie = "";
        this.getSelectedMovie = getSelectedMovie;
        this.setSelectedMovie = setSelectedMovie;


        function getSelectedMovie() {
            return this.selectedMovie;
        }
        function setSelectedMovie(response) {
            this.selectedMovie = response;
        }

        var seeAllList = [];
        this.getSeeAllList = getSeeAllList;
        this.setSeeAllList = setSeeAllList;


        function getSeeAllList() {
            return this.seeAllList;
        }
        function setSeeAllList(response) {
            this.seeAllList = response;
        }

    }


})();
