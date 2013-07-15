var doApp = angular.module('doApp', []);

var win = require('nw.gui').Window.get();
win.showDevTools();
win.on('close', function() {
  this.hide(); 
  console.log("Closing...");
  this.close(true);
});