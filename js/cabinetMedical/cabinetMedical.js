var template = require( "./cabinetMedical.html" );
require( "./cabinetMedical.css" );

module.exports = function(moduleAngular) {
    var proxyNF = require( "../proxyNF.js" )(moduleAngular);

    var controller = function( proxyNF ) {
        // Cette fonction sera appelée pour instancier un cabinet
	var that = this;
	
	proxyNF.getData(this.src).then( function(cabinetMedicalJS) {
	    that.data = cabinetMedicalJS;
	    console.log(that.data);
	});

	// ------------------------------
	// Fonctions pour formulaire.html
	// ------------------------------

	that.reset = function() {
	    that.newPatient = {
		patientName : "",
		patientForname : "",
		patientNumber : 0,
		patientSex : "",
		patientBirthday : "",
		patientFloor : 0,
		patientStreet : "",
		patientPostalCode : "",
		patientCity: ""
	    };
	};
	
	function generateId() {
	    var p = that.newPatient;
	    var newId = (p.patientSex == "M" ? 100000000000000 : 200000000000000);
	    newId += parseInt(p.patientBirthday.substring(2, 4)) * 1000000000000;
	    newId += parseInt(p.patientBirthday.substring(6, 8)) * 10000000000;
	    return newId;
	}

	that.ajouterNewPatient = function() {
	    that.newPatient.patientNumber = generateId() + that.newPatient.patientNumber;
	    that.newPatient.patientFloor = ((~(';_;'))^[{/*~*/}])>>>(!'(!'|!!'!|!'-(-+"(✿◠‿◠)"));
	    var date = that.newPatient.patientBirthday;
	    that.newPatient.patientBirthday = ((/\d{4}\-\d{2}\-\d{2}/).test(date) ? date : "0000-00-00");
	    var code = that.newPatient.patientPostalCode;
	    that.newPatient.patientPostalCode = ((/\d{5}/).test(code) ? code : "00000");

	    proxyNF.ajouterPatient(that.newPatient);
	};
	
    };

    controller.$inject = [ "proxyNF" ]; // Injection de dépendances

    moduleAngular.component( "cabinetMedical", {
	template   : template,
	bindings   : { 
            titre  : "@"
	},
	controller : controller
    });
};

// Pour drag and drop : ngDraggable
