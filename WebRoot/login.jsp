<%@page import="java.util.Date"%>
<%@ page language="java" contentType="text/html;charset=utf-8"%>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%> 

<c:set var="ctx" value="${pageContext.request.contextPath}"></c:set>
<c:set var="version" value="${applicationScope.SysVersion}"></c:set>

<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<link rel="stylesheet" type="text/css" href="ExtJS/resources/css/ext-all.css.gzipfile"/>
		<script type="text/javascript" src="ExtJS/adapter/ext/ext-base.js.gzipfile"></script>
		<script type="text/javascript" src="ExtJS/ext-all.js.gzipfile"></script>
		<style type="text/css">
			.text-user {background:url('images/user.png') no-repeat !important;padding:2px 0 2px 18px;}
			.text-lock{background:url('images/lock.gif') no-repeat !important;padding:2px 0 2px 18px;}
			.login {background-image: url(images/blogin.png ) !important;}
			.reset {background-image: url(images/login-reset.png ) !important;}
		</style>
		<script type="text/javascript">
			Ext.onReady(function() {
				var loginForm = new Ext.form.FormPanel({
					url:'${ctx}/basic/LoginController/login.sdo',
					height: 110,
					frame: false,
					bodyStyle : 'padding-top:8px',
					labelAlign: 'right',
					labelWidth: 60,
					labelPad : 0,
			        border : false,
					items: [
						 { xtype: 'textfield', name: 'userName', value:"admin", cls : 'text-user', fieldLabel: '用户名', allowBlank : false, anchor : '95%'},
						 { xtype: 'textfield', inputType:'password',value:"admin", cls: 'text-lock', name: 'password', fieldLabel: '密码', allowBlank : false, anchor : '95%'}
					],
					buttons: [
						{
							text: 'Login',
							id: 'loginBtn',
							iconCls: 'login',
							width: 70,
							handler: doLogin
						},
						{
							text: 'reset',
							iconCls: 'reset',
							handler: function() {
								loginForm.getForm().reset();
							}
						}
					],
					keys:[
						{
							key: [13],
							fn: doLogin	
						}
					]
				});
				
				function doLogin() {
					if(!loginForm.getForm().isValid())
						return;

					Ext.getCmp('loginBtn').disable();
					
					loginForm.form.doAction('submit', {
						method: 'post',
						waitTitle:'login...',
						waitMsg: 'login...',
						params: '',
						success: function(form, action) {
							if(action.result.result == 'success') {
								window.location.href = 'main/main.jsp';
							}
						},
						failure:function(form, action){
			                Ext.Msg.alert('error','login error');
			                loginForm.getForm().reset();
			                Ext.getCmp('loginBtn').enable();
			            }
					});
				}
				
				win = new Ext.Window({
					title:'Login',
	                applyTo:'center-div',
	                layout:'fit',
	                width: 350,
					height: 170,
					bodyStyle : 'background-color: white',
	                border : true,
					closable : false,
	                resizable : true,
	                closeAction:'hide',
	                plain: true,
	                layout : {
	                    type : 'vbox',
	                    align : 'stretch'
	                },
	                items: [
						{
						    xtype : 'panel',
						    border : false,
						    bodyStyle : 'padding-left:30px',
						    html : '<table border="0"><tr><td valign="top"><img src="images/logo.png" /></td><td><a style="font-weight: bold;font-size: 20;text-align: center;color: #3F3A39">CTC</a></td></tr></table>',
						    height : 30
						},
	                    loginForm
	                ]
				});
				win.show();
			});
		</script>
	</head>
	<body style="background-color:#CCCCCC;">
		<div id="center-div"></div>
	</body>
</html>