FICHIERS= \
	Makefile \
	membres.side \
	membres_v3.side \
	runtest.sh \
	.side.yml \
	todo.org \
	fichiers

# convertir le fichier IDE => runner
%_v3.side : %.side
	npx @seleniumhq/side-migrate $< $@

archive : membres.tar.gz
membres.tar.gz : $(FICHIERS)
	tar --posix -zcf $@ $^
