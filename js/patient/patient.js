require("./patient.css");
var template = require("./patient.html");

module.exports = function(moduleAngular) {
    var proxyNF = require( "../proxyNF.js" )(moduleAngular);

    var controller = function( proxyNF ) {
		
    };
  
		controller.$inject = [ "proxyNF" ]; // Injection de dépendances

		moduleAngular.component( "patient", {
			template   : template,
			bindings   : { 
            titre  : "@"
			},
			controller : controller
		});
};
