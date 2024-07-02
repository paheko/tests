// trier par numéro
function trierNumeros(tnumeros, tnoms, croissant = true)
{
	let tab = [];
	for (let i = 0; i < tnumeros.length; ++i)
	{
		let o = Object();
		o.numero = tnumeros[i];
		o.nom = tnoms[i];
		tab.push(o);
	}
	ordre = croissant ? 1 : -1;
	tab.sort((a, b) => { return ordre * (a.numero - b.numero); });
	return tab;
}

// trier par nom puis par numéro
function trierNoms(tnoms, tnumeros, croissant = true)
{
	let tab = [];
	for (let i = 0; i < tnoms.length; ++i)
	{
		let o = Object();
		o.nom = tnoms[i];
		o.numero = tnumeros[i];
		tab.push(o);
	}

	tab.sort((a, b) => {
		if (! croissant) { [a, b] = [b, a]; }
		let comp = a.nom.localeCompare(b.nom);
		if (comp == 0) { comp = a.numero - b.numero; }
		return comp;
	});
	return tab;
}

// afficher un tableau
function afficher(msg, tab)
{
	console.log("\n" + msg);
	for (let i = 0; i < tab.length; ++i)
	{
		console.log(tab[i]);
	}
}

// trier par ville puis par numéro
// ville (dé)croissant, numéro (dé)croissant
// ville vide en fin(début), numéro (dé)croissant
function trierVilles(tvilles, tnumeros, croissant = true)
{
	let tab = [];
	for (let i = 0; i < tvilles.length; ++i) {
		let o = Object();
		o.ville = tvilles[i];
		o.numero = tnumeros[i];
		tab.push(o);
	}

	tab.sort((a, b) => {
		if (! croissant) { [a, b] = [b, a]; }

		// une ville au moins vide ?
		if (a.ville == '' && b.ville == '') { return a.numero - b.numero; }
		if (a.ville == '') { return 1; }
		if (b.ville == '') { return -1; }

		// deux villes non vides
		let comp = a.ville.localeCompare(b.ville);
		if (comp == 0) { comp = a.numero - b.numero; }
		return comp;
	});
	return tab;
}

// trier les membres selon le parent
// - parent (dé)croissant, nom membre (dé)croissant, numéro (dé)croissant
// - parent vide à la fin, nom membre (dé)croissant, numéro (dé)croissant
function trierParents(tparents, tnoms, tnumeros, croissant = true)
{
	let tab = [];
	for (let i = 0; i < tnumeros.length;  ++i) {
		let o = Object();
		o.numero = tnumeros[i];
		o.nom = tnoms[i];
		o.parent = tparents[i];
		tab.push(o);
	}
	tab.sort((a, b) => {
		ordre = croissant ? 1 : -1;

		// un parent au moins est vide ?
		if (a.parent == '' && b.parent == '') {
			let comp = a.nom.localeCompare(b.nom);
			if (comp == 0) { comp = a.numero - b.numero; }
			return comp * ordre;
		}
		if (a.parent == '') { return 1; }
		if (b.parent == '') { return -1; }

		// deux parents non vides
		let comp = a.parent.localeCompare(b.parent);
		if (comp == 0) { comp = a.nom.localeCompare(b.nom); }
		if (comp == 0) { comp = a.numero - b.numero; }
		return comp * ordre;
	});

	return tab;
}

// trier les membres selon la colonne responsable
// - non vide au début, nom membre (dé)croissant, numéro (dé)croissant
// - vide à la fin, nom membre (dé)croissant, numéro (dé)croissant
function trierResp(tresp, tnoms, tnumeros, croissant = true)
{
	let tab = [];
	for (let i = 0; i < tnumeros.length;  ++i) {
		let o = Object();
		o.numero = tnumeros[i];
		o.nom = tnoms[i];
		o.resp = tresp[i];
		tab.push(o);
	}
	tab.sort((a, b) => {
		ordre = croissant ? 1 : -1;

		// un resp au moins est vide ?
		if (a.resp == '' && b.resp == '') {
			let comp = a.nom.localeCompare(b.nom);
			if (comp == 0) { comp = a.numero - b.numero; }
			return comp * ordre;
		}
		if (a.resp == '') { return 1; }
		if (b.resp == '') { return -1; }

		// deux resp non vides (forcément = "Oui")
		let comp = a.nom.localeCompare(b.nom);
		if (comp == 0) { comp = a.numero - b.numero; }
		return comp * ordre;
	});

	return tab;
}

