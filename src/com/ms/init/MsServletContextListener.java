package com.ms.init;

import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

public class MsServletContextListener implements ServletContextListener {

	@Override
	public void contextDestroyed(ServletContextEvent event) {
		event.getServletContext().log("系统关闭");
	}

	@Override
	public void contextInitialized(ServletContextEvent event) {
		ServletContext context = event.getServletContext();
		context.log("系统初始化...");
		String version = new SimpleDateFormat("yyyyMMddHHmmss").format(new Date());
		context.setAttribute("SysVersion", version);
		
		//设置quartz是否跳过检查更新
		System.setProperty("org.terracotta.quartz.skipUpdateCheck", "true");
		
		//设置mybatis使用Log4J做为日志记录
		org.apache.ibatis.logging.LogFactory.useLog4JLogging();
	}

}
