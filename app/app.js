angular.module('app', ['ngRoute','angular-websql'])

.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/home', {
            templateUrl: 'app/template/home.html',
            controller: 'HomeController as home'
        }).
        otherwise({
            redirectTo: '/home'
        });
    }
]);