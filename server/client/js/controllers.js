"use strict";
(function() {
  angular.module("app").controller("HomeController", [
    "API",
    function(API) {
      const self = this;
      self.type = null;
      self.plainText = null;
      self.shift = null;
      self.key = null;
      self.isShiftEnabled = false;
      self.isKeyEnabled = false;
      self.isSaveEnabled = false;
      self.typeNames = {
        "select a cipher": null,
        "Caeser Cipher": "CAESAR",
        "Shift Cipher": "SHIFT",
        "Monoalphabetic Cipher": "MONO",
        "Vigenere Cipher": "VIGEN"
      };
      self.cipher = null;
      self.toast = null;
      self.hideToast = function() {
        self.toast = null;
      };
      self.typeSelected = function() {
        if (self.type) {
          if (self.type === "CAESAR") {
            self.isSaveEnabled = true;
            self.isShiftEnabled = false;
            self.isKeyEnabled = false;
          } else if (self.type === "SHIFT") {
            self.isShiftEnabled = true;
            self.isSaveEnabled = true;
            self.isKeyEnabled = false;
          } else if (self.type === "MONO") {
            self.isKeyEnabled = true;
            self.isShiftEnabled = false;
            self.isSaveEnabled = true;
          } else if (self.type === "VIGEN") {
            self.isKeyEnabled = true;
            self.isShiftEnabled = false;
            self.isSaveEnabled = true;
          } else {
            self.isShiftEnabled = false;
            self.isKeyEnabled = false;
            self.isSaveEnabled = false;
          }
        }
      };
      const ALPHABETS = "abcdefghijklmnopqrstuvwxyz".split("");
      self.fillForMono = function() {
        if (self.type !== "MONO") {
          return;
        }
        const key = [...new Set(self.key.toLowerCase())];
        const newKey = [];
        key.forEach(item => {
          if (ALPHABETS.includes(item)) {
            newKey.push(item);
          }
        });
        ALPHABETS.forEach(alpha => {
          if (!newKey.includes(alpha)) {
            newKey.push(alpha);
          }
        });
        self.key = newKey.join("");
      };

      self.encrypt = function() {
        API.encrypt({
          plainText: self.plainText,
          type: self.type,
          shift: self.shift,
          key: self.key
        }).then(function(data) {
          if (data.data.success) {
            self.toast = "Successfully Saved. -- " + data.data.data;
          }
        });
      };

      self.getRecentlySaved = function() {
        API.getRecentlySaved().then(function(data) {
          if (data.data.success) {
            self.result = data.data.data;
          } else {
            self.toast = "Nothing to display";
          }
        });
      };

      self.getLastByCipher = function() {
        API.getLastByCipher({ cipher: self.type }).then(function(data) {
          if (data.data.success) {
            self.result = data.data.data;
          } else {
            self.toast = "Nothing to display";
          }
        });
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
