package rva.repository;

import java.util.Collection;
import org.springframework.data.jpa.repository.JpaRepository;
import rva.jpa.Kredit;

public interface KreditRepository extends JpaRepository <Kredit, Integer>{
	
	//findBy - govori da je get, Naziv - polje po kome vrsimo pretragu
	Collection<Kredit> findByNazivContainingIgnoreCase(String naziv);
}
