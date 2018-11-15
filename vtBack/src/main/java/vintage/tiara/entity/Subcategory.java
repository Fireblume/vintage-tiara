package vintage.tiara.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "SUBCATEGORIES")
public class Subcategory {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="ID", unique=true, nullable=false)
	private Long id;
	
	@Column(name="CATEGORYID", unique=false, nullable=false)
	private Long categoryid;
	
	@Column(name="TITLE", unique=false, nullable=false)
	private String title;
	
	@Column(name="ACTIVE", unique=false, nullable=false)
	private String active;
	
	public Subcategory() {}
	
	public Subcategory(Long id, Long categoryid, String title, String active) {
		super();
		this.id = id;
		this.categoryid = categoryid;
		this.title = title;
		this.active = active;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getCategoryid() {
		return categoryid;
	}

	public void setCategoryid(Long categoryid) {
		this.categoryid = categoryid;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getActive() {
		return active;
	}

	public void setActive(String active) {
		this.active = active;
	}

}
