package vintage.tiara.entity;

public class ProdLike {
	
	private Long productid;
	private Long likeid;
	private String uid;
	private String title;
	private String description;
	private int quantity;
	private String photo;
	private String price;
	private String activeProd;
	
	public ProdLike() {}
	
	public ProdLike(Long productid, Long likeid, String uid, String title, String description, int quantity,
			String photo, String price, String activeProd) {
		super();
		this.productid = productid;
		this.likeid = likeid;
		this.uid = uid;
		this.title = title;
		this.description = description;
		this.quantity = quantity;
		this.photo = photo;
		this.price = price;
		this.activeProd = activeProd;
	}

	public Long getProductid() {
		return productid;
	}

	public void setProductid(Long productid) {
		this.productid = productid;
	}

	public Long getLikeid() {
		return likeid;
	}

	public void setLikeid(Long likeid) {
		this.likeid = likeid;
	}

	public String getUid() {
		return uid;
	}

	public void setUid(String uid) {
		this.uid = uid;
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
	
	public String getActiveProd() {
		return activeProd;
	}

	public void setActiveProd(String activeProd) {
		this.activeProd = activeProd;
	}
}
