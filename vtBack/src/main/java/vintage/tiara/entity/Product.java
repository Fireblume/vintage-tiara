package vintage.tiara.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "PRODUCTS")
public class Product {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="ID", unique=true, nullable=false)
	private Long id;

	@Column(name="SUBCATEGORYID", unique=false, nullable=false)
	private Long subcategoryid;
	
	@Column(name="TITLE", unique=false, nullable=false)
	private String title;
	
	@Column(name="DESCRIPTION", unique=false, nullable=true)
	private String description;
	
	@Column(name="QUANTITY", unique=false, nullable=false)
	private int quantity;
	
	@Column(name="PHOTO", unique=false, nullable=false)
	private String photo;
	
	@Column(name="PRICE", unique=false, nullable=false)
	private String price;
	
	@Column(name="ACTIVE", unique=false, nullable=false)
	private String active;
	
	@Column(name="NEWEST", unique=false, nullable=true)
	private String newest;
	
	@Column(name="SALE", unique=false, nullable=true)
	private Integer sale;
	
	@Column(name="ONSALE", unique=false, nullable=true)
	private String onsale;

	public Product() {}
	
	public Product(Long id, Long subcategoryid, String title, String description, int quantity, String photo,
			String price, String active, String newest, Integer sale, String onsale) {
		super();
		this.id = id;
		this.subcategoryid = subcategoryid;
		this.title = title;
		this.description = description;
		this.quantity = quantity;
		this.photo = photo;
		this.price = price;
		this.active = active;
		this.newest = newest;
		this.sale = sale;
		this.onsale = onsale;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getSubcategoryid() {
		return subcategoryid;
	}

	public void setSubcategoryid(Long subcategoryid) {
		this.subcategoryid = subcategoryid;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public String getPhoto() {
		return photo;
	}

	public void setPhoto(String photo) {
		this.photo = photo;
	}

	public String getPrice() {
		return price;
	}

	public void setPrice(String price) {
		this.price = price;
	}

	public String getActive() {
		return active;
	}

	public void setActive(String active) {
		this.active = active;
	}

	public String getNewest() {
		return newest;
	}

	public void setNewest(String newest) {
		this.newest = newest;
	}

	public Integer getSale() {
		return sale;
	}

	public void setSale(Integer sale) {
		this.sale = sale;
	}

	public String getOnsale() {
		return onsale;
	}

	public void setOnsale(String onsale) {
		this.onsale = onsale;
	}
	
}
