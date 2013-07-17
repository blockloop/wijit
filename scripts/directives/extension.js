(function(){
  angular.module('wijit').directive('extension', ['extensionService',

    function(extensionService) {
      return {
        restrict: 'E',
        priority: 999,
        link: function($scope, element, attrs) {
          setTimeout(function () {
            var extName = attrs.extname;
            console.log('running extension directive for ' + extName);
            var ext = extensionService.getExtension(extName);
            if (!ext) {
              console.log('Could not find extension ' + extName);
              return;
            }

            attrs.$set('ng-controller', extName.concat('Ctrl'));
          }, 100);
        }
      };
  }]);
})()
