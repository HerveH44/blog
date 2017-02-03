(function () {
"use strict";

angular.module('admin')
.config(config);

config.$inject = ['$stateProvider', '$httpProvider'];
function config($stateProvider, $httpProvider) {
  $httpProvider.interceptors.push('authHttpInterceptor');
  $httpProvider.defaults.headers.common.Accept = 'application/json';

  $stateProvider

    // Contains base state that all admin states inherit
    .state('admin', {
      url: '/admin',
      abstract: true,
      templateUrl: 'src/admin/admin.html'
    })
    // Contains state that all authenticated states inherit
    .state('admin.auth', {
      url: '/auth',
      templateUrl: 'src/admin/admin-auth/admin-auth.html',
      controller: 'AdminAuthController',
      controllerAs: 'adminAuth'
    })
    .state('admin.login', {
      url: '/login',
      templateUrl: 'src/admin/login/login.html',
      controller: 'LoginController',
      controllerAs: 'loginCtrl',
      // These are params that this state expects to be populated
      // Allows us to pass via $state.go(path, params)
      params: {
        toParams: null,
        toState: null
      }
    })
    .state('admin.auth.newcategory', {
      url: '/newcategory',
      templateUrl: 'src/admin/category/category-new.html',
      controller: ['MenuService', '$rootScope', '$state', function(MenuService, $rootScope, $state){
        this.category = {};
        this.category.title = "";

        this.save = function() {
          MenuService.createMenu(this.category)
          .then(function(response) {
            console.log(response);
            var id = response.id;
            $rootScope.$broadcast('menu:new', { id: id });
            $state.go('admin.auth.category', { categoryId: id });
          });
        };

        this.valid = function() {
          return true;
        };
      }],
      controllerAs: "$ctrl"
    })
    .state('admin.auth.category', {
      url: '/category/{categoryId}',
      templateUrl: 'src/admin/category/category-items.html',
      controller: 'CategoryItemsController',
      controllerAs: 'categoryItemsCtrl',
      resolve: {
        menu: ['$stateParams','MenuService', function($stateParams, MenuService) {
          return MenuService.getMenu($stateParams.categoryId);
        }]
      }
    })

    .state('admin.auth.category.menuitem', {
      url: "/menuitem/{menuItemId}",
      templateUrl: "src/admin/menu-item/menu-item-edit.html",
      controller: 'MenuItemEditController',
      controllerAs: 'menuItemEditCtrl',
      resolve: {
        menuItem: ['$stateParams', 'MenuService', function ($stateParams, MenuService) {
          return MenuService.getMenuItem($stateParams.menuItemId);
        }]
      }
    });
}

})();
