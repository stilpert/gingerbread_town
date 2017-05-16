'use strict';

angular.module('gingerbreadApp', ['ui.router','ngResource','ngDialog'])
.config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
        
            // route for the home page
            .state('app', {
                url:'/',
                views: {
                    'header': {
                        templateUrl : 'views/header.html',
                        controller  : 'HeaderController'
                    },
                    'content': {
                        templateUrl : 'views/home.html',
                        controller  : 'HomeController'
                    },
                    'footer': {
                        templateUrl : 'views/footer.html',
                    }
                }

            })
        
            // route for the info page
            .state('app.info', {
                url:'info',
                views: {
                    'content@': {
                        templateUrl : 'views/info.html',
                        controller  : 'InfoController'                  
                    }
                }
            })
        
            // route for the album page
            .state('app.album', {
                url:'album',
                views: {
                    'content@': {
                        templateUrl : 'views/album.html',
                        controller  : 'AlbumController'                  
                    }
                }
            })

            // route for the shop page
            .state('app.shop', {
                url: 'shop',
                views: {
                    'content@': {
                        templateUrl : 'views/shop.html',
                        controller  : 'ShopController'
                    }
                }
            })

            // route for the productdetail page
            .state('app.productdetail', {
                url: 'menu/:id',
                views: {
                    'content@': {
                        templateUrl : 'views/productdetail.html',
                        controller  : 'ProductDetailController'
                   }
                }
            })
        
            // route for the productdetail page
            .state('app.cart', {
                url: 'cart',
                views: {
                    'content@': {
                        templateUrl : 'views/cart.html',
                        controller  : 'CartController'
                   }
                }
            });
    
        $urlRouterProvider.otherwise('/');
    })
;
