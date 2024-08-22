#!/bin/bash

# TODO :
# - passer le nom du script selenium en argument
# - si zenity n'est pas disponible, faire un menu en mode texte


# ------------------------------------------------------------------------
# exécuter le test et tuer le processus quand le message de fin apparait
# ceci pour essayer de contourner le bug qui envoie le message ci-dessous :
#
# Jest did not exit one second after the test run has completed.
#
# 'This usually means that there are asynchronous operations that
# weren't stopped in your tests. Consider running Jest with
# `--detectOpenHandles` to troubleshoot this issue.
# voir aussi https://github.com/SeleniumHQ/selenium-ide/issues/1819
# ------------------------------------------------------------------------

aide()
{
	cat <<EOF
Exécuter un, plusieurs ou tous les tests d'un fichier de test Selenium
Appel : $(basename $0) [-f fichier] [-a] [-c] [-n] [-z répertoire] [-h] [test ..]

-f fichier    : fichier de test (défaut : membres.side)
-a		      : exécuter tous les tests du fichier
-c		      : afficher la fenêtre de chrome
-n		      : ne pas tuer le processus en fin de test
-v			  : afficher la ligne de commande
-z répertoire : sauver une copie d'écran dans le répertoire indiqué
-h		      : afficher cette aide
test	      : nom (partiel ou complet) d'un test ou d'une suite à exécuter
EOF
}

traiter_test()
{
	motif="^Ran all test suites.*"
	while read line
	do
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
	done
}

# les constantes
CHROME_OPTIONS=disable-search-engine-choice-screen
JEST_OPTIONS='"\"--detectOpenHandles\""'
TIMEOUT=1000000

# les options
IMGDIR=""
KILL=1
TESTFILE=membres_v4.side
declare -A options
options=(
	[--jest-timeout]=${TIMEOUT}
	[--jest-options]=${JEST_OPTIONS}
)

# Traiter les arguments
while [[ $# -gt 0 ]]
do
	case "$1" in
		-f )
			shift
			TESTFILE="$1"
			if
				! echo "$TESTFILE" | grep -q -e "_v4"
			then
				TESTFILE=$(basename "$TESTFILE" ".side")_v4.side
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
		"-h" | -? )
			aide
			exit
			;;
		* )
			# exécuter les tests fournis en argument
			break
			;;
	esac
done

if [[ -z "$CHROME" ]]
then
	CHROME_OPTIONS="${CHROME_OPTIONS},headless"
fi
options[-c]+="goog:chromeOptions.args=[${CHROME_OPTIONS}]"

if [[ -n "$IMGDIR" ]]
then
	options[-z]+=${IMGDIR}
fi

# la commande
COMMANDE=selenium-side-runner
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

# copie les fichiers à envoyer dans /tmp
rm -f Membres*.csv *membres.csv
cp -p *.csv /tmp
cp -p cv*.pdf /tmp

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
