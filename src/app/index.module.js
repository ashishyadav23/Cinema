(function () {
  'use strict';

  angular
    .module('cinema', ['ngRoute', 'ngMaterial', 'toastr', 'tmdb', 'ksSwiper'])
    .controller('IndexController', IndexController);

  function IndexController($rootScope,$window) {
    var vm = this;
    init();
    function init() {
      $rootScope.headerTitle = "cinema";
    }
    $rootScope.previousPage = function () {
      // if(window.cordova){
      $window.history.back();
      // }


    }


  }

})();
