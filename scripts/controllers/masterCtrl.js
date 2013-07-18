(function(ng){
  ng.module('wijit').controller('MasterCtrl', ['$scope', 'extensions', 
    function($scope, extensions) {
      $scope.extensionsLoaded = extensions;
    }
  ]);

})(angular);
