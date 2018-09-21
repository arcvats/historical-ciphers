"use strict";
(() => {
  angular.module("app").config([
    "$locationProvider",
    "$routeProvider",
    ($locationProvider, $routeProvider) => {
      $locationProvider.html5Mode(true);
      $routeProvider.when("/", {
        templateUrl: "/views/home.html",
        controller: "HomeController",
        controllerAs: "HomeCtrl"
      });
      $routeProvider.otherwise({ redirectTo: "/" });
    }
  ]);
})();
