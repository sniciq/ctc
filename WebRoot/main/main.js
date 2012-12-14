Ext.BLANK_IMAGE_URL = globalCtx+'/ExtJS/resources/images/default/s.gif';

Ext.onReady(function() {
	Ext.QuickTips.init();
	
	Ext.Ajax.defaultHeaders = {'Request-By': 'Ext'};
	Ext.Ajax.timeout = 600000;//请求超时时间改为600秒
	
	myApp = new ms.office.app({
		logoutUrl: globalCtx+'/basic/LoginController/logout.sdo'
	});
	myApp.ctx = globalCtx;
	myApp.on('loadUserInfoOver', function(obj) {
		myApp.createUserMenu();
//		myApp.addIndexPanel();
		myApp.showHelp();
		
		//根据传入参数初始化系统
		var urlinfo = window.location.href;  //获取当前页面的url
		var paramObj = createParamObj(urlinfo);
		if(paramObj.initSys && paramObj.initSys == 'true') {
			myApp.initSys(paramObj);
		}
	});
	myApp.initTheme('blue');
	myApp.loadUserInfo(globalCtx+'/basic/LoginController/getUserPermission.sdo');
	
	
	window.addTab = function(item) {
		myApp.addTab(item);
	}
	
	window.findTab =  function(id) {
		return myApp.findTab(id);
	},
	
	window.addClassTab = function(id, moduleStr, jsFiles, attr, fv) {
		myApp.addModuleTab(id, moduleStr, jsFiles, attr, fv);
	}
	
});
