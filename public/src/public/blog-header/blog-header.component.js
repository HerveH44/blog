(function() {
"use strict";

angular.module("public")
    .component("blogHeader", {
        templateUrl: "src/public/blog-header/blog-header.html",
        controller: headerController
    });

headerController.$inject = ['authManagerService', '$scope'];

function headerController(authManagerService, $scope) {
    var $ctrl = this;

    $ctrl.isAuthenticated = function () {
        return authManagerService.isAuthenticated();
    };

    $ctrl.doLogin = function() {
        authManagerService.login({
            username: $ctrl.username,
            password: $ctrl.password
        }, function(response){
            $('#login-modal').modal('close');
            Materialize.toast( 'Bienvenue ' + $ctrl.username + ' !', 3000);
            $ctrl.username = $ctrl.password = '';
        });
    };

    $ctrl.doLogout = function() {
        authManagerService.logout();
        Materialize.toast( 'Au revoir !', 3000);
    };

    $ctrl.doRegister = function() {
        authManagerService.register({
            username: $ctrl.usernameNew,
            password: $ctrl.passwordNew
        })
        .then(function(response){ // Réussite
            $('#modal2').modal('close');
            Materialize.toast( "Enregistrement validé. Vous pouvez vous logger!", 3000);
        },function(response) { // Echec
            $ctrl.registerMessage = response.message;
            $ctrl.registerValid = false;
        });
    };

    $ctrl.$postLink = function() {
        $('.modal').modal();
        $(".button-collapse").sideNav({
            menuWidth: 200, // Default is 300
            edge: 'right', // Choose the horizontal origin
            closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
            draggable: true // Choose whether you can drag to open on touch screens
        });
    };
}

})();
