package com.ms.filter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

public class SessionUtil {
	
	public static final String Index = "index.html";
	public static final String IndexJSP = "index.jsp";
	public static final String Validate = "Validate.jsp";
	public static final String Login = "login.html";
	public static final String LoginJSP = "login.jsp";
	public static final String Error = "error.html";
	public static final String Redirect="/admin/redirect.jsp";
	public static final String LoginAction = "login.sdo";
	public static final String LogOutAction = "logout.sdo";
	public static final String IsTransCodeAtion = "IsTransCodeAtion.action";
	public static final String JS = ".js";
	public static final String GZIPFILE = ".gzipfile";
	public static final String CSS = ".css";
	public static final String JPG = ".jpg";
	public static final String GIF = ".gif";
	public static final String PNG = ".png";

	/**
	 * 判断session是否过期
	 * @param HttpServletRequest
	 * @return 如果session有效，则返回true，否则返回false
	 */
	public static boolean ifFlagExistInSession(HttpServletRequest request) {
		HttpSession session = request.getSession(false);
		if (session != null && session.getAttribute("UserEty") != null) {
			return true;
		}
		return false;
	}
}
