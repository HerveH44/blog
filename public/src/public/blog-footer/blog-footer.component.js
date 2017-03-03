(function () {
 "use strict";

 angular.module("public")
 .component("blogFooter", {
     templateUrl: "src/public/blog-footer/blog-footer.html",
     controller: footerController
 });

 footerController.$inject = [];
 function footerController() {
     var $ctrl = this;
 }

 })();
