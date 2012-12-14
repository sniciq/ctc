package com.ms.dao.entity.basic;
public class RoleEty extends com.eddy.dao.base.BaseEntity {

	private Integer id;
	private String roleName;
	private String describle;
	
	/**
	 * 角色的数据权限, 0:个人,1:team, 2:area, 3: all,  
	 * person:个人,team, area, all:全国,
	 */
	private String roleAuth;
	
	/**
	 * 角色的数据权限, all:全国, person:个人
	 * @return
	 */
	public String getRoleAuth() {
		return roleAuth;
	}
	
	/**
	 * 角色的数据权限, all:全国, person:个人
	 * @param roleAuth
	 */
	public void setRoleAuth(String roleAuth) {
		this.roleAuth = roleAuth;
	}
	public Integer getId() {
		return this.id;
	}
	public void setId(Integer id) {
		this.id = id;
	}

	public String getRoleName() {
		return this.roleName;
	}
	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}

	public String getDescrible() {
		return this.describle;
	}
	public void setDescrible(String describle) {
		this.describle = describle;
	}

}