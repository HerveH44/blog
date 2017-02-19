(function () {
"use strict";

angular.module("public")
.component("home", {
    templateUrl: "src/public/home/home.html",
    controller: homeController,
    bindings: {
        articles: "<",
    }
});

homeController.$inject = [];
function homeController() {
    var $ctrl = this;
}

})();
