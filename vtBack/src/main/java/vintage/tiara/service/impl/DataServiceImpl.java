package vintage.tiara.service.impl;

import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.microsoft.sqlserver.jdbc.SQLServerException;

import vintage.tiara.dao.CategoryDao;
import vintage.tiara.dao.SubctgDao;
import vintage.tiara.entity.Category;
import vintage.tiara.entity.Subcategory;
import vintage.tiara.service.DataService;

@Service
public class DataServiceImpl implements DataService{
	
	@Autowired
	private CategoryDao categoryDao;
	
	@Autowired
	private SubctgDao subctgDao;
	
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
}
