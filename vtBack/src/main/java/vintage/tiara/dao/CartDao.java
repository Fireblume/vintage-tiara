package vintage.tiara.dao;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import vintage.tiara.entity.Cart;
import vintage.tiara.entity.ProdCart;

@Repository
public interface CartDao extends CrudRepository<Cart, Long>{

	@Query("select new vintage.tiara.entity.ProdCart(p.id, c.id, c.uid, p.title, p.description, c.quantity,"
			+ " p.photo, p.price, c.active, p.active) from Product p inner join Cart c on p.id = c.productid"
			+ " where c.uid = :uid")
	public Iterable<ProdCart> getCartItems(String uid);
	
	@Query("select count(*) from Cart c where c.uid = :uid")
	public int countCartItems(String uid);
}
