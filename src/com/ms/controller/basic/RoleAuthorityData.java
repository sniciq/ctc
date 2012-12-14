package com.ms.controller.basic;

import com.ms.dao.entity.basic.ResourcesEty;

public class RoleAuthorityData extends ResourcesEty {
	
	private Boolean hasAuthority;
	
	public Boolean getHasAuthority() {
		return hasAuthority;
	}
	public void setHasAuthority(Boolean hasAuthority) {
		this.hasAuthority = hasAuthority;
	}
	private Integer childCount;
	
	public Integer getChildCount() {
		return childCount;
	}
	public void setChildCount(Integer childCount) {
		this.childCount = childCount;
	}

}
