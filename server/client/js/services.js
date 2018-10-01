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
          encrypt: function(data) {
            return $http.post("/encrypt", data);
          },
          attack: function(data) {
            return $http.post("/bruteforce", data);
          },
          getRecentlySaved: function() {
            return $http.get("/last");
          },
          getLastByCipher: function(data) {
            return $http.post("/last-cipher", data);
          }
        };
      }
    ]);
})();
