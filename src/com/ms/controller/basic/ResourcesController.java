package com.ms.controller.basic;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.eddy.util.EntityReflect;
import com.eddy.util.ExtLimit;
import com.eddy.util.JSONGrid;
import com.ms.dao.entity.basic.ResourcesEty;
import com.ms.dao.mapper.basic.ResourcesDao;

@Controller
@RequestMapping("/basic/ResourcesController/")
public class ResourcesController {
	
	private Logger logger = Logger.getLogger(ResourcesController.class);
	
	@Autowired
	private ResourcesDao resourcesDao;
	
	@RequestMapping("search.sdo")
	public @ResponseBody String search(HttpServletRequest request, HttpServletResponse response) throws Exception {
		ResourcesEty resourcesEty = (ResourcesEty) EntityReflect.createObjectFromRequest(request, ResourcesEty.class);
		ExtLimit limit = (ExtLimit) EntityReflect.createObjectFromRequest(request, ExtLimit.class);
		resourcesEty.setExtLimit(limit);
		int count = resourcesDao.selectLimitCount(resourcesEty);
		List<ResourcesEty> list = resourcesDao.selectByLimit(resourcesEty);
		JSONObject data = JSONGrid.toJSon(list, count);
		return data.toString();
	}

	@RequestMapping("save.sdo")
	public @ResponseBody String save(HttpServletRequest request, HttpServletResponse response) {
		JSONObject obj = new JSONObject();
		obj.put("success",true);
		ResourcesEty resourcesEty = (ResourcesEty) EntityReflect.createObjectFromRequest(request, ResourcesEty.class);
		if(resourcesEty.getId() == null) {
			resourcesDao.insert(resourcesEty);
		} else { 
			resourcesDao.updateById(resourcesEty);
		}
		obj.put("result","success");		
		return obj.toString();  
	}

	@RequestMapping("delete.sdo")
	public @ResponseBody String delete(HttpServletRequest request, HttpServletResponse response) {
		JSONObject obj = new JSONObject();
		obj.put("success",true);
		String id = request.getParameter("id");
		resourcesDao.deleteById(Integer.parseInt(id));
		obj.put("result","success");
		return obj.toString();  
	}

	@RequestMapping("getDetailInfo.sdo")
	public @ResponseBody String getDetailInfo(HttpServletRequest request, HttpServletResponse response) {
		JSONObject obj = new JSONObject();
		obj.put("success",true);
		String id = request.getParameter("id");
		ResourcesEty resourcesEty = (ResourcesEty) resourcesDao.selectById(Integer.parseInt(id));
		obj.put("data", resourcesEty);
		return obj.toString();  
	}
	
	@ExceptionHandler
	public @ResponseBody String handle(Exception e) {
		logger.error("", e);
		JSONObject obj = new JSONObject();
		obj.put("success",true);
		obj.put("result","error");
		obj.put("info",e.getMessage());
		return obj.toString();
	}
}