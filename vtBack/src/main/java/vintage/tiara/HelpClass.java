package vintage.tiara;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.PropertyResourceBundle;
import java.util.ResourceBundle;

import vintage.tiara.entity.UserAuth;

public class HelpClass {
	
	public static UserAuth getCurrentUser(String email ) throws SQLException, ClassNotFoundException {
		UserAuth user = new UserAuth();
		
	    ResourceBundle bundle = PropertyResourceBundle.getBundle("application"); //ime fajla
		String driver = bundle.getString("spring.datasource.driverClassName"); //Ime parametara
		String url = bundle.getString("spring.datasource.url");
		String username = bundle.getString("spring.datasource.username");  
		String password = bundle.getString("spring.datasource.password");
		Class.forName(driver); //Registrovanje drajvera
		
		Connection conn = DriverManager.getConnection(url,username,password);
		conn.setAutoCommit(false);

	        
	    PreparedStatement st = conn.prepareStatement("select u.id, u.uid, u.email, u.full_name, r.type from USERS u join roles r on  u.roleid = r.id where u.email = ?");
	    st.setString(1, email);
	    
	    ResultSet rs = st.executeQuery();
	    while (rs.next()) {
	        user.setId((Long) Long.valueOf(rs.getObject(1).toString())); 
	        user.setUid((String)rs.getObject(2));
	        user.setEmail((String) rs.getObject(3));
	        user.setFullName((String)rs.getObject(4));
	        user.setRole((String)rs.getObject(5));
	}
	    
	    return user;
	}
}
