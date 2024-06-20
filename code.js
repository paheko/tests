// ------------------------------------------------------------------------
// fabriquer une chaine aléatoire
const chaine = (length) => {
	let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzàâäéèêëîïôöûüùÀÂÄÉÈÊËÎÏÔÖÛÜÙ';
	let str = '';
    for (let i = 0; i < length; i++) {
        str += chars.charAt(Math.floor(Math.random() * chars.length));
	}
    return str;
}
// renvoyer une chaine
return chaine(10)

// renvoyer un tableau de chaines
for (let i = 0; i < 3 + Math.floor(Math.random() * 5); ++i) {
	${lesnoms} = ${lesnoms}.concat(chaine(10));
}
return ${lesnoms};				// => lesnoms

// ------------------------------------------------------------------------
// fabriquer chaîne avec nom prénom
const upper = (str) => {
	return str.charAt(0).toUpperCase() + str.slice(1);
};
const chaine = (length) => {
	let chars = 'aàbcdeéèfghijklmnoôpqrstuùvwxyz';
	let str = '';
	for (let i = 0; i < length; i++) {
		str += chars.charAt(Math.floor(Math.random() * chars.length));
	}
	let debut = upper(str.slice(0, length/2));
	let fin = upper(str.slice(length/2));
	return debut + ' ' + fin;
};
for (let i = 0; i < 7 + Math.floor(Math.random() * 15); ++i) {
	${lesnoms} = ${lesnoms}.concat(chaine(11 + Math.floor(Math.random() * 5)));
}
return ${lesnoms};

// fabriquer adresse courriel
const chaine = (length) => {
	let chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
	let str = '';
    for (let i = 0; i < length; i++) {
        str += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return str;
};
return chaine(8) + "@ici.fr";

// code postal
return Math.random().toString(10).substring(2, 7);

// numéro téléphone
return '0' + Math.random().toString(10).substring(2, 11);

// supprimer espace dans numéro téléphone
return ${telephone}.replace(/\\s/g, "")


// ------------------------------------------------------------------------
// Calculer date réelle à partir d'une date saisie même bizarre
// ex: 95/31/2020 => 03/10/2022
function joursMois (annee, mois) {
    return new Date(annee, mois, 0).getDate();
}
function getDate(chaine) {
	var ds = chaine.split('/');
	var jour=ds[0];
	var an = Math.floor(ds[1]/12);
	var annee = Number(ds[2]) + an;
	var mois = ds[1] - 12 * an;
	var dm = joursMois(annee, mois);
	while (jour > dm) {
		jour -= dm;
		++mois;
		if (mois > 12) { mois = 1; ++annee; }
		dm = joursMois(annee, mois);
	}
	if (jour < 10) { jour = '0' + jour; }
	if (mois < 10) { mois = '0' + mois; }
	return(jour + '/' + mois + '/' + annee);
}
return getDate(${date});


// ------------------------------------------------------------------------
// rendre visibles les options de filtres de membre
var nav = document.querySelector(".dropdown");
var li = nav.querySelectorAll("li");
for (const l of li) { l.style.display="block"; }
return;


// ------------------------------------------------------------------------
// vérifier la validité d'une date au format JJ/MM/AAAA

// 1. séparer une date JJ/MM/AAAA selon les /
return ${ds}.split('/')			// => ts

// 2. faire une date au format MM-DD-YYYY
return ${ts}[1] + '-' + ${ts}[0] +'-' + ${ts}[2] // => dd

// 3. vérifier si on peut créer une date valide
return ! isNaN(Date.parse(${dd})) // => ok


// ------------------------------------------------------------------------
// créer un tableau d'objets {numéro, catégorie}
// le trier par numéro
// renvoyer le tableau des catégories
let tab = [];
for (let i = 0; i < ${lesnumeros}.length; ++i)
{
	let o = Object();
	o.num=${lesnumeros}[i];
	o.cat=${lescategories}[i];
	tab.push(o);
}

// trier
tab.sort((a, b) => {
	return a.num - b.num;
});

// catégories
let categs = [];
tab.forEach((e) => {
	categs.push(e.cat);
});
return categs;

// ------------------------------------------------------------------------
// renvoyer le numéro d'une catégorie donnée
// params :
// - nom d'une catégorie
// - tableau des catégories classé par numéro croissant
function getNumero(cat_name, categories) {
	let i = 0;
	while (i < categories.length) {
		if (categories[i] == cat_name) { return i + 1; }
		i += 1;
	}
}

return getNumero(${categorie}, ${categories_num});

// ------------------------------------------------------------------------
// trier les membres : voir tri.js
// ------------------------------------------------------------------------

// sélectionner un parent parmi les nb premiers éléments du tableau
// lesnoms
function selParent(lesnoms, lesparents, nb)
{
	while(true) {
		let num = Math.floor(Math.random() * nb);
		if (lesparents[num].length == 0) { return lesnoms[num]; }
	}
}
return selParent(${lesnoms}, ${lesparents}, ${nb_total_membres})

// ------------------------------------------------------------------------
// normaliser une chaîne :
// - mettre en minuscules
// - remplacer les caractères avec accent par leur équivalent sans accent
// ------------------------------------------------------------------------
const accent = "àâäéèêëîïôöùûü";
const normal = "aaaeeeeiioouuu";

function normaliser (chaine) {
	let resu = "";
	chaine = chaine.toLocaleLowerCase();
	for (let i = 0; i < chaine.length; ++i) {
		let ind = accent.indexOf(chaine[i]);
		if (ind == -1) {
			resu += chaine[i];
		} else {
			resu += normal[ind];
		}
	}
	return resu;
}

// const donnee = "Aèzfoj Rdùxiè";
// let resu = normaliser(donnee.toLocaleLowerCase());
// console.log("donnée = " + donnee + "\nresu   = " + resu);

// ------------------------------------------------------------------------
// compter le nb d'occurences d'un élément dans un tableau de chaines
// ------------------------------------------------------------------------
function nbocc(elem, tab) {
	let nb = 0;
	for (const e of tab) {
		if (normaliser(e).localeCompare(elem) == 0) { nb += 1; }
	}
	return nb;
}
//return nbocc(${nom}.toLocaleLowerCase(), ${lesnoms})

// ------------------------------------------------------------------------
// renvoyer un nom au hasard d'un tableau en s'assurant qu'il n'a pas
// d'homonyme après normalisation
// ------------------------------------------------------------------------
function getNom(tab) {
	while (true) {
		let nom = tab.at(Math.floor(Math.random() * tab.length));
		let nb = nbocc(normaliser(nom), tab);
		if (nb == 1) { return nom; }
	}
}
return getNom(${lesnoms})

// ------------------------------------------------------------------------
// vérifier qu'une chaine est présente dans un nom normalisé
// ------------------------------------------------------------------------
function verif(chaine, nom) {
	return normaliser(nom).includes(chaine);
}

// ------------------------------------------------------------------------
// faire un tableau des « homonymes » de chaine
// ------------------------------------------------------------------------
function homonymes(chaine, tab) {
	let homos = []
	for (const e of tab) {
		if (normaliser(e).includes(chaine)) {
			homos.push(e);
		}
	}
	return homos;
}

// idem en renvoyant les indices
function indonymes(chaine, tab) {
	let homos = [];
	for (let i = 0 ; i < tab.length; ++i) {
		if (normaliser(tab[i]).includes(chaine)) {
			homos.push(i);
		}
	}
	return homos;
}

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

