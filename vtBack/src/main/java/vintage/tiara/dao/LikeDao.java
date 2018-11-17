package vintage.tiara.dao;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import vintage.tiara.entity.Like;
import vintage.tiara.entity.Product;

@Repository
public interface LikeDao extends CrudRepository<Like, Long>{
	
	@Query("from Product p inner join Like l on p.id = l.productid where l.uid = :uid")
	public Iterable<Product> getAllLikes(String uid);

}
