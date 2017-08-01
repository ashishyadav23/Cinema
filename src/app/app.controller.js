(function () {
    angular.module('cinema')
        .controller('IndexController', IndexController);
    /**@ngInjcet */
    function IndexController($rootScope, $window, AppFactory) {
        var vm = this;
        init();
        function init() {
            $rootScope.showToolbar = true;
            $rootScope.headerTitle = "cinema";
            vm.factory = AppFactory;
            vm.onDrawerItemClick = onDrawerItemClick;
            vm.drawerList = getDrawerList();
        }
        function getDrawerList() {
            var jsonData = [{
                "id": 1,
                "name": "Dashboard",
                "isSelected": true,
                "image": "dashboard"
            }, {
                "id": 2,
                "name": "Movies",
                "isSelected": false,
                "image": "movie"
            }, {
                "id": 3,
                "name": "Tv shows",
                "isSelected": false,
                "image": "tv"
            }, {
                "id": 4,
                "name": "People",
                "isSelected": false,
                "image": "people"
            }]
            return jsonData;
        }

        function onDrawerItemClick(id) {
            vm.drawerList.map(function (el) {
                if (!angular.equals(el.id, id)) {
                    el.isSelected = false;
                } else {
                    el.isSelected = true;
                }
            });
            vm.factory.drawerItemClick(id);
        }

    }

})();