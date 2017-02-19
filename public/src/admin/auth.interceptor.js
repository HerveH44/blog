(function () {
"use strict";

angular.module('admin')
.factory('authHttpInterceptor', AuthHttpInterceptor);

// AuthHttpInterceptor.$inject = ['authManagerService'];
function AuthHttpInterceptor(/*authManagerService*/) {
  return {
    request: function (config) {
      // if (authManagerService.isAuthenticated()) {
      //   config.headers.Authorization =
      //     "Bearer " + CurrentUserService.getAccessToken();
      // }

      return config;
    }
  };
}

})();
