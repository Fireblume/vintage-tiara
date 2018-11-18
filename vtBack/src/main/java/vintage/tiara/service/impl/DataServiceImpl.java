package vintage.tiara.service.impl;

import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.microsoft.sqlserver.jdbc.SQLServerException;

import vintage.tiara.dao.CartDao;
import vintage.tiara.dao.CategoryDao;
import vintage.tiara.dao.LikeDao;
import vintage.tiara.dao.ProductDao;
import vintage.tiara.dao.SubctgDao;
import vintage.tiara.entity.Cart;
import vintage.tiara.entity.Category;
import vintage.tiara.entity.Like;
import vintage.tiara.entity.ProdCart;
import vintage.tiara.entity.ProdLike;
import vintage.tiara.entity.Product;
import vintage.tiara.entity.Subcategory;
import vintage.tiara.service.DataService;

@Service
public class DataServiceImpl implements DataService{
	
	@Autowired
	private CategoryDao categoryDao;
	
	@Autowired
	private SubctgDao subctgDao;
	
	@Autowired
	private ProductDao productDao;
	
	@Autowired
	private LikeDao likeDao;

	@Autowired 
	private CartDao cartDao;
	
	@Override
	public Iterable<Subcategory> getAllSubctgs() {
		return subctgDao.findAll();
	}

	@Override
	public Subcategory create(Subcategory subcategory) throws SQLServerException, Exception {
		return subctgDao.save(subcategory);
	}

	@Override
	public Optional<Subcategory> findByIdSubcategory(Long id) {
		return subctgDao.findById(id);
	}

	@Override
	public void delete(Subcategory subcategory) {
		subctgDao.delete(subcategory);
		
	}

	@Override
	public void deleteSubcategory(Long id) {
		subctgDao.deleteById(id);
	}

	@Override
	public Iterable<Category> getAllCategories() {
		return categoryDao.findAll();
	}

	@Override
	public Category create(Category category) throws SQLServerException, Exception {
		return categoryDao.save(category);
	}

	@Override
	public Optional<Category> findByIdCategory(Long id) {
		return categoryDao.findById(id);
	}

	@Override
	public void delete(Category category) {
		categoryDao.delete(category);
	}

	@Override
	public void deleteCategory(Long id) {
		categoryDao.deleteById(id);
	}

	@Override
	public Iterable<Subcategory> getByCtgId(Long id) {
		return subctgDao.getByCtgId(id);
	}

	@Override
	@Transactional
	public void deleteByCtgId(Long id) {
		subctgDao.deleteByCtgId(id);
		
	}

	@Override
	@Transactional
	public void updateSubctg(String title, String active, Long id) {
		subctgDao.update(title, active, id);
		
	}

	@Override
	@Transactional
	public void updateCategory(String title, String active, Long id) {
		categoryDao.update(title, active, id);
		
	}

	@Override
	public Iterable<Product> getAllProducts() {
		return productDao.findAll();
	}

	@Override
	@Transactional
	public Iterable<Product> getBySubctgId(Long id) {
		return productDao.getBySubctgId(id);
	}

	@Override
	public Product create(Product product) throws SQLServerException, Exception {
		return productDao.save(product);
	}

	@Override
	public Optional<Product> findByIdProduct(Long id) {
		return productDao.findById(id);
	}

	@Override
	public void delete(Product product) {
		productDao.delete(product);
	}

	@Override
	public void deleteProduct(Long id) {
		productDao.deleteById(id);
	}

	@Override
	@Transactional
	public void deleteBySubctgId(Long id) {
		productDao.deleteBySubctgId(id);
	}

	@Override
	@Transactional
	public void updateProduct(String title, String desc, String photo, String price, int quantity, String active,
			Long id) {
		productDao.update(title, desc, photo, price, quantity, active, id);		
	}

	@Override
	public Iterable<ProdLike> getAllLikes(String uid) {
		return likeDao.getAllLikes(uid);
	}

	@Override
	public Like create(Like like) throws SQLServerException, Exception {
		return likeDao.save(like);
	}

	@Override
	public void delete(Like like) {
		likeDao.delete(like);
	}

	@Override
	public void deleteLike(Long id) {
		likeDao.deleteById(id);
	}

	@Override
	@Transactional
	public Iterable<ProdCart> getCartItems(String uid) {
		return cartDao.getCartItems(uid);
	}

	@Override
	public Cart create(Cart like) throws SQLServerException, Exception {
		return cartDao.save(like);
	}

	@Override
	public void delete(Cart cart) {
		cartDao.delete(cart);
	}

	@Override
	public void deleteCart(Long id) {
		cartDao.deleteById(id);
	}
}
