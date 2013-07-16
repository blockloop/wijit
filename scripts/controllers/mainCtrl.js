(function(){
  angular.module('wijit').controller('MainCtrl', ['$scope', 'extensionService', 
    function($scope, extensionService) {
      $scope.extensionsLoaded = extensionService.all;
    }
  ]);

})();
