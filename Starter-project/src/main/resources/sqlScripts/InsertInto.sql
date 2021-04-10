--KREDIT PODACI
insert into kredit  ("id", "naziv", "oznaka", "opis")
	values (1,'Gotovinski','A001923','Namenjen licima kojima je potreban veci iznos gotovine.');
insert into kredit ("id", "naziv", "oznaka", "opis")
	values (2,'Hipotekarni','A023100','Namenjen za izgradnju i rekonstrukciju nepokretnosti.');
insert into kredit ("id", "naziv", "oznaka", "opis")
	values (3,'Potrosacki','A122309','Namenjen licima koji ostvaruju prihode iz stalnog radnog odnosa.');
insert into kredit ("id", "naziv", "oznaka", "opis")
	values (4,'Studentski','B080021','Namenjen redovnim i vanrednim studentima.');

--KLIJENT PODACI
insert into klijent ("id","ime","prezime","broj_lk","kredit")
	values (1,'Nikolina','Vukovic',007123401,4);
insert into klijent ("id","ime","prezime","broj_lk","kredit")
	values (2,'Petra','Vukovic',008437712,2);
insert into klijent ("id","ime","prezime","broj_lk","kredit")
	values (3,'Stefan','Milovac',012639006,3);
insert into klijent ("id","ime","prezime","broj_lk","kredit")
	values (4,'Vlado','Tomic',008131969,1);
	
	
--TIP RACUNA
insert into tip_racuna ("id", "naziv","oznaka")
	values (1,'Tekuci','A990201');
insert into tip_racuna ("id", "naziv","oznaka")
	values (2,'Ziro','B384902');
insert into tip_racuna  ("id", "naziv","oznaka", "opis")
	values (3,'Stedni','A050032','Namenjen za klijente koji zele da stvore ustedjevinu.');
insert into tip_racuna ("id", "naziv","oznaka", "opis")
	values (4,'Devizni','H043201','Namenjen za upravljanje prilivima i placanjima u inostranstvu.');
		
	
--RACUN PODACI
insert into racun ("id", "naziv","oznaka","tip_racuna","klijent")
	values (1,'Nikolina Vukovic','1293846574',1,1);
insert into racun ("id", "naziv","oznaka","tip_racuna","klijent")
	values (2,'Petra Vukovic','210032106',2,2);
insert into racun ("id", "naziv","oznaka","tip_racuna","klijent")
	values (3,'Stefan Milovac','320685704',4,3);
insert into racun ("id", "naziv","oznaka","tip_racuna","klijent")
	values (4,'Vlado Tomic','002310564',3,4);
	

--Test podaci

INSERT INTO "kredit" ("id", "naziv", "oznaka", "opis")
VALUES (-100, 'TestNaziv', 'TestOznaka','TestOpis');
INSERT INTO "klijent" ("id","ime","prezime","broj_lk","kredit")
VALUES (-100, 'TestIme', 'TestPrez', 6362782, 1);
INSERT INTO "racun" ("id", "naziv","oznaka","opis","tip_racuna","klijent")
VALUES (-100, 'TestNaziv', 'TestOznaka', 'TestOpis', 1, 1);
INSERT INTO "tip_racuna"  ("id", "naziv","oznaka", "opis")
VALUES (-100, 'TestNaziv','TestOznaka', 'TestOpis');


