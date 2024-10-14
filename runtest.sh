#!/bin/bash

# ------------------------------------------------------------------------
#
# Exécuter un ou plusieurs tests d'un fichier selenium
# au préalable :
# - convertir le fichier généré par l'IDE dans le format attendu par le runner
# - copier « au bon endroit » (/tmp) les fichiers pour les tests d'import
#
# Remarque : je tue le processus quand le message de fin apparait
# pour essayer de contourner le bug qui envoie le message ci-dessous :
#
# Jest did not exit one second after the test run has completed.
# 'This usually means that there are asynchronous operations that
# weren't stopped in your tests. Consider running Jest with
# `--detectOpenHandles` to troubleshoot this issue.
# voir aussi https://github.com/SeleniumHQ/selenium-ide/issues/1819
#
# TODO :
# - si zenity n'est pas disponible, faire un menu en mode texte
#   voir du côté de jq (bôf)
# ------------------------------------------------------------------------

aide()
{
	cat <<EOF >& 2
Exécuter un, plusieurs ou tous les tests d'un fichier de test Selenium
Appel : $(basename $0) -f fichier [-a] [-c] [-n] [-v] [-z répertoire] [-h] [-t timeout] [test ..]

-f fichier    : fichier de test
-a            : exécuter tous les tests du fichier
-c            : afficher la fenêtre de chrome
-n            : ne pas tuer le processus en fin de test
-v            : afficher la ligne de commande
-z répertoire : sauver une copie d'écran dans le répertoire en cas d'échec
-t timeout    : définir une attente max (défaut : 200000 ms)
-h            : afficher cette aide
test          : nom (partiel ou complet) d'un test ou d'une suite à exécuter
                si absent, affiche un sélecteur pour choisir une des suites du fichier
EOF
}

traiter_test()
{
	motif="^Ran all test suites.*"
	while read line
	do
		if
			echo "$line" | grep -q -e "Playback._executionLoop"
		then
			continue
		else
			echo "$line"
			if
				echo $line | grep -q -E -e "$motif"
			then
				echo "** Fini ***"
				pids=$(pgrep --full selenium-side-runner)
				if [[ -n "$pids" ]]
				then
					kill $pids
				fi
				ps faux | grep selenium-side-runner | grep -v grep
			fi
		fi
	done
}

# les constantes
CHROME_OPTIONS=disable-search-engine-choice-screen,disable-infobars
JEST_OPTIONS='"\"--detectOpenHandles\""'
TIMEOUT=200000

# les options
IMGDIR=""
KILL=1
declare -A options=(
	[--jest-timeout]=${TIMEOUT}
	[--jest-options]=${JEST_OPTIONS}
)

# Traiter les arguments
ARGS=""
while [[ $# -gt 0 ]]
do
	case "$1" in
		-f )
			# nom du fichier de test
			shift
			TESTFILE="$1"
			if
				! echo "$TESTFILE" | grep -q -e "_v3"
			then
				TESTFILE=${TESTFILE/.side/_v3.side}
			fi
			shift
			;;
		-a )
			# exécuter tous les tests
			TESTS=tous
			shift
			;;
		-c )
			# afficher la fenêtre de chrome
			CHROME=yes
			shift
			;;
		-n )
			# ne pas tuer le processus en fin de test
			KILL=0
			shift
			;;
		-t )
			# timeout
			shift
			TIMEOUT="$1"
			shift
			;;
		-v )
			# afficher la ligne de commande
			AFFCOMM=1
			shift
			;;
		-z )
			shift
			IMGDIR="$1"
			mkdir -p $IMGDIR
			shift
			;;
		-h | -? )
			aide
			exit
			;;
		-* )
			# autres arguments de selenium-side-runner (+-)
			ARGS+=" $1"
			shift
			;;
		* )
			# exécuter les tests fournis en argument
			break
			;;
	esac
done

# vérifier si on a un nom de fichier
if [[ -z "$TESTFILE" ]]
then
	printf "\n*** Erreur : il manque le nom du fichier de test ***\n\n" >& 2
	aide
	exit
fi

if [[ -z "$CHROME" ]]
then
	CHROME_OPTIONS="${CHROME_OPTIONS},headless"
fi
options[-c]+="goog:chromeOptions.args=[${CHROME_OPTIONS}]"

if [[ -n "$IMGDIR" ]]
then
	options[-z]+=${IMGDIR}
fi

options[--timeout]=${TIMEOUT}

# la commande
COMMANDE="selenium-side-runner $ARGS"
for elem in ${!options[@]}
do
	COMMANDE="${COMMANDE} $elem ${options[$elem]}"
done

# S'assurer que le script de test est à jour
make ${TESTFILE}
if [[ $? -ne 0 ]]
then
	exit $?
fi

# copier les fichiers à envoyer dans /tmp
rm -f Membres*.csv *membres.csv
cp -p fichiers/* /tmp

# exécuter les tests

if [[ "$TESTS" == "tous" ]]
then
	# exécuter tous les tests
	COMMEXEC="${COMMANDE} ${TESTFILE}"
	if [[ -n "$AFFCOMM" ]]
	then
		printf "%s\n\n" "$COMMEXEC"
	fi
	if [[ $KILL -eq 1 ]]
	then
		eval ${COMMEXEC} 2>&1 | traiter_test
	else
		eval ${COMMEXEC}
	fi
elif [[ $# -gt 0 ]]
then
	# exécuter les tests passés en arguments
	for test in "$@"
	do
		echo "Tester « $test »"
		COMMEXEC="${COMMANDE} -f \"$test\" ${TESTFILE}"
		if [[ -n "$AFFCOMM" ]]
		then
			printf "%s\n\n" "$COMMEXEC"
		fi
		if [[ $KILL -eq 1 ]]
		then
			eval ${COMMEXEC} 2>&1 | traiter_test
		else
			eval ${COMMEXEC}
		fi
	done
else
	# Afficher les noms des suites de tests
	lesTests=$(awk \
				'/"suites"/ { suite=1 } ; \
				$1 ~ /"name":/ && suite { print gensub(/^.*: "(.+)",$/, "\\1", "g")}' \
				${TESTFILE} | \
				sort | \
				zenity \
					--width=440 --height=500 \
					--title "Suites" \
					--text "Choisir au moins une suite" \
					--list \
					--multiple \
					--column "Test"
				 )

	OLDIFS=$IFS
	IFS="\|"
	for test in $lesTests
	do
		COMMEXEC="${COMMANDE} -f \"$test\" ${TESTFILE}"
		if [[ -n "$AFFCOMM" ]]
		then
			printf "%s\n\n" "$COMMEXEC"
		fi
		CURIFS=$IFS
		IFS=$OLDIFS
		if [[ $KILL -eq 1 ]]
		then
			eval ${COMMEXEC} 2>&1 | traiter_test
		else
			eval ${COMMEXEC}
		fi
		IFS=$CURIFS
	done
	IFS=$OLDIFS
fi
