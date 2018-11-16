package vintage.tiara.dao;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import vintage.tiara.entity.Category;

@Repository
public interface CategoryDao extends CrudRepository<Category, Long>{
	
	@Modifying
	@Query("update Category s set s.title = :title, s.active = :active where s.id = :id")
	public void update(String title, String active, Long id);
}
