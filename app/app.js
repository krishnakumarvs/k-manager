angular.module('app', ['ngRoute'])

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