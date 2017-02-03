(function () {
"use strict";

angular.module('admin')
.service('AuthRedirectorService', AuthRedirectorService);


AuthRedirectorService.$inject = ['$state', 'authManagerService'];
function AuthRedirectorService($state, authManagerService) {
  var service = this;

  /**
   * Processes the logic when a state begins. We ensure that
   * the user is authenticated before letting them proceed
   * to the next page.
   */
  service.onStateChangeStart = function(event, toState, toParams, fromState, fromParams) {
    // Only redirect if going to any admin state,
    // unless going directly to login
    if (toState.name.indexOf('admin.') === 0 &&
        toState.name != 'admin.login' &&
        !authManagerService.isAuthenticated()) {
      event.preventDefault();
      $state.go('admin.login', {
        'toState': toState,
        'toParams': toParams
      });
    }
    
    if (toState.name === 'admin' &&
        authManagerService.isAuthenticated()) {
      $state.go('admin.auth', {
        'toState': toState,
        'toParams': toParams
      });
    }
  };

}


})();
