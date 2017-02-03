(function() {
"use strict";

/**
 * Main module that includes the public module as a dependency
 */
angular.module('main', ['ui.router', 'public', 'admin', 'ngFileUpload'])
.config(config);

config.$inject = ['$urlServiceProvider'];
function config($urlServiceProvider) {

  // If user goes to a path that doesn't exist, redirect to public root
  $urlServiceProvider.rules.otherwise('/');

}

})();
