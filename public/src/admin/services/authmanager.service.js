(function() {
"use strict";

angular.module('admin')
    .factory('authManagerService', authManagerService);

authManagerService.$inject = ['$http', '$localStorage', '$window', 'ApiPath', 'Users'];

function authManagerService($http, $localStorage, $window, ApiPath, Users) {
    var authFac = {};
    var TOKEN_KEY = 'Token';
    var isAuthenticated = false;
    var username = '';
    var authToken = undefined;


    function loadUserCredentials() {
        var credentials = $localStorage.getObject(TOKEN_KEY, '{}');
        if (credentials.username !== undefined) {
            useCredentials(credentials);
        }
    }

    function storeUserCredentials(credentials) {
        $localStorage.storeObject(TOKEN_KEY, credentials);
        useCredentials(credentials);
    }

    function useCredentials(credentials) {
        isAuthenticated = true;
        username = credentials.username;
        authToken = credentials.token;

        // Set the token as header for your requests!
        $http.defaults.headers.common['x-access-token'] = authToken;
    }

    function destroyUserCredentials() {
        authToken = undefined;
        username = '';
        isAuthenticated = false;
        $http.defaults.headers.common['x-access-token'] = authToken;
        $localStorage.remove(TOKEN_KEY);
    }

    authFac.login = function(loginData, cbSuccess, cbError) {
        Users.login({}, loginData, function(response) {
            $http.defaults.headers.common['x-access-token'] = response.access_token;
            storeUserCredentials({
                username: loginData.username,
                token: response.access_token
            });
            cbSuccess(response);
        }, function(response) {
            cbError(response);
        });
    };

    authFac.logout = function() {
        destroyUserCredentials();
        return Users.logout({}, function(){
        }, function () {
        });
    };

    authFac.register = function(registerData) {
        return $http.post(ApiPath + '/users/register', registerData)
            .then(function(response) {
                console.log("ok");
                return response.data;
            }, function(response) {
                console.log("ko", response);
                throw response.data;
            });
    };

    authFac.isAuthenticated = function() {
        return isAuthenticated;
    };

    authFac.getUsername = function() {
        return username;
    };

    loadUserCredentials();

    return authFac;
}

})();
