package vintage.tiara.entity;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "LIKES")
public class Like {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="ID", unique=true, nullable=false)
	private Long id;

	@Column(name="PRODUCTID", unique=false, nullable=false)
	private Long productid;
	
	@Column(name="UID", unique=false, nullable=false)
	private String uid;
			
	@Column(name="ADDEDON", unique=false, nullable=true)
	private Date date;

	public Like() {}
	
	public Like(Long id, Long productid, String uid, Date date) {
		super();
		this.id = id;
		this.productid = productid;
		this.uid = uid;
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

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}
	
}
