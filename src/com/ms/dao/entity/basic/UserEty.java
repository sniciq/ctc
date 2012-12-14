package com.ms.dao.entity.basic;

import java.util.Date;

public class UserEty extends com.eddy.dao.base.BaseEntity {

	private Integer id;
	private String userName;
	private String password;
	private String realName;
	private String email;
	private String sex;
	
	private Date birthday;
	
	private String userCode;

	public Integer getId() {
		return this.id;
	}
	public void setId(Integer id) {
		this.id = id;
	}

	public String getUserName() {
		return this.userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPassword() {
		return this.password;
	}
	public void setPassword(String password) {
		this.password = password;
	}

	public String getRealName() {
		return this.realName;
	}
	public void setRealName(String realName) {
		this.realName = realName;
	}

	public String getEmail() {
		return this.email;
	}
	public void setEmail(String email) {
		this.email = email;
	}

	public String getSex() {
		return this.sex;
	}
	public void setSex(String sex) {
		this.sex = sex;
	}

	public Date getBirthday() {
		return this.birthday;
	}
	public void setBirthday(Date birthday) {
		this.birthday = birthday;
	}

	public String getUserCode() {
		return this.userCode;
	}
	public void setUserCode(String userCode) {
		this.userCode = userCode;
	}

}