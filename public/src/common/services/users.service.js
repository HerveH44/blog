(function () {
"use strict";

angular.module('common')
.factory('Users', UsersFactory);


UsersFactory.$inject = ['$resource'];
function UsersFactory($resource) {

  return $resource('/users/:userId', {
      userId: '@_id'
  }, {
      'update': { method: 'PUT' },
      'register': {method: 'POST', url:'/register'},
      'login' : { method: 'POST', url:'/users/login'},
      'logout': { methode: 'GET', url:'/users/logout'}
  });

}
})();
