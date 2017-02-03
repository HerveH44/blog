(function () {
"use strict";

angular.module("public")
.component("newArticle", {
    templateUrl: "src/public/new-article/new-article.html",
    controller: newArticleController
});

newArticleController.$inject = ["Articles"];
function newArticleController(Articles) {
    var $ctrl = this;
    $ctrl.article = {}; // Article à sauvegarder

    $ctrl.save = function() {
        var newArticle = new Articles( $ctrl.article );
        newArticle.$save(function(article) {
            Materialize.toast('Article enregistré!', 3000);
        },
        function(response) {

        });

    };
}

})();
