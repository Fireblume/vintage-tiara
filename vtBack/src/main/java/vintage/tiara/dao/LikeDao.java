package vintage.tiara.dao;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import vintage.tiara.entity.Like;
import vintage.tiara.entity.ProdLike;

@Repository
public interface LikeDao extends CrudRepository<Like, Long>{
	
	@Query("select new vintage.tiara.entity.ProdLike(p.id, c.id, c.uid, p.title, p.description, p.quantity,"
			+ " p.photo, p.price, p.active, p.newest, p.sale, p.onsale) from Product p inner join Like c on p.id = c.productid"
			+ " where c.uid = :uid")
	public Iterable<ProdLike> getAllLikes(String uid);

}
