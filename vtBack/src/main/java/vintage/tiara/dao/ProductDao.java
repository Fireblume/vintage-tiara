package vintage.tiara.dao;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import vintage.tiara.entity.Product;

@Repository
public interface ProductDao extends CrudRepository<Product, Long>{
	
	@Query("from Product s where s.subcategoryid = :id")
	public Iterable<Product> getBySubctgId(Long id);
	
	@Query("from Product s where s.newest = 'Y' or s.onsale = 'Y'")
	public Iterable<Product> getNewSale();
	
	@Modifying
	@Query("delete from Product s where s.subcategoryid = :id")
	public void deleteBySubctgId(Long id);
	
	@Modifying
	@Query("update Product s set s.title = :title, s.active = :active, s.description = :desc, "
			+ "s.quantity = :quantity, s.photo = :photo, s.price = :price, s.newest = :isNew, "
			+ "s.sale = :sale, s.onsale = :onsale where s.id = :id")
	public void update(String title, String desc, String photo, String price, int quantity, String active, 
			Long id, String isNew, int sale, String onsale);
	
	@Query("from Product p where p.title LIKE %:search% or p.description like %:search%")
	public Iterable<Product> search(String search);
}
