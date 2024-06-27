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
// lesnoms ; le choix se fait uniquement sur des personnes qui ne sont
// pas rattachées, donc qui n'ont pas de parent
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
function getNom(tab)
{
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

// fabriquer un nom qui contient une chaîne donnée
const upper = (str) => {
	return str.charAt(0).toUpperCase() + str.slice(1);
};
function homonyme(chaine, lg) {
	let chars = 'aàbcdeéèfghijklmnoôpqrstuùvwxyz';
	let str = '';
	for (let i = 0; i < lg; i++) {
		str += chars.charAt(Math.floor(Math.random() * chars.length));
	}
	let debut = upper(str.slice(0, lg/2));
	let fin = upper(str.slice(lg/2));
	return debut + chaine + fin;
}
return homonyme(${nom_cherche}, 10);

// ------------------------------------------------------------------------
// générer un nouveau nom en s'assurant qu'il n'a pas
// d'homonyme après normalisation
// ------------------------------------------------------------------------
function genererNom(tab)
{
	while (true) {
		let nom = chaine(12);
		let nb = nbocc(normaliser(nom), tab);
		if (nb == 0) { return nom; }
	}
}
return genererNom(${lesnoms})

