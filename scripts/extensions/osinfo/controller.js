(function(){
    exports = module.exports = function(args) {
        var require = args.require;
        var _ = require('lodash');
        var moment = require('moment');
        var util = require('util');
        var os = require('os');

        ng.module('osinfo').controller('OsinfoCtrl', ['$scope', '$http', 'configService', controller]);

        function controller($scope, $http, configService) {
            configService.get('something');
            $scope.hostname = os.hostname();
            $scope.cpu = os.cpus()[0].model;
            $scope.cpuCount = os.cpus().length;
            $scope.uptime = getUptime();
            $scope.localIp = getLocalIp();

            // no more than every 15 minutes
            $scope.publicIp = $http.get('http://icanhazip.com');

            // windows top processes
            // run with C:\Windows\SysWOW64\WindowsPowerShell\v1.0\powershell.exe for x64
            // and C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe for x86
            // Get-Process | sort CPU | select -last 5
            
            // OSX ps aux -r | head -n 5
            // LINUX ps aux --sort -%cpu | head -n 5

        }


        //
        // privates
        //
        function getUptime() {
            var ts = moment.duration(os.uptime(), 'seconds');
            var result = util.format('%dd %dh %dm %ds', ts.days(), ts.hours(), ts.minutes(), ts.seconds());
            return result;
        }

        function getLocalIp() {
            var ifaces=os.networkInterfaces();

            for (var dev in ifaces) {
                if (dev.match(/bridge/)) continue;
                var ip = _.find(ifaces[dev], function(details) {
                    return details.family=='IPv4' && details.address != '127.0.0.1';
                });
                if (ip) return ip;
            }
        }

        // function getPublicIp() {
        //     var options = {
        //         host: 'icanhazip.com'
        //     };

        //     http.get(options, function(res) {
        //         console.log("Got response: " + res.statusCode);
        //     }).on('data', function (chunk) {
        //         console.log('BODY: ' + chunk);
        //     });
        // }
    };
})();
