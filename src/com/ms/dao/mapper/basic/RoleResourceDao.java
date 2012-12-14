package com.ms.dao.mapper.basic;

import java.util.List;
import java.util.Map;

import com.eddy.dao.base.BaseDao;
import com.ms.controller.basic.RoleAuthorityData;
import com.ms.dao.entity.basic.ResourcesEty;
import com.ms.dao.entity.basic.RoleResourceEty;

public interface RoleResourceDao extends BaseDao<RoleResourceEty> {

	void deleteByIds(Map<String, Object> pMap);

	List<ResourcesEty> selectRoleResources(RoleResourceEty ety);

	List<RoleAuthorityData> selectRoleResource(Map<String, Object> pMap);

}
