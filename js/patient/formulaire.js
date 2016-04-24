var template = require("./formulaire.html");

module.exports = function(moduleAngular) {
    var proxyNF = require( "../proxyNF.js" )(moduleAngular);

    var controller = function( proxyNF ) {
		
		var that = this;
		
		that.newPatient = {
			
			"ville" = "grenoble",
			
			};
		
		this.ajouterNewPatient = function ( ) {
		
			proxyNF.ajouterPatient(that.newPatient);
		
		};
		
		this.reset() = function ( ) {
		
		}
		
    };
  
		controller.$inject = [ "proxyNF" ]; // Injection de dépendances

		moduleAngular.component( "formulaire", {
			template   : template,
			bindings   : { 
            titre  : "@"
			},
			controller : controller
		});
};
