(function() {
"use strict";

angular.module('common')
    .factory('Articles', ['$resource','$localStorage', function($resource, $localStorage) {
        return $resource('/articles/:articleId', {
            articleId: '@_id'
        }, {
            'update': {
                method: 'PUT',
                // transformRequest: angular.identity,
                // headers: {
                //     'Content-type': false
                // }
            }
        });
    }]);
})();
