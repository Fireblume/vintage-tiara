package vintage.tiara.dao;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import vintage.tiara.entity.Category;

@Repository
public interface CategoryDao extends CrudRepository<Category, Long>{
	

}
