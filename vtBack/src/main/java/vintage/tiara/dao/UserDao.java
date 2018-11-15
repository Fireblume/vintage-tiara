package vintage.tiara.dao;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import vintage.tiara.entity.Role;
import vintage.tiara.entity.User;

@Repository
public interface UserDao extends CrudRepository<User, Long>{
	
	@Query("select u from User u where u.email = :email")
	public User loadUserByEmail(@Param("email") String username);
	
	@Query("select u from Role u where u.type = :type")
	public Role getRole(@Param("type") String type);
	
	@Modifying
	@Query("delete from User e where e.id = :id")
	public void deleteUser(@Param("id") Long id);
}
