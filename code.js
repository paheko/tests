// ------------------------------------------------------------------------
// fabriquer une chaine aléatoire
const mdp = (length) => {
	let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzàâäéèêëîïôöûüùÀÂÄÉÈÊËÎÏÔÖÛÜÙ&~"#\'{([-|`_@)]=°+}€<>,?;.:/!§«»¿×÷¡';
	let str = '';
    for (let i = 0; i < length; i++) {
        str += chars.charAt(Math.floor(Math.random() * chars.length));
	}
    return str;
}
// renvoyer une chaine
return mdp(10)

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
return chaine(8) + "@" + chaine(5) + ".fr";

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
const nav = document.querySelector(".dropdown");
const li = nav.querySelectorAll("li");
for (const l of li) { l.style.display="block"; }
return;

// rendre visibles les options d'export
const nav = document.querySelector(".tabs");
let span = nav.querySelector("aside > span > span");
span.style.display = "block";
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
// faire un tableau d'indice des « homonymes » de chaine
// tab est un tableau d'objets (nom, numero)
// ------------------------------------------------------------------------
function indonymes(chaine, tab) {
	let homos = [];
	for (let i = 0 ; i < tab.length; ++i) {
		if (normaliser(tab[i].nom).includes(chaine)) {
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

// ------------------------------------------------------------------------
// générer une nouvelle adresse de courriel en s'assurant qu'elle est unique
// ------------------------------------------------------------------------
function genererCourriel(tab)
{
	while (true) {
		let courriel = chaine(8) + "@" + chaine(5) + ".fr";
		let nb = nbocc(courriel, tab);
		if (nb == 0) { return courriel; }
	}
};
return genererCourriel(${lescourriels})

// ------------------------------------------------------------------------
// sélectionner un courriel au hasard dans un tableau en s'assurant
// qu'il est unique et renvoyer son indice
// ------------------------------------------------------------------------
function getCourriel(tab)
{
	while (true) {
		let ind = Math.floor(Math.random() * tab.length);
		let nom = tab.at(ind);
		if (nom.length > 0) {
			let nb = nbocc(nom, tab);
			if (nb == 1) { return ind; }
		}
	}
}
return getCourriel(${lescourriels})

// fabriquer un courriel qui contient une chaîne (@xxx) donnée
function homonyme(chaine, lg) {
	let chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
	let str = '';
	for (let i = 0; i < lg; i++) {
		str += chars.charAt(Math.floor(Math.random() * chars.length));
	}
	return str + chaine + ".fr";
}
return homonyme(${courriel_cherche}, 9);

// fabriquer une date (pseudo-)aléatoire
function getDate()
{
	let date = new Date();
	let ms = date.getTime();
	ms += 3 + Math.floor(Math.random() * 5 * 24 * 60 * 60 * 1000);
	date.setTime(ms);
	return date.toLocaleDateString();
}

// ------------------------------------------------------------------------
// cocher toutes les cases du corps de la table quand celle de
// la ligne de titre est cochée
// param idCase : case de la ligne de titre
// ------------------------------------------------------------------------
function cocher(idCase)
{
	const table = idCase.closest("table");
	const body = table.querySelector("tbody");
	const cases = body.querySelectorAll('td[class="check"] > input[type="checkbox"]');
	for (let i = 0; i < cases.length; ++i) {
		cases[i].checked = true;
	}
}

// ------------------------------------------------------------------------
// ajouter tous les membres d'une page au tableau paramètre
// ------------------------------------------------------------------------
function ajouterMembresPage(tmembres)
{
	for (const elem of document.querySelectorAll('table[class="list"] > tbody > tr'))
	{
		let o = Object();
		o.numero = elem.querySelector('td[class="num"]').textContent.trim();
		o.nom = elem.querySelector('th').textContent.trim();
		tmembres.push(o);
	}
	return tmembres;
}

// ------------------------------------------------------------------------
// ajouter des membres au tableau paramètre
// ------------------------------------------------------------------------
const upper = (str) => { return str.charAt(0).toUpperCase() + str.slice(1);} ; const chaine = (length) => { let chars = 'aàbcdeéèfghijklmnoôpqrstuùvwxyz'; let str = ''; for (let i = 0; i < length; i++) { str += chars.charAt(Math.floor(Math.random() * chars.length));} let debut = upper(str.slice(0, length/2)); let fin = upper(str.slice(length/2)); return debut + ' ' + fin; }
function ajouterMembres(tmembres, num)
{
	for (let i = 0; i < 7 + Math.floor(Math.random() * 15); ++i) {
		let o = Object();
		o.nom = chaine(11 + Math.floor(Math.random() * 5));
		o.numero = num;
		tmembres.push(o);
		++num;
	}
	return tmembres;
}

// Compter le nombre de membres créés et modifiés
function compter()
{
	let o = { cree: 0, modif: 0 };
	for (const msg of document.querySelectorAll('summary > h2'))
	{
		if (msg.textContent.includes('créé')) {
			o.cree = Number(msg.textContent.split(' ')[0]);
		}
		if (msg.textContent.includes('modifié')) {
			o.modif = Number(msg.textContent.split(' ')[0]);
		}
	}
	return o;
}

// additionner les codes des nb premiers caractères d'une chaîne
// @pre nb <= chaine.length
function calculer(nb, chaine)
{
	let somme = 0;
	for (let i = 0; i < nb; ++i) {
		somme += chaine.charCodeAt(i);
	}
	return somme;
}

function mod(courriel)
{
	return courriel.substr(0, courriel.indexOf('@')) + "@ici.bzh";
}

// fabriquer chaîne date + heure
return ${valeur_champ_date} + " à " + ${valeur_champ_time}.replace(/:/, "h")

// calculer le nombre d'années entières entre deux dates
// d1 : sous la forme jj/mm/aaaa
// d2 : Date avec d1 <= d2
function diff(d1, d2)
{
	let [j1, m1, a1] = d1.split('/').map((x) => Number(x));
	let a2 = d2.getFullYear();
	let m2 = d2.getMonth() + 1;
	let j2 = d2.getDate();
	let diffAnnee = a2 - a1;
	if ((m2 < m1) || (m2 == m1 && j2 < j1)) { --diffAnnee; }
	return diffAnnee;
}

return diff("30/10/2015", new Date());

// cas où la deuxième date est celle du jour
function diff(d1)
{
	let [j1, m1, a1] = d1.split('/').map((x) => Number(x));
	const d2 = new Date();
	let a2 = d2.getFullYear();
	let m2 = d2.getMonth() + 1;
	let j2 = d2.getDate();
	let diffAnnee = a2 - a1;
	if ((m2 < m1) || (m2 == m1 && j2 < j1)) { --diffAnnee; }
	return diffAnnee;
}
