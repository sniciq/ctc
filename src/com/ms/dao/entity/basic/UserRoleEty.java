package com.ms.dao.entity.basic;
public class UserRoleEty extends com.eddy.dao.base.BaseEntity {

	private Integer id;
	private Integer userId;
	private Integer roleId;

	public Integer getId() {
		return this.id;
	}
	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getUserId() {
		return this.userId;
	}
	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public Integer getRoleId() {
		return this.roleId;
	}
	public void setRoleId(Integer roleId) {
		this.roleId = roleId;
	}
}