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
        function closeDrawer() {
            $mdSidenav('left').close()
        }
        function previousPage() {
            $window.history.back();
        }
        function drawerItemClick(id) {
            switch (id) {
                case 1:
                    openDashboard();
                    break;
                case 2:
                    openMovies();
                    break;
                case 3:
                    openTvShows();
                    break;
                case 4:
                    openPeople();
                    break;
            }
        }
        function openDashboard() {
            closeDrawer();
            $location.path('/dashboard').replace();
        }
        function openMovies() {
            closeDrawer();
            $location.path('/Movies').replace();
        }
        function openTvShows() {
            closeDrawer();
            $location.path('/Tvshows').replace();
        }
        function openPeople() {
            closeDrawer();
            $location.path('/People').replace();
        }
    }
})()