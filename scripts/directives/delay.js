(function(ng){
    ng.module('wijit')
        .directive('delay', ['$timeout', function($timeout){
            // var scrpt = document.createElement('script');
            // scrpt.src='http://www.example.com/data.js';
            // document.head.appendChild(scrpt);
            return {
                restrict: 'E',
                // This HTML will replace the zippy directive.
                replace: true,
                // transclude: true,
                // scope: { title:'@zippyTitle' },
                template: '<script src="{{ src }}">',
                // The linking function will add behavior to the template
                link: function(scope, element, attrs) {
                    $timeout(function(){
                        console.log('running delayer with attrs ' + attrs);
                        scope.src = attrs.file;
                    }, attrs.ms || 2000);
                } // link

            }; // return

        }]);

})(angular)