// ------------------------------------------------------------------------
// les données et les tests
// ------------------------------------------------------------------------

const tnumeros = [
	1, 2, 3, 4, 5, 6, 7, 8, 9, 110,
	111, 112, 113, 114, 115, 116, 117, 118, 119, 120,
	121, 122, 123
];

const tnoms = [
	"Lambert Paul", "Sjqeaz Njguqô", "Gfjkms Ôfyike", "Xnunèp Tmhàxz", "Xhràèk Ùmunyv",
	"Jgévxù Wohyrv", "Mèkixt Ùyimtd", "Zhamberlain Luuc", "Ézhaée Ùùpwab", "Éàkhhô Psyauà",
	"Lambert Paul", "Zphjéà Irôezqé", "Mpùuky Blégmmz", "Htôtkl Sxgtrô", "Kcfyè Nsvmvq",
	"Hdzcpèn Rddpdafx", "Èàrgkx Idèpoù", "Rhocry Dlùvwpq", "Ziùcwe Hpqltrs", "Brkcàg Nigcyi",
	"Jtinjôù Wmwiônj", "Cylsx Nzoèwl", "Éxiqnh Fcbwizà"
];

const tvilles = [
	"", "Erawvcyfézgrfoi", "Jbqmqeyemdbstcf", "Ùhkfwuvgpcuèùqa", "Yécewxefmepôàeé",
	"La Havane", "Fyàwxsbedwanxqt", "", "Sipkàoféuslgiiu", "Psôhègébulaùdzm",
	"Pioùôutôeyytùlà", "", "", "", "",
	"", "", "", "La Havane", "", "", "La Havane", ""
];

const parents = [
	"", "", "", "", "",
	"", "Jgévxù Wohyrv", "", "Zhamberlain Luuc", "",
	"", "", "", "Xhràèk Ùmunyv", "Xnunèp Tmhàxz",
	"", "Jgévxù Wohyrv", "", "Zhamberlain Luuc", "Gfjkms Ôfyike",
	"Sjqeaz Njguqô", "Jgévxù Wohyrv", "Sjqeaz Njguqô"
];

const tresp = [
	"", "Oui", "Oui", "Oui", "Oui",
	"Oui", "", "Oui", "", "",
	"", "", "", "", "",
	"", "", "", "", "",
	"", "", ""
];

// console.log("p.l = " + parents.length + ", nom.l = " + tnoms.length + ", num.l = " + tnumeros.length + ", r.l = " + resp.length);

// trier par nom croissant puis décroissant
let tab_noms = trierNoms(tnoms, tnumeros);
afficher("Tri par nom croissant :", tab_noms);

tab_noms = trierNoms(tnoms, tnumeros, false);
afficher("Tri par nom décroissant :", tab_noms);

// trier par ville croissante puis décroissante
let tab_villes = trierVilles(tvilles, tnumeros);
afficher("Tri par ville croissant :", tab_villes);

tab_villes = trierVilles(tvilles, tnumeros, false);
afficher("Tri par ville décroissant :", tab_villes);

// trier par parent croissant
let tab_parents = trierParents(parents, tnoms, tnumeros);
afficher("Tri par parent croissant :", tab_parents);

tab_parents = trierParents(parents, tnoms, tnumeros, false);
afficher("Tri par parent décroissant :", tab_parents);

