angular.module('app')

.controller(HomeController)

.factory(HomeService);

HomeController.$inject = ['$scope','$location','HomeService'];

function HomeController($scope,$location,HomeService) {
    var vm = this;
}

HomeService.$inject= [ '$q' , '$http' ];

function HomeService ( $q , $http ){
  var HomeService ={
    getNewElections: getNewElections,
    getElectionNominees: getElectionNominees,
    casteVote: casteVote
  };
  return HomeService;

  function getNewElections (student_id) {
    /*alert(student_id)*/
    var deferred = $q.defer();
    deferred.resolve(response.data);
     return deferred.promise;
  }
}