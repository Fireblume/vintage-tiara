package vintage.tiara.controllers;

import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.servlet.ServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.microsoft.sqlserver.jdbc.SQLServerException;

import vintage.tiara.entity.CatSubctg;
import vintage.tiara.entity.Role;
import vintage.tiara.entity.User;
import vintage.tiara.entity.UserAuth;
import vintage.tiara.service.DataService;
import vintage.tiara.service.UserService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping(value="/api")
public class LogInController {
	
	private static final Logger LOGGER = Logger.getLogger(LogInController.class.getName());
	
	@Autowired
	private UserService userS;
	
	@Autowired
	private DataService dataDao;
	
	@RequestMapping(value="/test23", method = RequestMethod.GET)
	@ResponseBody public String test(ServletRequest request){
		return "";
		/*if (((HttpServletRequest) request).isUserInRole("ROLE_ADMIN")) {System.out.println("Admin");}
		if (((HttpServletRequest) request).isUserInRole("ROLE_USER")) {System.out.println("User");}
		return SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();*/
	}
	
	@RequestMapping(value="/addUser", method = RequestMethod.POST)
	@ResponseBody public ResponseEntity<String> addUser(@RequestBody UserAuth user){
		Role getId = userS.getRole(user.getRole());
		User newUser = new User();
		newUser.setUid(user.getUid());
		newUser.setFullName(user.getFullName());
		newUser.setEmail(user.getEmail());
		newUser.setRoleId(getId.getId());
		
		try {
			userS.create(newUser);
		}catch(SQLServerException e) {
			LOGGER.log(Level.FINE, "Some unique constraint broken", e);
		}catch( Exception e) {
			LOGGER.log(Level.FINE, "Some exepction", e);
		}
		
		return new ResponseEntity<String>("{\"resp\":\"OK\"}", HttpStatus.OK);
	}
	
	@RequestMapping(value="/receive", method = RequestMethod.GET)
	@ResponseBody public void receiveEmail(){
	}
	
	@RequestMapping(value="/logout", method = RequestMethod.GET)
	@ResponseBody public void logout(){
	}
}