// trier par resp croissant
let tab_resp = trierResp(tresp, tnoms, tnumeros);
afficher("Tri par resp croissant :", tab_resp);

tab_resp = trierResp(tresp, tnoms, tnumeros, false);
afficher("Tri par resp décroissant :", tab_resp);


// ------------------------------------------------------------------------
// 1. première ville vide et dernière ville vide
//	  ==> comparer numéro premier et numéro dernier, inverser si besoin
// 2. première ville vide et dernière ville non vide
//	  décroissant : inverser si besoin
// 3. première ville non vide et dernière ville vide
//	  croissant : inverser si besoin
// 4. première ville non vide et dernière ville non vide
//	  4.1 première ville < dernière ville : croissant, inverser si besoin
//	  4.2 première ville > dernière ville : décroissant, inverser si besoin
//	  4.3 première ville = dernière ville
//	  ==> comparer numéro premier et numéro dernier, inverser si besoin
// ------------------------------------------------------------------------

if (${premiere_ville} == "" && ${derniere_ville} == "")
{
	if (${numero_premier} > ${numero_dernier})
	{
		// décroissant : inverser si besoin
	} else {
		// croissant : inverser si besoin
	}
}
else if (${premiere_ville} == "" && ${derniere_ville} != "")
{
	// décroissant : inverser si besoin
}
else if (${premiere_ville} != "" && ${derniere_ville} == "")
{
	// croissant : inverser si besoin
}
else if (${premiere_ville} != "" && && ${derniere_ville} != "")
{
	if (${premiere_ville}.localeCompare(${derniere_ville}) < 0)
	{
		// croissant : inverser si besoin
	} else if (${premiere_ville}.localeCompare(${derniere_ville}) > 0)
	{
		// décroissant : inverser si besoin
	} else {
		if (${numero_premier} > ${numero_dernier})
		{
			// décroissant : inverser si besoin
		} else {
			// croissant : inverser si besoin
		}
	}
}

// simplification ordre croissant
if (${premiere_ville} == "" && ${derniere_ville} == ""
	&&
	${numero_premier} > ${numero_dernier})
{
	// décroissant : inverser
}
else if (${premiere_ville} == "" && ${derniere_ville} != "")
{
	// décroissant : inverser
}
else if (${premiere_ville} != "" && && ${derniere_ville} != "")
{
	if (${premiere_ville}.localeCompare(${derniere_ville}) > 0
		||
		(${premiere_ville}.localeCompare(${derniere_ville}) == 0
		 &&
		 ${numero_premier} > ${numero_dernier}))
	{
		// décroissant : inverser
	}
}


// simplification ordre décroissant
if (${premiere_ville} == "" && ${derniere_ville} == ""
	&&
	${numero_premier} < ${numero_dernier})
{
	// croissant : inverser
}
else if (${premiere_ville} != "" && ${derniere_ville} == "")
{
	// croissant : inverser
}
else if (${premiere_ville} != "" && && ${derniere_ville} != "")
{
	if (${premiere_ville}.localeCompare(${derniere_ville}) < 0
		||
		(${premiere_ville}.localeCompare(${derniere_ville}) == 0
		 &&
		 ${numero_premier} < ${numero_dernier}))
	{
		// croissant : inverser
	}
}


// ------------------------------------------------------------------------
// contrôler si les membres sont triés par ordre (dé)croissant du nom du parent
//
// 1) au moins 2 parents non vides (donc forcément les deux premiers)
//	- parent1 < parent2 => croissant
//	- parent1 > parent2 => décroissant
//	- parent1 = parent2
//		- membre1 < membre2   => croissant
//		- membre1 > membre2   => décroissant
//		- membre1 = membre2
//			- numéro1 < numéro 2 => croissant
//			- numéro1 > numéro 2 => décroissant
// 2) un seul parent non vide (donc le premier)
//	- membre2 < membre3   => croissant
//	- membre2 > membre3   => décroissant
//	- membre2 = membre3
//		- numéro2 < numéro 3 => croissant
//		- numéro2 > numéro 3 => décroissant

