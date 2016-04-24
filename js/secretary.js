var angular     = require( "angular" ),
angularMaterial = require( "angular-material");

require("angular-material/angular-material.css");
require( "./secretary.css" );

require("angular-route");

// Instanciation du module angular : cabinetModule
// Et injection de dépendance
var cabinetModule = angular.module( "cabinet", [ angularMaterial, 'ngRoute'] );

cabinetModule.config( function($routeProvider){
    
    $routeProvider
	.when("/home", {
	    templateUrl : "js/cabinetMedical/infoCabinet.html"
	})
	.when("/infirmiers", {
	    templateUrl : "js/infirmier/infirmier.html"
	})
	.when("/nouveauPat", {
	    templateUrl : "js/patient/formulaire.html"
	})
	.when("/patients", {
	    templateUrl : "js/patient/patient.html"
	});
    
});

// Noyau
require("./proxyNF.js")(cabinetModule);

// Compsants
require("./cabinetMedical/cabinetMedical.js")(cabinetModule);
//require("./infirmier/infirmier.js")(cabinetModule);
//require("./patient/patient.js")(cabinetModule);
//require("./patient/formulaire.js")(cabinetModule);



