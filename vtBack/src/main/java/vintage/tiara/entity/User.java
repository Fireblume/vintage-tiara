package vintage.tiara.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name = "USERS")
public class User{

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="ID", unique=true, nullable=false)
	private Long id;
	
	@Column(name="ROLEID", unique=false, nullable=false)
	private Long roleId;
	
	@Column(name="UID", unique=true, nullable=false)
	private String uid;
	
	@Column(name="FULL_NAME", unique=false, nullable=false)
	private String fullName;
	
	@Column(name="EMAIL", unique=true, nullable=false)
	private String email;
	
	@Column(name="PHONE", unique=false, nullable=true)
	private String phone;
	
	@Column(name="BIRTHDAY", unique=false, nullable=true)
	private String birtday;
	
	@Column(name="ADDRESS", unique=false, nullable=true)
	private String address;
	
	@Column(name="CITYID", nullable=true)
	private Long cityId;
	
	@Column(name="COUNTRYID", nullable=true)
	private Long countryId;
	
	/*@ManyToOne
	@JoinColumn(name="CT_ID", referencedColumnName = "CT_ID", nullable = false)
	private Category category;
	
	@ManyToOne
	@JoinColumn(name="LG_ID", referencedColumnName = "LG_ID", nullable = false)
	private Language language;

	@OneToMany( cascade = {ALL}, fetch = EAGER, mappedBy = "book")
	private Set<User_ebook> userBook = new HashSet<User_ebook>();*/

	
	public User(){
		super();
	}

	public User(Long id, Long roleId, String fullName, String email, String phone, String birtday, String address,
			Long cityId, Long countryId, String uid) {
		super();
		this.id = id;
		this.roleId = roleId;
		this.fullName = fullName;
		this.email = email;
		this.phone = phone;
		this.birtday = birtday;
		this.address = address;
		this.cityId = cityId;
		this.countryId = countryId;
		this.uid = uid;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getRoleId() {
		return roleId;
	}

	public void setRoleId(Long roleId) {
		this.roleId = roleId;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getBirtday() {
		return birtday;
	}

	public void setBirtday(String birtday) {
		this.birtday = birtday;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public Long getCityId() {
		return cityId;
	}

	public void setCityId(Long cityId) {
		this.cityId = cityId;
	}

	public Long getCountryId() {
		return countryId;
	}

	public void setCountryId(Long countryId) {
		this.countryId = countryId;
	}

	public String getUid() {
		return uid;
	}

	public void setUid(String uid) {
		this.uid = uid;
	}
		
}