if (${nb_parents} >= 2)
{
	if (${parent1}.localeCompare(${parent2}) < 0)
	{
		// croissant
	}
	else if (${parent1}.localeCompare(${parent2}) > 0)
	{
		// décroissant
	}
	else if (${membre1}.localeCompare(${membre2}) < 0)
	{
		// croissant
	}
	else if (${membre1}.localeCompare(${membre2}) > 0)
	{
		// décroissant
	}
	else if (${numero1} < ${numero2})
	{
		// croissant
	}
	else //if (${numero1} > ${numero2})
	{
		// décroissant
	}
}
// un seul parent
else if (${nb_total_membres} > 2)
{
	if (${membre2}.localeCompare(${membre3}) < 0)
	{
		// croissant
	}
	else if (${membre2}.localeCompare(${membre3}) > 0)
	{
		// décroissant
	}
	else if (${numero2} < ${numero3})
	{
		// croissant
	}
	else //if (${numero2} > ${numero3})
	{
		// décroissant
	}
}

// simplification ordre croissant
if (${nb_parents}) >= 2)
{
	if ((${parent1}.localeCompare(${parent2}) > 0)
		||
		(${parent1}.localeCompare(${parent2}) == 0
		 && ${membre1}.localeCompare(${membre2}) > 0)
		||
		(${parent1}.localeCompare(${parent2}) == 0
		 && ${membre1}.localeCompare(${membre2}) == 0
		 && ${numero1} > ${numero2}))
	{
		// décroissant => inverser
	}
}
// un seul parent
else if (${nb_total_membres} > 2)
{
	if ((${membre2}.localeCompare(${membre3}) > 0)
		||
		(${membre2}.localeCompare(${membre3}) == 0
		 && ${numero2} > ${numero3}))
	{
		// décroissant => inverser
	}
}

// simplification ordre décroissant
if (${nb_parents}) >= 2)
{
	if ((${parent1}.localeCompare(${parent2}) < 0)
		||
		(${parent1}.localeCompare(${parent2}) == 0
		 && ${membre1}.localeCompare(${membre2}) < 0)
		||
		(${parent1}.localeCompare(${parent2}) == 0
		 && ${membre1}.localeCompare(${membre2}) == 0
		 && ${numero1} < ${numero2}))
	{
		// croissant => inverser
	}
}
// un seul parent
else if (${nb_total_membres} > 2)
{
	if ((${membre2}.localeCompare(${membre3}) < 0)
		||
		(${membre2}.localeCompare(${membre3}) == 0
		 && ${numero2} < ${numero3}))
	{
		// croissant => inverser
	}
}

// ------------------------------------------------------------------------
// contrôler si les membres sont triés par ordre (dé)croissant de la colonne responsable
// colonne responsable non vide en tête
//
// 1) au moins 2 oui dans la colonne responsable (donc forcément les deux premiers)
//	- membre1 < membre2   => croissant
//	- membre1 > membre2   => décroissant
//	- membre1 = membre2
//		- numéro1 < numéro 2 => croissant
//		- numéro1 > numéro 2 => décroissant
// 2) un seul oui dans la colonne responsable (donc le premier)
//	- numéro2 < numéro 3 => croissant
//	- numéro2 > numéro 3 => décroissant

if (${nb_resp} >= 2)
{
	if (${membre1}.localeCompare(${membre2}) < 0)
	{
		// croissant
	}
	else if (${membre1}.localeCompare(${membre2}) > 0)
	{
		// décroissant
	}
	else if (${numero1} < ${numero2})
	{
		// croissant
	}
	else //if (${numero1} > ${numero2})
	{
		// décroissant
	}
}
// un seul responsable
else if (${nb_total_membres} > 2)
{
	if (${membre2}.localeCompare(${membre3}) < 0)
	{
		// croissant
	}
	else if (${membre2}.localeCompare(${membre3}) > 0)
	{
		// décroissant
	}
	else if (${numero2} < ${numero3})
	{
		// croissant
	}
	else //if (${numero2} > ${numero3})
	{
		// décroissant
	}
}

