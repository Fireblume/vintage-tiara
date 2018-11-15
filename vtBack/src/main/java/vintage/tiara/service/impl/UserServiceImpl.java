package vintage.tiara.service.impl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.microsoft.sqlserver.jdbc.SQLServerException;

import vintage.tiara.dao.UserDao;
import vintage.tiara.entity.Role;
import vintage.tiara.entity.User;
import vintage.tiara.service.UserService;

@Service
public class UserServiceImpl implements UserService, UserDetailsService{

	@Autowired
	private UserDao userDao;

	@Override
	@Transactional
	public Iterable<User> getAll(){
		return userDao.findAll();
		
	}


	@Override
	@Transactional
	public User create(User user)  throws SQLServerException, Exception{
		return userDao.save(user);
	}


	@Override
	@Transactional
	public Optional<User> findById(Long id) {
		return userDao.findById(id);
	}


	@Override
	@Transactional
	public void delete(User user) {
		userDao.delete(user);
	}


	@Override
	@Transactional
	public void deleteUser(Long id) {
		userDao.deleteUser(id);
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	@Transactional
	public Role getRole(String type) {
		return userDao.getRole(type);
	}
}
