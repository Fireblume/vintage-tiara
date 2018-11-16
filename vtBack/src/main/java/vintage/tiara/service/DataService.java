package vintage.tiara.service;

import java.util.Optional;

import com.microsoft.sqlserver.jdbc.SQLServerException;

import vintage.tiara.entity.Category;
import vintage.tiara.entity.Product;
import vintage.tiara.entity.Subcategory;

public interface DataService {
	
	Iterable<Subcategory> getAllSubctgs();
	Iterable<Subcategory> getByCtgId(Long id);
	Subcategory create(Subcategory subcategory) throws SQLServerException, Exception;
	Optional<Subcategory> findByIdSubcategory(Long id);	
	void delete(Subcategory subcategory);
	void deleteSubcategory(Long id);
	void deleteByCtgId(Long id);
	void updateSubctg(String title, String active, Long id);
	
	Iterable<Category> getAllCategories();
	Category create(Category category) throws SQLServerException, Exception;
	Optional<Category> findByIdCategory(Long id);	
	void delete(Category category);
	void deleteCategory(Long id);
	public void updateCategory(String title, String active, Long id);
	
	Iterable<Product> getAllProducts();
	Iterable<Product> getBySubctgId(Long id);
	Product create(Product product) throws SQLServerException, Exception;
	Optional<Product> findByIdProduct(Long id);	
	void delete(Product product);
	void deleteProduct(Long id);
	void deleteBySubctgId(Long id);
	void updateProduct(String title, String desc, String photo, String price, int quantity, String active, Long id);

}
