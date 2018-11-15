package vintage.tiara.security;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import vintage.tiara.service.impl.UserServiceImpl;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    
	@Autowired
	DataSource dataSource;
 
	@Autowired
	public UserServiceImpl userService;
	
	@Autowired
	public void configAuthentication(AuthenticationManagerBuilder auth) throws Exception {
		/*auth.jdbcAuthentication().dataSource(dataSource)
				.usersByUsernameQuery("select * from user_user e where e.us_username = ? ")
				.authoritiesByUsernameQuery("select * from user_user e where e.us_username = ? ");
		*/
		//auth.userDetailsService(userService);
	}

	@Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable()
	        .sessionManagement()
	        .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)
	        .and()
            .authorizeRequests()
            	.antMatchers("/register").hasRole("ADMIN")
                //.antMatchers("/api/test23").hasRole("ADMIN")
        	.and().addFilterAfter(new AuthenticationCustomFilter(), 
				UsernamePasswordAuthenticationFilter.class);
    }
	
}
