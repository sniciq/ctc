package com.ms.dao.mapper.basic;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Select;

import com.eddy.dao.base.BaseDao;
import com.ms.dao.entity.basic.RoleEty;
import com.ms.dao.entity.basic.UserRoleEty;

public interface UserRoleDao extends BaseDao<UserRoleEty> {

	@Delete("delete from userrole where userId in (${value})")
	void deleteByUserIds(String userIds);

	@Select("select * from role r where not exists (select 1 from userrole where r.id = roleId and userId = #{value});")
	List<RoleEty> selectUserUnhaveRoles(int userId);

	@Select("select * from role r where exists (select 1 from userrole where r.id = roleId and userId = #{value});")
	List<RoleEty> selectUserRoles(int userId);

	/**
	 * 查询角色人员数
	 * @param ety
	 * @return
	 */
	int selectRoleUsersCount(RoleEty ety);
	
	@Delete("delete from userrole where userId=#{userId} and roleId=#{roleId}")
	void deleteUserRole(UserRoleEty ety);

}
