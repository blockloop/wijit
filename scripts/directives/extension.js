(function(ng){
  ng.module('wijit').directive('extension', ['$timeout',

    function($timeout) {
      return {
        restrict: 'E',
        priority: 0,
        scope: {
          ext: '='
        },
        link: function($scope, element, attrs) {
          var extName = $scope.ext.name;
          console.log('running extension directive for ' + extName);

          attrs.$set('ng-controller', $scope.ext.ctrl);
          element.html('<pre>' + JSON.stringify($scope.ext) + '</pre>');
        }
      };
  }]);
})(angular);
