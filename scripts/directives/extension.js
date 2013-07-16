(function(){
  angular.module('wijit').directive('extension', ['extensionService', function(extensionService) {

    return {
      restrict: 'E',
      priority: 0,
      transclude: true,
      link: function($scope, element, attrs) {
        // $scope.$whenReady(function() {
          console.log('running extension directive');
          var extName = attrs.name;
          var ext = extensionService.getExtension(extName);
          if (!ext) return;

          attrs.$set('ng-controller', extName.concat('Ctrl'));
        // });
      }
    };
  }]);
})()
