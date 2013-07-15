(function() {
  
  // extensions to load
  var extList = [];
  var fs = require('fs');

  // read extensions directory
  fs.readdir('./extensions/',function(err,files){
    if(err) throw err;

    // loop through the extension files and make them available as modules
    files.forEach(function(file){

      // load the extension as modules
      require(file);

      // get the name of the extension
      var name = file.match(/(\w+)?Extension/)[1];

      // push the item to the internal list
      extList.push(extension);
    });

  }); // fs.readdir

  // declare modules
  angular.module('wijit', extList);

})();
