"use strict";
(function() {
  angular.module("app").controller("HomeController", [
    "API",
    function(API) {
      const self = this;
      self.type = null;
      self.isShiftEnabled = false;
      self.isKeyEnabled = false;
      self.typeNames = {
        "select a cipher": null,
        "Caeser Cipher": "CAESAR",
        "Shift Cipher": "SHIFT",
        "Monoalphabetic Cipher": "MONO",
        "Vigenere Cipher": "VIGEN"
      };
      self.cipher = null;

      self.typeSelected = function() {
        if (self.type) {
          console.log("hello");
        }
      };

      self.attack = function() {
        if (self.cipher) {
          API.attack({ cipher: self.cipher }).then(function(data) {
            if (data.data.success) {
              self.attackResults = data.data.data;
            } else {
              self.toast = "Something went wrong. Please try again.";
            }
          });
        }
      };
    }
  ]);
})();
