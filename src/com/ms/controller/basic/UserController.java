package com.ms.controller.basic;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.eddy.util.DateJsonValueProcessor;
import com.eddy.util.JSONGrid;
import com.ms.dao.entity.basic.UserEty;
import com.ms.dao.mapper.basic.UserDao;

/**
 * 用户管理
 */
@Controller
@RequestMapping("/basic/UserController/")
public class UserController {
	
	private Logger logger = Logger.getLogger(UserController.class);
	
	@Autowired
	private UserDao userDao;

	@InitBinder
	public void initBibder(WebDataBinder binder) {
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		df.setLenient(false);
		binder.registerCustomEditor(Date.class, new CustomDateEditor(df, true));
	}
	
	@RequestMapping(value="search.sdo")
	public @ResponseBody String search(HttpServletRequest request, HttpServletResponse response, UserEty userEty) throws Exception {
		int count = userDao.selectLimitCount(userEty);
		List<UserEty> list = userDao.selectByLimit(userEty);
		JSONObject retObj = JSONGrid.toJSon(list, count, new SimpleDateFormat("yyyy-MM-dd"));
		return retObj.toString();
	}
	
	@RequestMapping(value="save.sdo", method=RequestMethod.POST)
	public @ResponseBody String save(UserEty userEty) {
		JSONObject obj = new JSONObject();
		obj.put("success",true);
		if(userEty.getId() == null) {
			userDao.insert(userEty);
		} else { 
			userDao.updateById(userEty);
		}
		obj.put("result","success");
		return obj.toString();
	}

	@RequestMapping(value="delete.sdo", method=RequestMethod.POST)
	public @ResponseBody String delete(@RequestParam("id") int id) {
		JSONObject obj = new JSONObject();
		obj.put("success",true);
		userDao.deleteById(id);
		obj.put("result","success");
		return obj.toString();
	}

	@RequestMapping(value="getDetailInfo.sdo")
	public @ResponseBody String getDetailInfo(@RequestParam("id") int id) {
		JSONObject obj = new JSONObject();
		obj.put("success",true);
		UserEty userEty = (UserEty) userDao.selectById(id);
		JsonConfig config = new JsonConfig();
		config.registerJsonValueProcessor(Date.class, new DateJsonValueProcessor("yyyy-MM-dd"));
		JSONObject dataObj = JSONObject.fromObject(userEty, config);
		obj.put("data", dataObj);
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