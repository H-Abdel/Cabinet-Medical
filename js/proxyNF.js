var proxyNF = function($http) {

    this.getData = function(src) {
	return $http.get("data/cabinetInfirmier.xml").then(processData);
    };

    function processData(response) {
	// Récupère ce qu'il y a dans les balises XML
	var xmlDoc = new DOMParser().parseFromString(response.data, "application/xml");

	// Infirmiers
	var infs = xmlDoc.querySelector("infirmiers").getElementsByTagName("infirmier");
	var getInfirmier = function(i) {
	    return {
		id: i.getAttribute("id"),
		nom: i.querySelector("nom").textContent,
		prenom: i.querySelector("prenom").textContent,
		photo: 	i.querySelector("photo").textContent,
		patients: []
	    };
	};

	// Patients
	var ps = xmlDoc.querySelector("patients").getElementsByTagName("patient");
	var getPatient = function(p) {
	    return {
		id: p.querySelector("numero").textContent,
		nom: p.querySelector("nom").textContent,
		prenom: p.querySelector("prenom").textContent,
		sexe: p.querySelector("sexe").textContent,
		date: p.querySelector("naissance").textContent,
		adresse: {
		    rue: p.querySelector("rue").textContent,
		    ville: p.querySelector("ville").textContent,
		    codePostal: p.querySelector("codePostal").textContent
		},
		infirmier: p.querySelector("visite").getAttribute("intervenant")
	    };
	};
	
	// Cabinet
	var cab = {
	    nom : xmlDoc.querySelector("nom").textContent,
	    adresse : {
		numero: xmlDoc.querySelector("numero").textContent,
		rue: xmlDoc.querySelector("rue").textContent,
		ville: xmlDoc.querySelector("ville").textContent,
		codePostal: xmlDoc.querySelector("codePostal").textContent
	    }
	};
	
	return {
	    infimiers : [].slice.call( infs ).map(getInfirmier),
	    patients  : [].slice.call( ps ).map(getPatient),
	    cabinet   : cab
	};
    }

/*
<<<<<<< HEAD
    // 
    this.addPatient = function (patient) {
	
    };

    // 
    this.delPatient = function (patient) {
	
    };

    // 
    this.affectPatient = function (patient) {
	
    };

    // 
    this.desaffectPatient = function (patient) {
	
    };

*/

    this.ajouterPatient = function(patient) {
	return $http({
            method: 'POST',
            url: "/addPatient",
            data: patient,
            header: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(
			function (responce) {},
			function (responce) {}
        );
    };

/*

    this.affectationPatient = function(infirmier) {
	return $http({
	    method: 'POST',
	    url: "/affectation",
	    data: infirmier
	});
    };

    this.desaffecterPatient = function(id){
    	return $http({
    	    method: 'POST',
    	    url: "/desaffectation",
    	    data: id,
    	    header: {"Content-Type": "application/json"}
    	});
    };
*/

};



proxyNF.$inject = ["$http"];

module.exports = function(mod) {
    var id = "proxyNF";
    mod.service(id, proxyNF);
    return id;
};
