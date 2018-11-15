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
	
	@RequestMapping(value="/deleteCtg", method = RequestMethod.GET)
	@ResponseBody public ResponseEntity<String> deleteCtg(@Param("id") Long id){	
		HttpStatus status = HttpStatus.OK;
		
		try {
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
			dataS.deleteSubcategory(id);
		}catch (Exception e) {
			LOGGER.log(Level.FINE, "Something went wrong", e);
			status = HttpStatus.NOT_FOUND;
			return new ResponseEntity<String>("{\"resp\":\"NOK\"}", status);
		}
		return new ResponseEntity<String>("{\"resp\":\"OK\"}", status);
	}

}
