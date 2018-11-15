package vintage.tiara.entity;

import java.util.List;

public class CatSubctg {
	
	private Category category;
	private List<Subcategory> subList;
	
	public CatSubctg() {}

	public CatSubctg(Category category, List<Subcategory> subList) {
		super();
		this.category = category;
		this.subList = subList;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	public List<Subcategory> getSubList() {
		return subList;
	}

	public void setSubList(List<Subcategory> subList) {
		this.subList = subList;
	}
}
