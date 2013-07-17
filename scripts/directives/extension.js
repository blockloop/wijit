(function(ng){
  ng.module('wijit').directive('extension', ['$timeout',

    function($timeout) {
      return {
        restrict: 'E',
        priority: 0,
        template: '<div ng-include="getExtInclude(ext)"></div>',
        link: function($scope, element, attrs) {
          var ext = $scope.ext;
          attrs.$set('ng-controller', ext.ctrl);
          element.html(ext.template);
        }
      };
  }]);
})(angular);
