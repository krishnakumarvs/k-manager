angular.module('app')

.controller("HomeController", HomeController)

.factory("HomeService", HomeService);

HomeController.$inject = ['$scope', '$filter', 'HomeService'];

function HomeController($scope, $filter, HomeService) {
    var vm = this;
    vm.operationDate = new Date();
    vm.pageTitle = "K-Manager";
    /* flags variables*/
    vm.operation = false;
    vm.currentOperation = ""; /* available operations:  add_income , add_outcome , take_kadam , give_kadam */


    /* Public funtion declarations */
    vm.startOperation = startOperation;
    vm.backButtonClick = backButtonClick;

    /* funtion declarations */

    function startOperation(operation) {
        vm.pageTitle = operation.split('_')[0] + " " + operation.split('_')[1];
        vm.currentOperation = operation;
        vm.operation = true;
    }

    function backButtonClick() {
        vm.currentOperation = "";
        vm.operation = false;
        vm.pageTitle = "K-Manager";
    }


}

HomeService.$inject = ['$q', '$http'];

function HomeService($q, $http) {
    var HomeService = {};
    return HomeService;

    function sample(student_id) {
        /*alert(student_id)*/
        var deferred = $q.defer();
        deferred.resolve(response.data);
        return deferred.promise;
    }
}