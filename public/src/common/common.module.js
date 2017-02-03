(function() {
"use strict";

angular.module('common', ['ngResource'])
// APIPATH utilié pour l'instant dans authRedirector
.constant('ApiPath', 'http://localhost:5000') // Changer si accès via le réseau (mettre l'IP)
.config(config);

config.$inject = ['$httpProvider'];
function config($httpProvider) {
    // Ancien Spinner utilisé par la démo Angular de Y. Chaikin
    // $httpProvider.interceptors.push('loadingHttpInterceptor');
}

})();
