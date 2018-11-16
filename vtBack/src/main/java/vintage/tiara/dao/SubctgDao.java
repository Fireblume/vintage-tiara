package vintage.tiara.dao;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import vintage.tiara.entity.Subcategory;

@Repository
public interface SubctgDao extends CrudRepository<Subcategory, Long>{
	
	@Query("from Subcategory s where s.categoryid = :id")
	public Iterable<Subcategory> getByCtgId(Long id);
	
	@Modifying
	@Query("delete from Subcategory s where s.categoryid = :id")
	public void deleteByCtgId(Long id);
	
	@Modifying
	@Query("update Subcategory s set s.title = :title, s.active = :active where s.id = :id")
	public void update(String title, String active, Long id);
}

