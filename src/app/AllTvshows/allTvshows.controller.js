(function () {
    'use strict';
    angular.module('cinema')
        .controller('AllTvshowsController', AllTvshowsController);
    /**@ngInject */
    function AllTvshowsController($rootScope) {
        init();
        function init() {
            $rootScope.headertitle = "Tv shows";
        }
    }
})()