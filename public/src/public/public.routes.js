(function() {
'use strict';

angular.module('public')
    .config(routeConfig);

/**
 * Configures the routes and views
 */
routeConfig.$inject = ['$stateProvider'];

function routeConfig($stateProvider) {
    // Routes
    $stateProvider
        .state('public', {
            abstract: true,
            templateUrl: 'src/public/public.html',
        })
        .state('public.home', {
            url: '/',
            component: 'home',
            resolve: {
                articles: ['Articles', function(Articles) {
                    return Articles.query();
                }]
            }
        })
        .state('public.newarticle', {
            url: '/',
            component: 'newArticle'
        })
        .state('public.article', {
            url: '/:articleId/:slug',
            component: 'articleReader',
            params:{
                article: null,
            },
            resolve: {
                article: ['$stateParams', 'Articles', function($stateParams, Articles){
                    // Par défaut, l'article est hérité du parent
                    if($stateParams.article) {
                        return $stateParams.article;
                    }

                    // Si l'article est appelé directement depuis l'URL
                    // On récupère l'article depuis le service
                    return Articles.get({ articleId: $stateParams.articleId });
                }]
            }
        })
        .state('public.articles-editor', {
            url: '/articles-editor',
            component: 'articlesEditor',
            resolve: {
                articles: ['Articles', function(Articles) {
                    return Articles.query();
                }]
            }
        })
        .state('public.articles-editor.article', {
            url: '/:articleId',
            component: 'articleEditor',
            params: {
                article: null
            },
            resolve: {
                article: ['$stateParams', 'Articles', function($stateParams, Articles){
                    // Par défaut, l'article est hérité du parent
                    if($stateParams.article) {
                        return $stateParams.article;
                    }

                    // Si l'article est appelé directement depuis l'URL
                    // On récupère l'article depuis le service
                    return Articles.get({
                        articleId: $stateParams.articleId
                    });
                }]
            }
        });
}
})();
