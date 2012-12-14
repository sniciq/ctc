<%@page import="java.util.Date"%>
<%@ page language="java" contentType="text/html;charset=utf-8"%>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%> 

<c:set var="ctx" value="${pageContext.request.contextPath}"></c:set>
<c:set var="version" value="${applicationScope.SysVersion}"></c:set>

<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<meta http-equiv="pragma" content="no-cache" />
		<title>CTC System</title>
		<link rel="stylesheet" type="text/css" href="${ctx}/ExtJS/resources/css/ext-all.css.gzipfile"/>
		<link rel="stylesheet" type="text/css" href="${ctx}/ExtJS/resources/css/ext-all-notheme.css"/>
		
		<link rel="stylesheet" type="text/css" title="blue" href="${ctx}/ExtJS/resources/css/xtheme-blue.css" />
		<link rel="stylesheet" type="text/css" title="vistablack" href="${ctx}/ExtJS/resources/css/xtheme-vistablack/css/xtheme-vistablack.css" />
		<link rel="stylesheet" type="text/css" title="gray" href="${ctx}/ExtJS/resources/css/xtheme-gray.css" />
		<link rel="stylesheet" type="text/css" title="tp" href="${ctx}/ExtJS/resources/css/xtheme-tp.css" />
		<link rel="stylesheet" type="text/css" title="indigo" href="${ctx}/ExtJS/resources/css/xtheme-indigo.css" />
		<link rel="stylesheet" type="text/css" title="darkblue" href="${ctx}/ExtJS/resources/css/xtheme-darkblue/css/xtheme-darkblue.css" />
		<link rel="stylesheet" type="text/css" title="orange" href="${ctx}/ExtJS/resources/css/xtheme-orange/css/xtheme-orange.css" />
		<link rel="stylesheet" type="text/css" title="black" href="${ctx}/ExtJS/resources/css/xtheme-black/css/xtheme-black.css" />
		<link rel="stylesheet" type="text/css" title="dodgerblue" href="${ctx}/ExtJS/resources/css/xtheme-dodgerblue/css/xtheme-dodgerblue.css" />
		<link rel="stylesheet" type="text/css" title="dftheme" href="${ctx}/ExtJS/resources/css/xtheme-dftheme/css/xtheme-dftheme.css" />
		
		<script type="text/javascript" src="${ctx}/ExtJS/adapter/ext/ext-base.js.gzipfile"></script>
		<script type="text/javascript" src="${ctx}/ExtJS/ext-all.js.gzipfile"></script>
		<script type="text/javascript" src="${ctx}/ExtJS/src/locale/ext-lang-zh_CN.js"></script>
		
		
		<link rel="stylesheet" type="text/css" href="${ctx}/css/animated-dataview.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${ctx}/css/buttons.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${ctx}/css/menu.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${ctx}/css/mytheme-blue.css?v=${version}"/>
		
		<script type="text/javascript" src="${ctx}/ExtJS/plugin/cellselect.js?v=${version}"></script>
		<script type="text/javascript" src="${ctx}/ExtJS/plugin/chrome18up_grid_bug_fix.js?v=${version}"></script>
		
		<script type="text/javascript" src="${ctx}/ExtJS/examples/ux/DataViewTransition.js?v=${version}"></script>
		
		<!--主JS 验证及导出等JS -->
		<script type="text/javascript" src="${ctx}/js/core/gridToExcel.js?v=${version}"></script>
		<script type="text/javascript" src="${ctx}/js/ValidateSession.js?v=${version}"></script>
		<script type="text/javascript" src="${ctx}/js/core/CommonRenderer.js?v=${version}"></script>
		<script type="text/javascript" src="${ctx}/js/core/export.js?v=${version}"></script>
		<script type="text/javascript" src="${ctx}/js/core/CommonChart.js?v=${version}"></script>
		<script type="text/javascript" src="${ctx}/js/core/JSLoader.js?v=${version}"></script>
		<script type="text/javascript" src="${ctx}/js/core/TabCloseMenu.js?v=${version}"></script>
		<script type="text/javascript" src="${ctx}/js/core/App.js?v=${version}"></script>
		<script type="text/javascript" src="${ctx}/js/core/MenuTreePanel.js?v=${version}"></script>
		<script type="text/javascript" src="${ctx}/js/core/DataViewMenuPanel.js?v=${version}"></script>
		
		<script type="text/javascript" src="${ctx}/js/core/param.js?v=${version}"></script>
		
		<script type="text/javascript">
			var globalCtx = '${ctx}';
		</script>
		
		<script type="text/javascript" src="main.js?v=${version}"></script>
		
		<style type="text/css">
			div.panel_header_icon_title_left {
			    text-align: center;
			    vertical-align:middle;
			    float: left;
			    height: 22px;
			    width: 22px;
			    padding-right: 6px;
			}
			div.panel_header_main {
			    text-align: center;
			    vertical-align:middle;
			    float: left;
			    height: 22px;
			    line-height: 22px;
			    margin: auto;
			}
			
			div.panel_header_extra {
			    text-align: left;
			    float: right;
			    margin-right: 10px;
			}
			
			div.panel_header_icon1 {
			    text-align: right;
			    float: right;
			    margin-left: 3px;
			    cursor: hand;
			    cursor: pointer;
			}
			
			div.panel_header_icon2 {
			    text-align: right;
			    float: right;
			    margin-left: 3px;
			    cursor: hand;
			    cursor: pointer;
			}
			
			.userInfo {
				height: 35px;margin-top: 5px;float: right;margin-right: 10px;text-align: right;
				font-weight: bold; font-size: 15px; color: #333333;
			}
		</style>
	</head>
	<body>
	</body>
</html>