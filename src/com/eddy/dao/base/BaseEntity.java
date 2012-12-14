package com.eddy.dao.base;

import com.eddy.util.ExtLimit;
import com.eddy.util.JQGridLimit;

public class BaseEntity {
	private ExtLimit extLimit;
	
	private JQGridLimit jqGridLimit;
	
	/**
	 * 用于EXT的分页对象
	 * @return
	 */
	public ExtLimit getExtLimit() {
		return extLimit;
	}

	/**
	 * 用于EXT的分页对象
	 * @param extLimit
	 */
	public void setExtLimit(ExtLimit extLimit) {
		this.extLimit = extLimit;
	}

	/**
	 * 用于jqGrid的分页对象
	 * @return
	 */
	public JQGridLimit getJqGridLimit() {
		return jqGridLimit;
	}

	/**
	 * 用于jqGrid的分页对象
	 * @param jqGridLimit
	 */
	public void setJqGridLimit(JQGridLimit jqGridLimit) {
		this.jqGridLimit = jqGridLimit;
	}
}
