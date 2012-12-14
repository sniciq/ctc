<%@ page pageEncoding="utf-8"%>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>

<html>
	<body>
		<form action="${ctx}/j_spring_security_logout"></form>
	</body>
	<script type="text/javascript">
		document.forms[0].submit();
	</script>
</html>
