package rva.ctrls;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import rva.jpa.Klijent;
import rva.jpa.Racun;
import rva.repository.KlijentRepository;
import rva.repository.RacunRepository;

@CrossOrigin
@RestController
@Api(tags = {"Račun CRUD operacije"})
public class RacunRestController {
	
	@Autowired
	private RacunRepository racunRepository;
	
	@Autowired
	private KlijentRepository klijentRepository;
	
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@GetMapping("racun")
	@ApiOperation(value = "Vraća kolekciju svih računa iz baze podataka.")
	public Collection<Racun> getRacuni(){
		return racunRepository.findAll();
	}
	
	@GetMapping("racun/{id}")
	@ApiOperation(value = "Vraća račun u odnosu na prosleđenu vrednost path varijable id.")
	public Racun getRacun(@PathVariable("id") Integer id) {
		return racunRepository.getOne(id);
		
	}
	
	
	@GetMapping("racuniZaKlijentID/{id}")
	@ApiOperation(value = "Vraća kolekciju računa u odnosu na prosleđenu vrednost path varijable id koja se odnosi na id klijenta.")
	public Collection<Racun> getRacuniPoKlijentID(@PathVariable("id") Integer id) {
		Klijent kl = klijentRepository.getOne(id);
		return racunRepository.findByKlijent(kl);
	
	}
	
	@GetMapping("racunNaziv/{naziv}")
	@ApiOperation(value = "Vraća kolekciju računa koji imaju naziv koji sadrži vrednost prosleđenu u okviru path varijable naziv.")
	public Collection<Racun> getRacunByNaziv(@PathVariable("naziv") String naziv) {
		return racunRepository.findByNazivContainingIgnoreCase(naziv);
	}

	
	@PostMapping("racun")
	@ApiOperation(value = "Dodaje novi račun u bazu podataka.")
	public ResponseEntity<Racun> insertRacun(@RequestBody Racun racun) {
		if(!racunRepository.existsById(racun.getId())) {
			racunRepository.save(racun);
			return new ResponseEntity<Racun>(HttpStatus.OK); 
		}
		return new ResponseEntity<Racun>(HttpStatus.CONFLICT);
	}
	
	@PutMapping("racun")
	@ApiOperation(value = "Update-uje postojeći račun.")
	public ResponseEntity<Racun> updateRacun(@RequestBody Racun racun) {
		if (!racunRepository.existsById(racun.getId())) {
			
			return new ResponseEntity<Racun>(HttpStatus.NO_CONTENT);			
		}
		racunRepository.save(racun);
		return new ResponseEntity<Racun>(HttpStatus.OK);
	}
	
	@DeleteMapping("racun/{id}")
	@ApiOperation(value = "Briše račun u odnosu na vrednost prosleđene path varijable id.")
	public ResponseEntity<Racun> deleteRacun(@PathVariable("id") Integer id){
		if(!racunRepository.existsById(id))
			return new ResponseEntity<Racun>(HttpStatus.NO_CONTENT);				
		racunRepository.deleteById(id);
		if(id == -100) {
			jdbcTemplate.execute(" INSERT INTO \"racun\" (\"id\", \"naziv\", \"oznaka\", \"opis\", \"tip_racuna\", \"klijent\")  "
					+ "VALUES ('-100','Test naziv', 'Test oznaka', 'Test opis', 1, 1) ");
				}
		return new ResponseEntity<Racun>(HttpStatus.OK);	
		}
	
}
