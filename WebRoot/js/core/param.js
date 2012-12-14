function createParamObj(url) {
	var len = url.length;//获取url的长度
	var offset = url.indexOf("?");//设置参数字符串开始的位置
	var allParams = url.substr(offset+1,len)//取出参数字符串 这里会获得类似“id=1”这样的字符串
	
	var paramArr = allParams.split("&");
	var paramObj = {};
	for(var i = 0; i < paramArr.length; i++) {
		var aParam = paramArr[i];
		if(!aParam || aParam == '')
			continue;
			
		var aParamArr = aParam.split("=");
		paramObj[aParamArr[0]] = aParamArr[1];
	}
	return paramObj;
}