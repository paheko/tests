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

// extraire le tableau des noms d'un tableau d'objets trié
function extraireNoms(tab)
{
	let noms = [];
	tab.forEach((e) => {
		noms.push(e.nom);
	});
	return noms;
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
	for (let i = 0; i < tvilles.length; ++i)
	{
		let o = Object();
		o.ville = tvilles[i];
		o.numero = tnumeros[i];
		tab.push(o);
	}

	tab.sort((a, b) => {
		if (! croissant) { [a, b] = [b, a]; }

		// une ville au moins vide ?
		if (a.ville == "" && b.ville == "") { return a.numero - b.numero; }
		if (a.ville == "") { return 1; }
		if (b.ville == "") { return -1;}

		// deux villes non vides
		let comp = a.ville.localeCompare(b.ville);
		if (comp == 0) { comp = a.numero - b.numero; }
		return comp;
	});
	return tab;
}

// extraire le tableau des villes d'un tableau d'objets trié
function extraireVilles(tab)
{
	let villes = [];
	tab.forEach((e) => {
		villes.push(e.ville);
	});
	return villes;
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
		if (a.parent == "" && b.parent == "") {
			let comp = a.nom.localeCompare(b.nom);
			if (comp == 0) { comp = a.numero - b.numero; }
			return comp * ordre;
		}
		if (a.parent == "") { return 1; }
		if (b.parent == "") { return -1; }

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
		if (a.resp == "" && b.resp == "") {
			let comp = a.nom.localeCompare(b.nom);
			if (comp == 0) { comp = a.numero - b.numero; }
			return comp * ordre;
		}
		if (a.resp == "") { return 1; }
		if (b.resp == "") { return -1; }

		// deux resp non vides
		let comp = a.resp.localeCompare(b.resp);
		if (comp == 0) { comp = a.nom.localeCompare(b.nom); }
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
// let tnoms_trie = extraireNoms(tab_noms);
// afficher("Tableau de noms trié en ordre croissant", tnoms_trie);

tab_noms = trierNoms(tnoms, tnumeros, false);
afficher("Tri par nom décroissant :", tab_noms);
// tnoms_trie = extraireNoms(tab_noms);
// afficher("Tableau de noms trié en ordre décroissant", tnoms_trie);

// trier par ville croissante puis décroissante
let tab_villes = trierVilles(tvilles, tnumeros);
afficher("Tri par ville croissant :", tab_villes);
// let tvilles_trie = extraireVilles(tab_villes);
// afficher("Tableau de villes trié en ordre croissant", tvilles_trie);

tab_villes = trierVilles(tvilles, tnumeros, false);
afficher("Tri par ville décroissant :", tab_villes);
// tvilles_trie = extraireVilles(tab_villes);
// afficher("Tableau de villes trié en ordre décroissant", tvilles_trie);

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

