package vintage.tiara.controllers;

import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import vintage.tiara.entity.Category;
import vintage.tiara.entity.Product;
import vintage.tiara.entity.Subcategory;
import vintage.tiara.service.DataService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping(value="/api")
public class AdminController {
	
	private static final Logger LOGGER = Logger.getLogger(LogInController.class.getName());
	
	@Autowired
	private DataService dataS;
	
	@RequestMapping(value="/categories", method = RequestMethod.GET)
	@ResponseBody public ResponseEntity<List<Category>> getDataCtg(){	
		List<Category> ctgList = null;
		HttpStatus status = HttpStatus.OK;
		
		try {
			ctgList = (List<Category>) dataS.getAllCategories();
		}catch (Exception e) {
			LOGGER.log(Level.FINE, "Something went wrong", e);
			status = HttpStatus.NOT_FOUND;
			return new ResponseEntity<List<Category>>(ctgList, status);
		}
		return new ResponseEntity<List<Category>>(ctgList, status);
	}
	
	@RequestMapping(value="/savecategories", method = RequestMethod.POST)
	@ResponseBody public ResponseEntity<String> saveCtg(@RequestBody Category category){	
		HttpStatus status = HttpStatus.OK;
		
		try {
			dataS.create(category);
		}catch (Exception e) {
			LOGGER.log(Level.FINE, "Something went wrong", e);
			status = HttpStatus.NOT_FOUND;
			return new ResponseEntity<String>("{\"resp\":\"NOK\"}", status);
		}
		return new ResponseEntity<String>("{\"resp\":\"OK\"}", status);
	}
	
	@RequestMapping(value="/updatecategories", method = RequestMethod.POST)
	@ResponseBody public ResponseEntity<String> updateCtg(@RequestBody Category category){	
		HttpStatus status = HttpStatus.OK;
		
		try {
			dataS.updateCategory(category.getTitle(), category.getActive(), category.getId());
		}catch (Exception e) {
			LOGGER.log(Level.FINE, "Something went wrong", e);
			status = HttpStatus.NOT_FOUND;
			return new ResponseEntity<String>("{\"resp\":\"NOK\"}", status);
		}
		return new ResponseEntity<String>("{\"resp\":\"OK\"}", status);
	}
	
	@RequestMapping(value="/subcategories", method = RequestMethod.GET)
	@ResponseBody public ResponseEntity<List<Subcategory>> getDataSubctg(@Param("id") Long id){	
		List<Subcategory> subctgList = null;
		HttpStatus status = HttpStatus.OK;
		
		try {
			subctgList = (List<Subcategory>) dataS.getByCtgId(id);
		}catch (Exception e) {
			LOGGER.log(Level.FINE, "Something went wrong", e);
			status = HttpStatus.NOT_FOUND;
			return new ResponseEntity<List<Subcategory>>(subctgList, status);
		}
		return new ResponseEntity<List<Subcategory>>(subctgList, status);
	}
	
	@RequestMapping(value="/savesubcategories", method = RequestMethod.POST)
	@ResponseBody public ResponseEntity<String> saveSubctg(@RequestBody Subcategory subcategory){	
		HttpStatus status = HttpStatus.OK;
		
		try {
			dataS.create(subcategory);
		}catch (Exception e) {
			LOGGER.log(Level.FINE, "Something went wrong", e);
			status = HttpStatus.NOT_FOUND;
			return new ResponseEntity<String>("{\"resp\":\"NOK\"}", status);
		}
		return new ResponseEntity<String>("{\"resp\":\"OK\"}", status);
	}
	
	@RequestMapping(value="/updatesubctg", method = RequestMethod.POST)
	@ResponseBody public ResponseEntity<String> updatesubctg(@RequestBody Subcategory subcategory){	
		HttpStatus status = HttpStatus.OK;
		
		try {
			dataS.updateSubctg(subcategory.getTitle(), subcategory.getActive(), subcategory.getId());
		}catch (Exception e) {
			LOGGER.log(Level.FINE, "Something went wrong", e);
			status = HttpStatus.NOT_FOUND;
			return new ResponseEntity<String>("{\"resp\":\"NOK\"}", status);
		}
		return new ResponseEntity<String>("{\"resp\":\"OK\"}", status);
	}
	
	@RequestMapping(value="/deleteCtg", method = RequestMethod.GET)
	@ResponseBody public ResponseEntity<String> deleteCtg(@Param("id") Long id){	
		HttpStatus status = HttpStatus.OK;
		List<Subcategory> toDel;
		
		try {
			toDel = (List<Subcategory>) dataS.getByCtgId(id);
			for(Subcategory sub: toDel)
				dataS.deleteBySubctgId(sub.getId());
			dataS.deleteByCtgId(id);
			dataS.deleteCategory(id);
		}catch (Exception e) {
			LOGGER.log(Level.FINE, "Something went wrong", e);
			status = HttpStatus.NOT_FOUND;
			return new ResponseEntity<String>("{\"resp\":\"NOK\"}", status);
		}
		return new ResponseEntity<String>("{\"resp\":\"OK\"}", status);
	}
	
	@RequestMapping(value="/deleteSubctg", method = RequestMethod.GET)
	@ResponseBody public ResponseEntity<String> deleteSubctg(@Param("id") Long id){	
		HttpStatus status = HttpStatus.OK;
		
		try {
			dataS.deleteBySubctgId(id);
			dataS.deleteSubcategory(id);
		}catch (Exception e) {
			LOGGER.log(Level.FINE, "Something went wrong", e);
			status = HttpStatus.NOT_FOUND;
			return new ResponseEntity<String>("{\"resp\":\"NOK\"}", status);
		}
		return new ResponseEntity<String>("{\"resp\":\"OK\"}", status);
	}
	
	@RequestMapping(value="/saveproduct", method = RequestMethod.POST)
	@ResponseBody public ResponseEntity<String> saveProduct(@RequestBody Product product){	
		HttpStatus status = HttpStatus.OK;
		
		try {
			dataS.create(product);
		}catch (Exception e) {
			LOGGER.log(Level.FINE, "Something went wrong", e);
			status = HttpStatus.NOT_FOUND;
			return new ResponseEntity<String>("{\"resp\":\"NOK\"}", status);
		}
		return new ResponseEntity<String>("{\"resp\":\"OK\"}", status);
	}
	
	@RequestMapping(value="/updateproduct", method = RequestMethod.POST)
	@ResponseBody public ResponseEntity<String> updateProduct(@RequestBody Product product){	
		HttpStatus status = HttpStatus.OK;
		
		try {
			dataS.updateProduct(product.getTitle(), product.getDescription(),
					product.getPhoto(), product.getPrice(), product.getQuantity(), product.getActive(), product.getId());
		}catch (Exception e) {
			LOGGER.log(Level.FINE, "Something went wrong", e);
			status = HttpStatus.NOT_FOUND;
			return new ResponseEntity<String>("{\"resp\":\"NOK\"}", status);
		}
		return new ResponseEntity<String>("{\"resp\":\"OK\"}", status);
	}
	
	@RequestMapping(value="/deleteProduct", method = RequestMethod.GET)
	@ResponseBody public ResponseEntity<String> deleteProduct(@Param("id") Long id){	
		HttpStatus status = HttpStatus.OK;
		
		try {
			dataS.deleteProduct(id);
		}catch (Exception e) {
			LOGGER.log(Level.FINE, "Something went wrong", e);
			status = HttpStatus.NOT_FOUND;
			return new ResponseEntity<String>("{\"resp\":\"NOK\"}", status);
		}
		return new ResponseEntity<String>("{\"resp\":\"OK\"}", status);
	}

}
