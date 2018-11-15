package vintage.tiara.security;

import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import vintage.tiara.HelpClass;
import vintage.tiara.entity.User;
import vintage.tiara.entity.UserAuth;

public class AuthenticationCustomFilter extends UsernamePasswordAuthenticationFilter {
		
	@Autowired
	private HttpSession session;
	
	@Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) 
    		throws IOException, ServletException {
	 	System.out.println("username is" +request.getParameter("email"));
	 	
	 	UserAuth user = new UserAuth();
	 	String email = request.getParameter("email");
	 	String invalid = request.getParameter("invalid");
	 	String name;
	   	  
	    
	    if( invalid != null && session != null) {
	    	try {
	    		session.invalidate();
	    	}catch(Exception e) {e.printStackTrace();}
	    	
	    	session = ((HttpServletRequest) request).getSession(true);
	    }
	    
	 	if(session == null) {
	 		session = ((HttpServletRequest) request).getSession(true);
	 		System.out.println("new session is created!");
	 	}	
	 	
	 	try {
	 		name = ((UserAuth)session.getAttribute("PRINCIPAL")).getFullName();
	 	}catch (Exception e) {
			name = null;
		}
	 	
	 	if(name == null && email != null) {		 		
		
	 		try {
					user = HelpClass.getCurrentUser(email);
				} catch (ClassNotFoundException | SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
		    		  
	 		@SuppressWarnings("unchecked")
			ArrayList<GrantedAuthority> list = (ArrayList<GrantedAuthority>) user.getAuthorities();
	 		if(list.contains(new SimpleGrantedAuthority("ROLE_ADMIN")))
	 			list.add(new SimpleGrantedAuthority("ROLE_USER"));
	 		
		    Authentication auth2 = new UsernamePasswordAuthenticationToken
		    		(email, list);
		    SecurityContext sc = null;
		    
		    try {		       
		        SecurityContextHolder.getContext().setAuthentication(auth2);
		        sc = SecurityContextHolder.getContext();       
		        sc.setAuthentication(auth2);
		        session.setAttribute("SPRING_SECURITY_CONTEXT", sc);
		        session.setAttribute("PRINCIPAL", user);
		        System.out.println("new session and contex are set!");
		       
		    }catch (Exception e) {}	        		        	    
		   
	 	}
	 	if(name != null){
	 		UserAuth userFromS =  (UserAuth) session.getAttribute("PRINCIPAL");
	 		@SuppressWarnings("unchecked")
			ArrayList<GrantedAuthority> list = (ArrayList<GrantedAuthority>) userFromS.getAuthorities();
	 		if(list.contains(new SimpleGrantedAuthority("ROLE_ADMIN")))
	 			list.add(new SimpleGrantedAuthority("ROLE_USER"));
	 		
	 		
	 		Authentication auth2 = new UsernamePasswordAuthenticationToken
		    		(userFromS.getEmail(), userFromS.getPassword(), list);
	 		SecurityContextHolder.getContext().setAuthentication(auth2);
	 	}
	 	
	 	if(name == null && email == null)
	 		SecurityContextHolder.getContext().setAuthentication(null);
	 	
	 	 
	    chain.doFilter(request, response);
    }
}
