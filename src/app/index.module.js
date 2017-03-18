(function () {
  'use strict';

  angular
    .module('cinema', ['ngRoute', 'ngMaterial', 'toastr', 'tmdb','ksSwiper']);
    // .controller('indexController', indexController);

  function indexController() {
    var  vm  = this;
    init();
    function init() {
      vm.headerTitle = "cinema";
    }


  }

})();
