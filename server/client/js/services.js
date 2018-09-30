"use strict";
(function() {
  angular
    .module("app")
    .factory("STATIC", [
      "$http",
      function($http) {
        return {};
      }
    ])
    .factory("API", [
      "$http",
      function($http) {
        return {
          encrypt: function() {
            return $http.post("/encrypt", data);
          },
          attack: function(data) {
            return $http.post("/bruteforce", data);
          }
        };
      }
    ]);
})();
