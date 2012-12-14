package com.ms.dao.entity.basic;
public class RoleResourceEty extends com.eddy.dao.base.BaseEntity {

	private Integer id;
	private Integer roleId;
	private Integer nodeId;

	public Integer getId() {
		return this.id;
	}
	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getRoleId() {
		return this.roleId;
	}
	public void setRoleId(Integer roleId) {
		this.roleId = roleId;
	}
	public Integer getNodeId() {
		return nodeId;
	}
	public void setNodeId(Integer nodeId) {
		this.nodeId = nodeId;
	}
}
