( function() {
    "use strict";

    angular.module( "public" )
        .component( "blogHeader", {
            templateUrl: "src/public/blog-header/blog-header.html",
            controller: headerController
        } );

    headerController.$inject = [ 'authManagerService', 'ngDialog' ];

    function headerController( authManagerService, ngDialog ) {
        var $ctrl = this;

        $ctrl.isAuthenticated = function() {
            return authManagerService.isAuthenticated();
        };

        $ctrl.doLogin = function() {
            authManagerService.login( {
                username: $ctrl.username,
                password: $ctrl.password
            }, function( response ) {
                $( '#login-modal' ).modal( 'close' );
                Materialize.toast( 'Bienvenue ' + $ctrl.username + ' !', 3000 );
                $ctrl.username = $ctrl.password = '';
            } );
        };

        $ctrl.doLogout = function() {
            authManagerService.logout();
            Materialize.toast( 'Au revoir !', 3000 );
        };

        $ctrl.openRegister = function() {
            ngDialog.open( {
                template: "<div class=''container'>\  " +
"          <div class="center-align">\ " +
"            <h5>Register</h5>\ " +
"          </div>\ " +
"            <!-- Formulaire Login -->\ " +
"            <div class="row">\ " +
"                <form ng-sbmit="$ctrl.doRegister()" class="col s12">\ " +
"                    <div class="row modal-form-row">\ " +
"                        <div class="input-field col s12">\ " +
"                            <i class="material-icons prefix">account_circle</i>\ " +
"                            <input id="username" type="text" class="validate" ng-model="$ctrl.username">\ " +
"                            <label for="username">Identifiant</label>\ " +
"                        </div>\ " +
"                    </div>\ " +
"                    <div class="row modal-form-row">\ " +
"                        <div class="input-field col s12">\ " +
"                            <i class="material-icons prefix">lock</i>\ " +
"                            <input id="password" type="password" class="validate" ng-model="$ctrl.password">\ " +
"                            <label for="password">Mot de passe</label>\ " +
"                        </div>\ " +
"                    </div>\ " +
"                    <center>\ " +
"                        <div class="row">\ " +
"                          <div class="input-field col s12">\ " +
"                            <button type="submit" class="col s12 btn btn-large waves-effect center-align">\ " +
"                              Sidentifier\ " +
"                            </button>\ " +
"                          </div>\ " +
"                        </div>\ " +
"                   </center>\ " +
"                </form>\ " +
"            </div>\ " +
"        </div>\ " +
"    </div>",
                plain: true,
                className: 'ngdialog-theme-default',
                controller: [ 'authManagerService', function( authManagerService ) {
                    var $ctrl = this;
                    $ctrl.doRegister = function() {
                        authManagerService.register( {
                                username: $ctrl.username,
                                password: $ctrl.password
                            } )
                            .then( function( response ) { // Réussite
                                Materialize.toast( "Enregistrement validé. Vous pouvez vous logger!", 3000 );
                            }, function( response ) { // Echec
                                $ctrl.registerMessage = response.message;
                                $ctrl.registerValid = false;
                            } );
                    };
                } ],
                controllerAs: '$ctrl'
            } );
        };



        $ctrl.$postLink = function() {
            $( '.modal' ).modal();
            $( ".button-collapse" ).sideNav( {
                menuWidth: 200, // Default is 300
                edge: 'right', // Choose the horizontal origin
                closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
                draggable: true // Choose whether you can drag to open on touch screens
            } );
        };
    }

} )();
