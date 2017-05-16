'use strict';

angular.module('gingerbreadApp')

.controller('ShopController', ['$scope', 'shopFactory', 'cartFactory', function ($scope, shopFactory, cartFactory) {

    /*$scope.message = "Loading ...";

    shopFactory.query(
        function (response) {
            $scope.dishes = response;

        },
        function (response) {
            $scope.message = "Error: " + response.status + " " + response.statusText;
    });*/

    $scope.products = shopFactory.query();
    
    $scope.addToCart = function(productid) {
        console.log('Add to cart', productid);
        cartFactory.save({_id: productid});
    };
}])

.controller('AlbumController', ['$scope', 'albumFactory', function ($scope, albumFactory ) {
    $scope.photos = albumFactory.query();
}])

.controller('ProductDetailController', ['$scope', '$state', '$stateParams', 'shopFactory', 'commentFactory', function ($scope, $state, $stateParams, shopFactory, commentFactory) {

    $scope.product = {};
    $scope.showProduct = false;
    $scope.message = "Loading ...";

    $scope.product = shopFactory.get({
            id: $stateParams.id
        })
        .$promise.then(
            function (response) {
                $scope.product = response;
                $scope.showProduct = true;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );

    $scope.mycomment = {
        rating: 5,
        comment: ""
    };

    $scope.submitComment = function () {

        commentFactory.save({id: $stateParams.id}, $scope.mycomment);

        $state.go($state.current, {}, {reload: true});
        
        $scope.commentForm.$setPristine();

        $scope.mycomment = {
            rating: 5,
            comment: ""
        };
    }
}])

// implement the IndexController and About Controller here

.controller('HomeController', ['$scope', function ($scope) {
}])

.controller('InfoController', ['$scope', function ($scope) {

}])

.controller('CartController', ['$scope', '$state', 'cartFactory', function ($scope, $state, cartFactory) {

    $scope.message = "Loading ...";

    cartFactory.query(
        function (response) {
            $scope.products = response.products;
        },
        function (response) {
            $scope.message = "Error: " + response.status + " " + response.statusText;
        })
    
    $scope.deleteFromCart = function(productid) {
        console.log('Delete from cart', productid);
        cartFactory.delete({id: productid});
        $state.go($state.current, {}, {reload: true});
    };
    
    var value = 1;
    $scope.total = function(newVal) {
        if(arguments[0]===NaN){return "please enter digits"}
         console.log($scope.products);
         if(newVal != NaN){
            $scope.estimation = $scope.products[0].price/100 * newVal;
            //console.log($scope.estimation);
        }
                     
            return arguments.length ? (value = newVal) : value;
    }
}])

.controller('HeaderController', ['$scope', '$state', '$rootScope', 'ngDialog', 'AuthFactory', function ($scope, $state, $rootScope, ngDialog, AuthFactory) {

    $scope.loggedIn = false;
    $scope.username = '';
    
    if(AuthFactory.isAuthenticated()) {
        $scope.loggedIn = true;
        $scope.username = AuthFactory.getUsername();
    }
        
    $scope.openLogin = function () {
        ngDialog.open({ template: 'views/login.html', scope: $scope, className: 'ngdialog-theme-default', controller:"LoginController" });
    };
    
    $scope.logOut = function() {
       AuthFactory.logout();
        $scope.loggedIn = false;
        $scope.username = '';
    };
    
    $rootScope.$on('login:Successful', function () {
        $scope.loggedIn = AuthFactory.isAuthenticated();
        $scope.username = AuthFactory.getUsername();
    });
        
    $rootScope.$on('registration:Successful', function () {
        $scope.loggedIn = AuthFactory.isAuthenticated();
        $scope.username = AuthFactory.getUsername();
    });
    
    $scope.stateis = function(curstate) {
       return $state.is(curstate);  
    };
    
}])

.controller('LoginController', ['$scope', 'ngDialog', '$localStorage', 'AuthFactory', function ($scope, ngDialog, $localStorage, AuthFactory) {
    
    $scope.loginData = $localStorage.getObject('userinfo','{}');
    
    $scope.doLogin = function() {
        if($scope.rememberMe)
           $localStorage.storeObject('userinfo',$scope.loginData);

        AuthFactory.login($scope.loginData);

        ngDialog.close();

    };
            
    $scope.openRegister = function () {
        ngDialog.open({ template: 'views/register.html', scope: $scope, className: 'ngdialog-theme-default', controller:"RegisterController" });
    };
    
}])

.controller('RegisterController', ['$scope', 'ngDialog', '$localStorage', 'AuthFactory', function ($scope, ngDialog, $localStorage, AuthFactory) {
    
    $scope.register={};
    $scope.loginData={};
    
    $scope.doRegister = function() {
        console.log('Doing registration', $scope.registration);

        AuthFactory.register($scope.registration);
        
        ngDialog.close();

    };
}])
;