<%@page import="java.util.Date"%>
<%@ page language="java" contentType="text/html;charset=utf-8"%>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%> 

<c:set var="ctx" value="${pageContext.request.contextPath}"></c:set>
<c:set var="version" value="${applicationScope.SysVersion}"></c:set>

<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Stateful Array Grid Example</title>
	<link rel="stylesheet" type="text/css" href="../ExtJS/resources/css/ext-all.css.gzipfile"/>
	<link rel="stylesheet" type="text/css" href="../ExtJS/examples/ux/fileuploadfield/css/fileuploadfield.css"/>
	<link rel="stylesheet" type="text/css" href="../css/buttons.css"/>
		
	<script type="text/javascript" src="../ExtJS/adapter/ext/ext-base.js.gzipfile"></script>
	<script type="text/javascript" src="../ExtJS/ext-all.js.gzipfile"></script>
	<script type="text/javascript" src="../ExtJS/src/locale/ext-lang-zh_CN.js"></script>
	<script type="text/javascript" src="../ExtJS/examples/ux/fileuploadfield/FileUploadField.js"></script>
	<script type="text/javascript" src="../basic/ResourcePanel.js"></script>
	<script type="text/javascript" src="../basic/RoleUserWin.js"></script>
	<script type="text/javascript" src="../basic/RolePanel.js"></script>
	<script type="text/javascript" src="../basic/UserPanel.js"></script>
	
	<script type="text/javascript">
		Ext.BLANK_IMAGE_URL = '../ExtJS/resources/images/default/s.gif';
	
		Ext.onReady(function() {
			Ext.QuickTips.init();
			
			var panel = new com.ms.basic.RolePanel({region:'center', ctx: '${ctx}'});
			
			var viewport = new Ext.Viewport({
				layout: 'border',
				items: [panel]
			});
		});
	</script>

</head>
<body>
</body>
</html>