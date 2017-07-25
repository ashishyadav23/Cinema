(function () {
    'use strict';
    angular.module('cinema')
        .factory('AppFactory', AppFactory);
    /**@ngInject */
    function AppFactory($mdSidenav, $window, $location) {
        var factory = {
            "openDrawer": openDrawer,
            "previousPage": previousPage,
            "drawerItemClick": drawerItemClick
        }
        return factory;

        function openDrawer() {
            $mdSidenav('left').toggle();
        }
        function previousPage() {
            $window.history.back();
        }
        function drawerItemClick(id) {
            switch (id) {
                case '1':
                    openDashboard();
                    break;
                case '2':
                    openMovies();
                    break;
                case '1':
                    openTvShows();
                    break;
                case '2':
                    openPeople();
                    break;
            }
        }
        function openDashboard() {
            $location.path('/dashboard').replace();
        }
        function openMovie() {
            $location.path('/Movies').replace();
        }
        function openTvShows() {
            $location.path('/Tvshows').replace();
        }
        function openPeople() {
            $location.path('/People').replace();
        }
    }
})()