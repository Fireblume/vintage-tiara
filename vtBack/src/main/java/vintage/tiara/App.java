package vintage.tiara;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.orm.jpa.vendor.HibernateJpaSessionFactoryBean;
import org.springframework.web.bind.annotation.CrossOrigin;


/**
 * Hello world!
 *
 */

@SpringBootApplication
@CrossOrigin(origins = "http://localhost:4200")
@EnableJpaAuditing
public class App implements CommandLineRunner
{
	@Autowired
    DataSource dataSource;	
	
	
    public static void main(String[] args) {
        SpringApplication.run(App.class, args);
    }
    
    @Override
    public void run(String... args) throws Exception {
    	/*Map<String, String> book = new HashMap<>();
    	book.put("title", "bla");
    	book.put("keywords", "test");
    	
    	ElasticCRUD.addToIndex(book, "library", "1");*/
    	//System.out.println(userS.getRole("Admin"));
    }

}
