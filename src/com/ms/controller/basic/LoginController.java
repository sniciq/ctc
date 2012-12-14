package com.ms.controller.basic;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ms.dao.entity.basic.ResourcesEty;
import com.ms.dao.entity.basic.UserEty;
import com.ms.dao.mapper.basic.UserDao;

@Controller
@RequestMapping("/basic/LoginController/")
public class LoginController {

	private Logger logger = Logger.getLogger(LoginController.class);

	@Autowired
	private UserDao userDao;

	@RequestMapping(value = "login.sdo", method = RequestMethod.POST)
	public @ResponseBody
	String login(HttpServletRequest request, HttpServletResponse response, UserEty userEty) throws Exception {
		JSONObject obj = new JSONObject();
		obj.put("success", true);
		List<UserEty> dataList = userDao.selectByEntity(userEty);
		if(dataList.size() != 1) {
			throw new Exception("用户名或者密码错误！");
		}
		userEty = dataList.get(0);
		request.getSession().setAttribute("UserEty", userEty);
		obj.put("result", "success");
		return obj.toString();
	}

	@RequestMapping("getUserPermission.sdo")
	public @ResponseBody String getUserPermission(HttpServletRequest request, HttpServletResponse response) {
		UserEty userEty = (UserEty) request.getSession().getAttribute("UserEty");
		JSONObject obj = new JSONObject();
		obj.put("UserInfo", userEty);
		JSONObject userMenuTree = getUserMenuTree(userEty);
		obj.put("userTree", userMenuTree);
		return obj.toString();
	}
	
	/**
	 * 只查询两级
	 * @param userEty
	 * @return
	 */
	private JSONObject getUserMenuTree(UserEty userEty) {
		JSONObject retObj = new JSONObject();
		
		Map<String, Object> paraMap = new HashMap<String, Object>();
		paraMap.put("pnodeId", 0);
		paraMap.put("userId", userEty.getId());
		List<ResourcesEty> buttons = userDao.selectUserTree(paraMap);
		JSONArray rsArr = new JSONArray();
		for(ResourcesEty ety : buttons) {
			JSONObject aObj = new JSONObject();
			aObj.put("mainClass", ety.getMainClass());
			aObj.put("menuName", ety.getMenuName());
			aObj.put("jsClassFile", ety.getJsClassFile());
			aObj.put("id", ety.getNodeId());
			aObj.put("icon", ety.getIcon());
			aObj.put("type", ety.getType());
			
			Map<String, Object> sparaMap = new HashMap<String, Object>();
			sparaMap.put("pnodeId", ety.getNodeId());
			sparaMap.put("userId", userEty.getId());
			List<ResourcesEty> nodes = userDao.selectUserTree(sparaMap);
			if(nodes.size() == 0) {
				aObj.put("leaf", true);
			}
			
			JSONArray array = new JSONArray();
			for (int i = 0; i < nodes.size(); i++) {
				ResourcesEty rsEty = nodes.get(i);
				JSONObject obj = new JSONObject();
				obj.put("id", rsEty.getNodeId());
				obj.put("text", rsEty.getMenuName());
				obj.put("icon", rsEty.getIcon());
				obj.put("type", rsEty.getType());

				if(rsEty.getActionPath() != null && !rsEty.getActionPath().trim().equals("") && rsEty.getType().equals("iframe")) {
					obj.put("leaf", true);
					obj.put("url", rsEty.getActionPath());
				}
				else if(rsEty.getJsClassFile() != null && !rsEty.getJsClassFile().trim().equals("") && rsEty.getType().equals("JSClass")) {
					obj.put("leaf", true);
					obj.put("jsUrl", rsEty.getJsClassFile());
					obj.put("mainClass", rsEty.getMainClass());
					obj.put("namespace", rsEty.getNamespace());
				}
				else {
					obj.put("leaf", false);
				}
				array.add(obj);
			}
			aObj.put("subMenu", array);
			rsArr.add(aObj);
		}
		retObj.put("userTree", rsArr);
		return retObj;
	}

	@RequestMapping("logout.sdo")
	public @ResponseBody String logout(HttpServletRequest request, HttpServletResponse response) {
		JSONObject obj = new JSONObject();
		obj.put("success", true);
		request.getSession().removeAttribute("UserEty");
		request.getSession().invalidate();
		obj.put("result", "success");
		return obj.toString();
	}

	@ExceptionHandler
	public @ResponseBody
	String handle(Exception e) {
		logger.error("", e);
		JSONObject obj = new JSONObject();
		obj.put("success", true);
		obj.put("result", "error");
		obj.put("info", e.getMessage());
		return obj.toString();
	}
}
