package vintage.tiara.entity;

import java.util.Date;

public class ProdCart {
	
	private Long productid;
	private Long cartid;
	private String uid;
	private String title;
	private String description;
	private int quantityInCart;
	private String photo;
	private String price;
	private String activeCart;
	private Date date;
	
	public ProdCart() {}
	
	public ProdCart(Long productid, Long cartid, String uid, String title, String description, int quantityInCart,
			String photo, String price, String activeCart, Date date) {
		super();
		this.productid = productid;
		this.cartid = cartid;
		this.uid = uid;
		this.title = title;
		this.description = description;
		this.quantityInCart = quantityInCart;
		this.photo = photo;
		this.price = price;
		this.activeCart = activeCart;
		this.date = date;
	}
	public Long getProductid() {
		return productid;
	}
	public void setProductid(Long productid) {
		this.productid = productid;
	}
	public Long getCartid() {
		return cartid;
	}
	public void setCartid(Long cartid) {
		this.cartid = cartid;
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
	public int getQuantityInCart() {
		return quantityInCart;
	}
	public void setQuantityInCart(int quantityInCart) {
		this.quantityInCart = quantityInCart;
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
	public String getActiveCart() {
		return activeCart;
	}
	public void setActiveCart(String activeCart) {
		this.activeCart = activeCart;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
}
