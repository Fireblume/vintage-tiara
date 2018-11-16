package vintage.tiara.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import vintage.tiara.entity.CatSubctg;
import vintage.tiara.entity.Category;
import vintage.tiara.entity.Product;
import vintage.tiara.entity.Subcategory;
import vintage.tiara.service.DataService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping(value="/api")
public class HomeController {
	
private static final Logger LOGGER = Logger.getLogger(LogInController.class.getName());
	
	@Autowired
	private DataService dataS;
	
	@RequestMapping(value="/load", method = RequestMethod.GET)
	@ResponseBody public ResponseEntity<List<CatSubctg>> getData(){
		List<CatSubctg> dataList = new ArrayList<CatSubctg>();
		List<Subcategory> newsubctgList;
		List<Category> ctgList = null;
		List<Subcategory> subctgList = null;
		HttpStatus status = HttpStatus.OK;
		
		try {
			ctgList = (List<Category>) dataS.getAllCategories();
			subctgList = (List<Subcategory>) dataS.getAllSubctgs();
		}catch (Exception e) {
			LOGGER.log(Level.FINE, "Something went wrong", e);
			status = HttpStatus.NOT_FOUND;
			return new ResponseEntity<List<CatSubctg>>(dataList, status);
		}
		
		for(Category ctg: ctgList) {
			newsubctgList = new ArrayList<Subcategory>();
			for(Subcategory subctg: subctgList) {
				if(ctg.getId() == subctg.getCategoryid())
					newsubctgList.add(subctg);				
			}
			dataList.add(new CatSubctg(ctg, newsubctgList));
		}
		return new ResponseEntity<List<CatSubctg>>(dataList, status);
	}
	
	@RequestMapping(value="/loadProducts", method = RequestMethod.GET)
	@ResponseBody public ResponseEntity<List<Product>> getProducts(@Param("id") Long id){
		List<Product> dataList = new ArrayList<Product>();
		HttpStatus status = HttpStatus.OK;
		
		try {
			dataList = (List<Product>) dataS.getBySubctgId(id);
		}catch (Exception e) {
			LOGGER.log(Level.FINE, "Something went wrong", e);
			status = HttpStatus.NOT_FOUND;
			return new ResponseEntity<List<Product>>(dataList, status);
		}
		return new ResponseEntity<List<Product>>(dataList, status);
	}
}