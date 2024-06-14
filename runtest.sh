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
TESTFILE=paheko_v4.side
# TESTFILE=tests_v4.side
BROWSER=chrome
CHROME_OPT="goog:chromeOptions.args=[headless]"
TIMEOUT=1000000
JESTOPTIONS='"\"--detectOpenHandles\""'

# les options
declare -A options
options=(
	[-c]=${CHROME_OPT}
	[--jest-timeout]=${TIMEOUT}
	[--jest-options]=${JESTOPTIONS}
)

# la commande
COMMANDE=selenium-side-runner
for elem in ${!options[@]}
do
	COMMANDE="${COMMANDE} $elem ${options[$elem]}"
done

# Traiter les arguments
while [[ $# -gt 0 ]]
do
	case "$1" in
		"-t")
			shift
			TESTFILE="$1"
			if
				! echo "$TESTFILE" | grep -q -e "_v4"
			then
				TESTFILE=$(basename "$TESTFILE" ".side")_v4.side
			fi
			shift
			;;
		"-a")
			# exécuter tous les tests
			tests="tous"
			break
			;;
		*)
			# exécuter les tests fournis en argument
			break
			;;
	esac
done

# S'assurer que le script de test est à jour
make ${TESTFILE}

if [[ "$tests" == "tous" ]]
then
	# exécuter tous les tests
	COMMEXEC="${COMMANDE} ${TESTFILE}"
	eval ${COMMEXEC} 2>&1 | traiter_test
elif [[ $# -gt 0 ]]
	 # exécuter les tests passés en arguments
then
	for test in "$@"
	do
		echo "Tester « $test »"
		COMMEXEC="${COMMANDE} -f \"$test\" ${TESTFILE}"
		eval ${COMMEXEC} 2>&1 | traiter_test
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
		CURIFS=$IFS
		IFS=$OLDIFS
		eval ${COMMEXEC} 2>&1 | traiter_test
		IFS=$CURIFS
	done
	IFS=$OLDIFS
fi
