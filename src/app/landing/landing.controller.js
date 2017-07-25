(function () {
    'use strict';
    angular.module('cinema')
        .controller('LandingPageController', LandingPageController);
    /**@ngInject */
    function LandingPageController($timeout, $location, $rootScope) {
        init();
        function init() {
            $rootScope.showToolbar = false;
            $timeout(function () {
                $location.path('/dashboard').replace();
            }, 1000);
        }
    }
})()