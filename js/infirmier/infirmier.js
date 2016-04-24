require("./infirmier.css");
var template = require("./infirmier.html");

module.exports = function(moduleAngular) {
    var proxyNF = require( "../proxyNF.js" )(moduleAngular);

    var controller = function( proxyNF ) {
		
    };
  
		controller.$inject = [ "proxyNF" ]; // Injection de dépendances

		moduleAngular.component( "infirmier", {
			template   : template,
			bindings   : { 
            titre  : "@"
			},
			controller : controller
		});
};
