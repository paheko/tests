# Tests Paheko

Suite de tests du [logiciel de gestion d'association Paheko](https://fossil.kd2.org/paheko)

## Outils
- [Selenium IDE](https://www.selenium.dev/selenium-ide)
- [Selenium runner](https://www.selenium.dev/selenium-ide/docs/en/introduction/command-line-runner)

### Remarques
- l'IDE produit du code en version 2
- le runner veut du code version 3
- il faut donc convertir le fichier produit par l'IDE avec la commande `npx @seleniumhq/side-migrate`
(voir Makefile)

## Config serveur
- définir un hôte virtuel : `test.paheko.localhost`
- directives à placer dans le fichier `config.local.php`

```php
	if ('test.paheko.localhost' === ($_SERVER['SERVER_NAME'] ?? null)) {
		$path = '/tmp/test_paheko_selenium';

		if (isset($_GET['__reset_test'])) {
			shell_exec('rm -rf ' . escapeshellarg($path));
		}

		define('Paheko\DATA_ROOT', $path);
		define('Paheko\DB_FILE', $path . '/association.sqlite');

		// simplifier la connexion de l'admin pour les tests
		if (!empty($_GET['__login_user'])) {
			define('Paheko\LOCAL_LOGIN', (int)$_GET['__login_user']);
		}
	}
	else {
		// Ici configurer le Paheko en utilisation "hors tests"
	}
```

- connexion simplifiée (sans saisie du mot de passe) de l'admin pour
  les tests : ajouter `?__login_user=1` à la fin de l'URL à tester

## Exécuter les tests
- Avant d'exécuter les tests, il faut désactiver le profiler
- Le script `runtest.sh` permet d'exécuter un, plusieurs ou tous les
tests d'un fichier de test *Selenium* ; il positionne quelques
constantes, convertit le fichier produit par l'IDE si nécessaire et
copie dans /tmp les fichiers requis par les tests.
- Il y a un bug en fin d'exécution (voir commentaire dans le script) ;
pour le contourner, le script *tue* le processus quand le message de
fin apparaît.

### Options en ligne de commande
-  -f fichier    : fichier de test
-  -a            : exécuter tous les tests du fichier
-  -c            : afficher la fenêtre de chrome
-  -n            : ne pas tuer le processus en fin de test
-  -v            : afficher la ligne de commande
-  -z répertoire : sauver une copie d'écran dans le répertoire en cas d'échec
-  -t timeout    : définir une attente max (défaut : 200000 ms)
-  -h            : afficher cette aide
-  test          : nom (partiel ou complet) d'un test ou d'une suite à exécuter ;
				  si absent, affiche un sélecteur pour choisir une des suites du fichier

### Exemples
  - passer tous les tests : `./runtest.sh -f membres.side -a`
  - certains tests  : `./runtest.sh -f membres.side 08` va passer les tests dont le titre commence par 08

## Tests installation

## Tests de connexion

## Tests des membres
