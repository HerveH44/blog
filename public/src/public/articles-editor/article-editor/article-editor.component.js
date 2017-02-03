(function () {
"use strict";

angular.module("public")
.component("articleEditor", {
    templateUrl: "src/public/articles-editor/article-editor/article-editor.html",
    controller: ArticleEditorController,
    bindings: {
        article: "=",
    }
});

ArticleEditorController.$inject = ['Articles', 'Upload'];
function ArticleEditorController(Articles, Upload) {
    var $ctrl = this;

    $ctrl.save = function() {
        if( $ctrl.image )
            upload($ctrl.image);
        else {
            saveArticle();
        }
    };

    var upload = function (file, cbSuccess, cbError) {
        Upload.upload({
            url: 'images/upload',
            method: 'POST',
            data: {
                articleId: $ctrl.article._id,
                file: file,
            }
        }).then(function (resp) {
            console.log('Success ' + resp.config.data.file.name + ' uploaded. Response: ' + resp.data);
            $ctrl.article.image = resp.config.data.file.name;
            saveArticle();
        }, function (resp) {
            console.log('Error status: ' + resp.status);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });
    };

    function saveArticle() {
        // $ctrl.article.image = $ctrl.image;
        Articles.update({ articleId: $ctrl.article._id }, $ctrl.article, function(){
            Materialize.toast('Article mis à jour!', 3000);
        }, function(){
            Materialize.toast('Erreur du serveur lors de la mise à jour', 3000);
        });
    }
    //LifeHooks of Components
    //Called on each controller after all the controllers on an element have been
     //constructed and had their bindings initialized (and before the pre & post linking
     //functions for the directives on this element).
     //This is a good place to put initialization code for your controller.
    $ctrl.$onInit = function() {
    };

     //Called whenever one-way bindings are updated. The changesObj is a hash whose keys
     //are the names of the bound properties that have changed, and the values are
     //an object of the form { currentValue, previousValue, isFirstChange() }.
     //Use this hook to trigger updates within a component such as cloning the bound value
     //to prevent accidental mutation of the outer value.
    $ctrl.$onChanges = function(changesObj) {
    };


     //Called on each turn of the digest cycle. Provides an opportunity to detect and act on changes.
     //Any actions that you wish to take in response to the changes that you detect
     //must be invoked from this hook; implementing this has no effect on when $onChanges is called.
     //For example, this hook could be useful if you wish to perform a deep equality check,
     //or to check a Date object, changes to which would not be detected by
     //AngularJS change detector and thus not trigger $onChanges.
     //This hook is invoked with no arguments; if detecting changes,
     //you must store the previous value(s) for comparison to the current values.
    $ctrl.$doCheck = function(changesObj) {
        Materialize.updateTextFields();
        $('#textarea1').trigger('autoresize');
    };


     //Called on a controller when its containing scope is destroyed.
     //Use this hook for releasing external resources, watches and event handlers.
    $ctrl.$onDestroy = function() {

    };


     //Called after this controller element and its children have been linked.
     //Similar to the post-link function this hook can be used to set up DOM event handlers
     //and do direct DOM manipulation. Note that child elements that contain templateUrl
     //directives will not have been compiled and linked since they are waiting for
     //their template to load asynchronously and their own compilation and linking has been suspended
     //until that occurs. This hook can be considered analogous to the ngAfterViewInit
     //and ngAfterContentInit hooks in Angular.
     //Since the compilation process is rather different in AngularJS there is no
     //direct mapping and care should be taken when upgrading.
    $ctrl.$postLink = function() {
        Materialize.updateTextFields();
        $('#textarea1').trigger('autoresize');
    };
}

})();
