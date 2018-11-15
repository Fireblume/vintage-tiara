package vintage.tiara.service;

import java.util.Optional;

import com.microsoft.sqlserver.jdbc.SQLServerException;

import vintage.tiara.entity.Role;
import vintage.tiara.entity.User;

public interface UserService {

	Iterable<User> getAll();	
	User create(User user) throws SQLServerException, Exception;	
	Optional<User> findById(Long id);	
	void delete(User user);
	void deleteUser(Long id);
	
	Role getRole(String type);
}
