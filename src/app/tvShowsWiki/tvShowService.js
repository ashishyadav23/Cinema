(function () {
    'use strict';
    angular.module('cinema')
        .service('TvShowService', TvShowService);
    function TvShowService($http) {

        var selectedTv = "";

        this.getSelectedTv = getSelectedTv;
        this.setSelectedTv = setSelectedTv;
        this.getTvShowWikiFromMaze = getTvShowWikiFromMaze;

        function getSelectedTv() {
            return this.selectedTv;
        }

        function setSelectedTv(response) {
            this.selectedTv = response;
        }

        function getTvShowWikiFromMaze(query) {
            // http://api.tvmaze.com/search/shows?q=game%20of%20thrones
            var url = 'http://api.tvmaze.com/singlesearch/shows?embed=episodes&q=' + query;
            return $http.get(url);

        }

    }
})()