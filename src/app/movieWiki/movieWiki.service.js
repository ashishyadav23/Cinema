(function () {
    'use strict';

    angular.module('cinema')
        .service('movieWikiService', movieWikiService);
    function movieWikiService(tmdbApiKey, $http) {
        var selectedArtist = "";
        this.getSelectedArtist = getSelectedArtist;
        this.setSelectedArtist = setSelectedArtist;

        function getSelectedArtist() {
            return this.selectedArtist;
        }

        function setSelectedArtist(response) {
            this.selectedArtist = response;
        }

        this.getArtistInfo = getArtistInfo;
        this.getArtistMovie = getArtistMovie;


        function getArtistInfo(artistId) {
            var url = 'https://api.themoviedb.org/3/person/';
            var id = artistId;
            var baseUrl = url + artistId + '?api_key=' + tmdbApiKey + '&language=en-US';
            // var baseUrl = "https://api.themoviedb.org/3/person/17604?api_key=6012abc907d2538d2c30179cb48b46b0&language=en-US"
            return $http.get(baseUrl);
        }

        function getArtistMovie(artistId) {
            // var baseUrl = 'https://api.themoviedb.org/3/person/504/movie_credits?api_key=6012abc907d2538d2c30179cb48b46b0&language=en-US';
            var url = 'https://api.themoviedb.org/3/person/';
            var id = artistId;
            var baseUrl = url + artistId + '/movie_credits?api_key=' + tmdbApiKey + '&language=en-US';
            console.log("movieBaseUrl", baseUrl);
            return $http.get(baseUrl);
        }
    }


})();
