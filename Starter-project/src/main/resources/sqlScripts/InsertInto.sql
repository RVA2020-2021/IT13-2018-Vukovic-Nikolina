--KREDIT PODACI
insert into kredit  ("id", "naziv", "oznaka", "opis")
	values (nextval('kredit_seq'),'Gotovinski','A001923','Namenjen licima kojima je potreban veci iznos gotovine.');
insert into kredit ("id", "naziv", "oznaka", "opis")
	values (nextval('kredit_seq'),'Hipotekarni','A023100','Namenjen za izgradnju i rekonstrukciju nepokretnosti.');
insert into kredit ("id", "naziv", "oznaka", "opis")
	values (nextval('kredit_seq'),'Potrosacki','A122309','Namenjen licima koji ostvaruju prihode iz stalnog radnog odnosa.');
insert into kredit ("id", "naziv", "oznaka", "opis")
	values (nextval('kredit_seq'),'Studentski','B080021','Namenjen redovnim i vanrednim studentima.');

--KLIJENT PODACI
insert into klijent ("id","ime","prezime","broj_lk","kredit")
	values (nextval('klijent_seq'),'Nikolina','Vukovic',007123401,4);
insert into klijent ("id","ime","prezime","broj_lk","kredit")
	values (nextval('klijent_seq'),'Petra','Vukovic',008437712,2);
insert into klijent ("id","ime","prezime","broj_lk","kredit")
	values (nextval('klijent_seq'),'Stefan','Milovac',012639006,3);
insert into klijent ("id","ime","prezime","broj_lk","kredit")
	values (nextval('klijent_seq'),'Vlado','Tomic',008131969,1);
	
	
--TIP RACUNA
insert into tip_racuna ("id", "naziv","oznaka")
	values (nextval('tip_racuna_seq'),'Tekuci','A990201');
insert into tip_racuna ("id", "naziv","oznaka")
	values (nextval('tip_racuna_seq'),'Ziro','B384902');
insert into tip_racuna  ("id", "naziv","oznaka", "opis")
	values (nextval('tip_racuna_seq'),'Stedni','A050032','Namenjen za klijente koji zele da stvore ustedjevinu.');
insert into tip_racuna ("id", "naziv","oznaka", "opis")
	values (nextval('tip_racuna_seq'),'Devizni','H043201','Namenjen za upravljanje prilivima i placanjima u inostranstvu.');
		
	
--RACUN PODACI
insert into racun ("id", "naziv","oznaka","tip_racuna","klijent")
	values (nextval('racun_seq'),'Nikolina Vukovic','1293846574',1,1);
insert into racun ("id", "naziv","oznaka","tip_racuna","klijent")
	values (nextval('racun_seq'),'Petra Vukovic','210032106',2,2);
insert into racun ("id", "naziv","oznaka","tip_racuna","klijent")
	values (nextval('racun_seq'),'Stefan Milovac','320685704',4,3);
insert into racun ("id", "naziv","oznaka","tip_racuna","klijent")
	values (nextval('racun_seq'),'Vlado Tomic','002310564',3,4);
	

--Test podaci

INSERT INTO "kredit" ("id", "naziv", "oznaka", "opis")
VALUES (-100, 'TestNaziv', 'TestOznaka','TestOpis');
INSERT INTO "klijent" ("id","ime","prezime","broj_lk","kredit")
VALUES (-100, 'TestIme', 'TestPrez', 6362782, 1);
INSERT INTO "racun" ("id", "naziv","oznaka","opis","tip_racuna","klijent")
VALUES (-100, 'TestNaziv', 'TestOznaka', 'TestOpis', 1, 1);
INSERT INTO "tip_racuna"  ("id", "naziv","oznaka", "opis")
VALUES (-100, 'TestNaziv','TestOznaka', 'TestOpis');


