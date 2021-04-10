package rva.ctrls;

import java.util.Collection;

//import javax.transaction.Transactional;

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
import rva.repository.KlijentRepository;

@CrossOrigin
@RestController
@Api(tags = {"Klijent CRUD operacije"})
public class KlijentRestController {

	@Autowired
	private KlijentRepository klijentRepository;
	
	
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@GetMapping("klijent")
	@ApiOperation(value = "Vraća kolekciju svih klijenata iz baze podataka.")
	public Collection<Klijent> getKlijenti(){
		return klijentRepository.findAll();
	}
	
	@GetMapping("klijent/{id}")
	@ApiOperation(value = "Vraća klijenta u odnosu na prosleđenu vrednost path varijable id.")
	public Klijent getKlijent(@PathVariable("id") Integer id) {
		return klijentRepository.getOne(id);
		
	}
	
	
//	 ona je ovde porudzbine placenje
	@GetMapping("klijentPrezime/{prezime}")
	@ApiOperation(value = "Vraća kolekciju klijenata koji imaju prezime koje sadrži vrednost prosleđenu u okviru path varijable prezime.")
	public Collection<Klijent> getKlijentByPrezime(@PathVariable("prezime") String prezime) {
		return klijentRepository.findByPrezimeContainingIgnoreCase(prezime);
	}
	
	
	@PostMapping("klijent")
	@ApiOperation(value = "Dodaje novog klijenta u bazu podataka.")
	public ResponseEntity<Klijent> insertKlijent(@RequestBody Klijent klijent) {
		if(!klijentRepository.existsById(klijent.getId())) {
			klijentRepository.save(klijent);
			return new ResponseEntity<Klijent>(HttpStatus.OK);
		}
		return new ResponseEntity<Klijent>(HttpStatus.CONFLICT);
	}
	
	@PutMapping("klijent")
	@ApiOperation(value = "Update-uje postojećeg klijenta.")
	public ResponseEntity<Klijent> updateKlijent(@RequestBody Klijent klijent) {
		if(!klijentRepository.existsById(klijent.getId())) 
			return new ResponseEntity<Klijent>(HttpStatus.NO_CONTENT);			
		klijentRepository.save(klijent);
		return new ResponseEntity<Klijent>(HttpStatus.OK);			
	}
	
	
//	@Transactional 
	@DeleteMapping("klijent/{id}")
	@ApiOperation(value = "Briše klijenta u odnosu na vrednost prosleđene path varijable id.")
	public ResponseEntity<Klijent> deleteKlijent (@PathVariable("id") Integer id){
		if(!klijentRepository.existsById(id))
			return new ResponseEntity<Klijent>(HttpStatus.NO_CONTENT);	
		
		jdbcTemplate.execute("DELETE FROM racun WHERE klijent=" + id );
		klijentRepository.deleteById(id);
		
		if(id == -100) {
			jdbcTemplate.execute(" INSERT INTO \"klijent\" (\"id\", \"ime\", \"prezime\", \"broj_lk\", \"kredit\")  "
						+ "VALUES (-100,'Test ime', 'Test prezime', '4323240', 1) ");
		}
			
		return new ResponseEntity<Klijent>(HttpStatus.OK);			
	
	}
	
}




