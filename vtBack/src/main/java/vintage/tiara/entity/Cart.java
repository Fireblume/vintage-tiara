package vintage.tiara.entity;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "CART")
public class Cart {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="ID", unique=true, nullable=false)
	private Long id;

	@Column(name="PRODUCTID", unique=false, nullable=false)
	private Long productid;
	
	@Column(name="UID", unique=false, nullable=false)
	private String uid;
	
	@Column(name="QUANTITY", unique=false, nullable=false)
	private int quantity;
	
	@Column(name="ACTIVE", unique=false, nullable=true)
	private String active;
	
	@Column(name="ADDEDON", unique=false, nullable=true)
	private Date date;

	public Cart() {}
	
	public Cart(Long id, Long productid, String userid, int quantity, String active, Date date) {
		super();
		this.id = id;
		this.productid = productid;
		this.uid = userid;
		this.quantity = quantity;
		this.active = active;
		this.date = date;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getProductid() {
		return productid;
	}

	public void setProductid(Long productid) {
		this.productid = productid;
	}

	public String getUid() {
		return uid;
	}

	public void setUid(String uid) {
		this.uid = uid;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public String getActive() {
		return active;
	}

	public void setActive(String active) {
		this.active = active;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}
	
}
