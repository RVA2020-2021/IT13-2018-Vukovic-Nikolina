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
import rva.jpa.TipRacuna;
import rva.repository.TipRacunaRepository;

@CrossOrigin
@RestController
@Api(tags = {"Tip računa CRUD operacije"})
public class TipRacunaRestController {

	@Autowired
	private TipRacunaRepository tipRacunaRepository;
	
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@GetMapping("tipRacuna")
	@ApiOperation(value = "Vraća kolekciju svih tipova računa iz baze podataka.")
	public Collection<TipRacuna> getTipoviRacuna() {
		
		return tipRacunaRepository.findAll();		
	}
	
	@GetMapping("tipRacuna/{id}")
	@ApiOperation(value = "Vraća tip računa u odnosu na prosleđenu vrednost path varijable id.")
	public TipRacuna getTipRacuna(@PathVariable("id") Integer id) {
		return tipRacunaRepository.getOne(id);				
	}
	
	@GetMapping("tipRacunaNaziv/{naziv}")
	@ApiOperation(value = "Vraća kolekciju tipova računa koji imaju naziv koji sadrži vrednost prosleđenu u okviru path varijable naziv.")
	public Collection<TipRacuna> getDobavljacByNaziv(@PathVariable("naziv") String naziv){
		return tipRacunaRepository.findByNazivContainingIgnoreCase(naziv);
	}
	
	@PostMapping("tipRacuna")
	@ApiOperation(value = "Dodaje novi tip računa u bazu podataka.")
	public ResponseEntity<TipRacuna> insertTipRacuna(@RequestBody TipRacuna tipRacuna){
		if(!tipRacunaRepository.existsById(tipRacuna.getId())) {
			tipRacunaRepository.save(tipRacuna);
			return new ResponseEntity<TipRacuna>(HttpStatus.OK);
		}
		return new ResponseEntity<TipRacuna>(HttpStatus.CONFLICT);
	}
	
	@PutMapping("tipRacuna")
	@ApiOperation(value = "Update-uje postojeći tip računa.")
	public ResponseEntity<TipRacuna> updateTipRacuna(@RequestBody TipRacuna tipRacuna){
		if(!tipRacunaRepository.existsById(tipRacuna.getId())) {
			return new ResponseEntity<TipRacuna>(HttpStatus.NO_CONTENT);
		}
		tipRacunaRepository.save(tipRacuna);
		return new ResponseEntity<TipRacuna>(HttpStatus.OK);
	}
	
	@DeleteMapping("tipRacuna/{id}")
	@ApiOperation(value = "Briše tip računa u odnosu na vrednost prosleđene path varijable id.")
	public ResponseEntity<TipRacuna> deleteTipRacuna(@PathVariable("id")  Integer id){
		if (!tipRacunaRepository.existsById(id))
			return new ResponseEntity<TipRacuna>(HttpStatus.NO_CONTENT);
		tipRacunaRepository.deleteById(id);
		if(id == -100) 
			jdbcTemplate.execute(" INSERT INTO \"tip_racuna\" (\"id\", \"naziv\",\"oznaka\",\"opis\")  "
					+ "VALUES (-100, 'Test naziv','Test oznaka','Test opis') ");
		return new ResponseEntity<TipRacuna>(HttpStatus.OK);


	}
}
