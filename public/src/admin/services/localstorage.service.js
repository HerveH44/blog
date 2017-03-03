(function() {
"use strict";

angular.module('admin')
    .service('$localStorage', localStorage);

localStorage.$inject = ['$window'];
function localStorage($window) {
  var service = this;

  service.store = function(key, value) {
    $window.localStorage[key] = value;
  };
  service.get = function(key, defaultValue) {
    return $window.localStorage[key] || defaultValue;
  };
  service.remove = function(key) {
    $window.localStorage.removeItem(key);
  };
  service.storeObject = function(key, value) {
    $window.localStorage[key] = JSON.stringify(value);
  };
  service.getObject = function(key, defaultValue) {
    return JSON.parse($window.localStorage[key] || defaultValue);
  }
}

})();
