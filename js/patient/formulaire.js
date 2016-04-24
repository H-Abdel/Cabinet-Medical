var template = require("./formulaire.html");

module.exports = function(moduleAngular) {
    var proxyNF = require( "../proxyNF.js" )(moduleAngular);
    
    var controller = function( proxyNF ) {
	var that = this;

	// voir cabinetMedical.js pour les vraies fonctions qui font de vrais trucs...
	
	this.ajouterNewPatient = function ( ) {
	    proxyNF.ajouterPatient(that.newPatient);
	};
	
	this.reset = function () {
	    that.newPatient = {};
	};
	
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