// simplification ordre croissant
if (${nb_resp}) >= 2)
{
	if (${membre1}.localeCompare(${membre2}) > 0
		||
		(${membre1}.localeCompare(${membre2}) == 0
		 && ${numero1} > ${numero2}))
	{
		// décroissant => inverser
	}
}
// un seul responsable
else if (${nb_total_membres} > 2)
{
	if (${membre2}.localeCompare(${membre3}) > 0
		||
		(${membre2}.localeCompare(${membre3}) == 0
		 && ${numero2} > ${numero3}))
	{
		// décroissant => inverser
	}
}

// simplification ordre décroissant
if (${nb_resp}) >= 2)
{
	if (${membre1}.localeCompare(${membre2}) < 0
		||
		(${membre1}.localeCompare(${membre2}) == 0
		 && ${numero1} < ${numero2}))
	{
		// croissant => inverser
	}
}
// un seul responsable
else if (${nb_total_membres} > 2)
{
	if (${membre2}.localeCompare(${membre3}) < 0
		||
		(${membre2}.localeCompare(${membre3}) == 0
		 && ${numero2} < ${numero3}))
	{
		// croissant => inverser
	}
}

let numeros = [ 8, 5, 9, 2,	3, 6, 7, 4, 1 ];

let noms = [ "Yopduu Cxùbvnn", "Xeosnm Rixwxé", "Vonôdjz Jcpùuèf", "Tnczgèb Ùttypmt",
			 "Sdcrdi Vzùmbim", "Kgazmà Éurbdv", "Izgzwùz Evjsqjeù","Hmupazn Chrédki",
			 "Lambert Paul" ];

let parents = [	"Lambert Paul",	"Lambert Paul",	"Lambert Paul",	"Lambert Paul",
				"Lambert Paul",	"Lambert Paul",	"Lambert Paul",	"Lambert Paul", "" ];

function inverser(numeros, noms, parents)
{
	for (let i = 0; i < numeros.length; ++i) {
		if (parents[i] != "") {
			premier = i;
			break;
		}
	}
	for (let i = numeros.length - 1; i >= 0; --i) {
		if (parents[i] != "") {
			dernier = i;
			break;
		}
	}
	console.log("premier : ", numeros[premier], noms[premier], parents[premier]);
	console.log("dernier : ", numeros[dernier], noms[dernier], parents[dernier]);

	if (parents[premier].localeCompare(parents[dernier]) < 0)
	{
		console.log(parents[premier], "<", parents[dernier]);
	}
	if (parents[premier].localeCompare(parents[dernier]) == 0 &&
		noms[premier].localeCompare(noms[dernier]) < 0)
	{
		console.log(parents[premier], "=", parents[dernier]);
		console.log(noms[premier], "<", noms[dernier]);
	}
	if (parents[premier].localeCompare(parents[dernier]) == 0 &&
		noms[premier].localeCompare(noms[dernier]) == 0 &&
		numeros[premier] < numeros[dernier])
	{
		console.log(parents[premier], "=", parents[dernier]);
		console.log(noms[premier], "=", noms[dernier]);
		console.log(numeros[premier], "<", numeros[dernier]);
	}

	if (parents[premier].localeCompare(parents[dernier]) < 0
		||
		(parents[premier].localeCompare(parents[dernier]) == 0 &&
		 noms[premier].localeCompare(noms[dernier]) < 0)
		||
		(parents[premier].localeCompare(parents[dernier]) == 0 &&
		 noms[premier].localeCompare(noms[dernier]) == 0 &&
		 numeros[premier] < numeros[dernier]))
	{
		console.log("Inverser le tri");
	}
	else {
		console.log("Tri ok");
	}
}
inverser(numeros, noms, parents);

