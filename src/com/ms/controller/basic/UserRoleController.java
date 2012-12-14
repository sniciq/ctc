package com.ms.controller.basic;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.eddy.util.JSONGrid;
import com.ms.dao.entity.basic.RoleEty;
import com.ms.dao.entity.basic.UserRoleEty;
import com.ms.dao.mapper.basic.RoleDao;
import com.ms.dao.mapper.basic.UserRoleDao;
import com.ms.services.UserRoleService;

@Controller
@RequestMapping("/basic/UserRoleController/")
public class UserRoleController {
	
	private Logger logger = Logger.getLogger(UserRoleController.class);
	
	@Autowired
	private UserRoleDao userRoleDao;
	
	@Autowired
	private RoleDao roleDao;
	
	@Autowired
	private UserRoleService userRoleService;
	
	@RequestMapping("save.sdo")
	public @ResponseBody String save(@RequestParam("userIds") String userIds, @RequestParam("roleIds") String ids) throws Exception {
		JSONObject obj = new JSONObject();
		String[] userIdArr = StringUtils.split(userIds, ",");
		String[] roleIds = StringUtils.split(ids, ",");
		userRoleService.saveUserRole(userIdArr, roleIds);
		obj.put("success",true);
		obj.put("result","success");
		return obj.toString();
	}
	
	@RequestMapping("getUserUnhaveRoles.sdo")
	public @ResponseBody String getUserUnhaveRoles(HttpServletRequest request, HttpServletResponse response) throws Exception {
		List<RoleEty> list;
		String userIdStr = request.getParameter("userId");
		if(userIdStr != null && !userIdStr.trim().equals("")) {
			list = userRoleDao.selectUserUnhaveRoles(Integer.parseInt(userIdStr));
		}
		else {
			list = roleDao.selectByEntity(null);
		}
		
		JSONObject retObj = JSONGrid.toJSon(list, list.size());
		return retObj.toString();
	}
	
	@RequestMapping("getUserRoles.sdo")
	public @ResponseBody String getUserRoles(@RequestParam("userId") int userId) throws Exception {
		List<RoleEty> list = userRoleDao.selectUserRoles(userId);
		JSONObject retObj = JSONGrid.toJSon(list, list.size());
		return retObj.toString();
	}
	
	/**
	 * 向某角色中添加用户
	 * @param userId
	 * @param roleId
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("addRoleUser.sdo")
	public @ResponseBody String addRoleUser(@RequestParam("userId") int userId, @RequestParam("roleId") int roleId) throws Exception {
		JSONObject obj = new JSONObject();
		UserRoleEty ety = new UserRoleEty();
		ety.setUserId(userId);
		ety.setRoleId(roleId);
		userRoleDao.deleteUserRole(ety);
		userRoleDao.insert(ety);
		obj.put("success",true);
		obj.put("result","success");
		return obj.toString();
	} 
	
	/**
	 * 删除某角色用户
	 * @param userId
	 * @param roleId
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("deleteRoleUser.sdo")
	public @ResponseBody String deleteRoleUser(@RequestParam("userId") int userId, @RequestParam("roleId") int roleId) throws Exception {
		JSONObject obj = new JSONObject();
		UserRoleEty ety = new UserRoleEty();
		ety.setUserId(userId);
		ety.setRoleId(roleId);
		userRoleDao.deleteUserRole(ety);
		obj.put("success",true);
		obj.put("result","success");
		return obj.toString();
	} 
	
	@ExceptionHandler
	public @ResponseBody String handle(Exception e) {
		logger.error(e.getMessage(), e);
		JSONObject obj = new JSONObject();
		obj.put("success",true);
		obj.put("result","error");
		obj.put("info",e.getMessage());
		return obj.toString();
	}
}
