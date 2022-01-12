package app.repository;

import app.domain.Adventure;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AdventureRepository extends JpaRepository<Adventure, Integer> {
    Adventure getById(int id);
    List<Adventure> findByOwnerId(int id);
    Adventure findByName(String name);
}