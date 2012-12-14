-- MySQL Administrator dump 1.4
--
-- ------------------------------------------------------
-- Server version	5.1.49-community


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


--
-- Create schema ctc
--

CREATE DATABASE IF NOT EXISTS ctc;
USE ctc;

--
-- Definition of table `resource`
--

DROP TABLE IF EXISTS `resource`;
CREATE TABLE `resource` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `nodeId` int(10) DEFAULT NULL,
  `menuName` varchar(45) DEFAULT NULL,
  `parantNodeID` int(10) DEFAULT NULL,
  `icon` varchar(100) DEFAULT NULL,
  `openIcon` varchar(100) DEFAULT NULL,
  `actionPath` varchar(300) DEFAULT NULL,
  `menuOrder` int(10) DEFAULT NULL,
  `isValiDate` char(1) DEFAULT NULL,
  `description` varchar(45) DEFAULT NULL,
  `jsClassFile` varchar(500) DEFAULT NULL,
  `type` varchar(45) DEFAULT NULL,
  `namespace` varchar(100) DEFAULT NULL,
  `mainClass` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COMMENT='²Ëµ¥×ÊÔ´';

--
-- Dumping data for table `resource`
--

/*!40000 ALTER TABLE `resource` DISABLE KEYS */;
INSERT INTO `resource` (`id`,`nodeId`,`menuName`,`parantNodeID`,`icon`,`openIcon`,`actionPath`,`menuOrder`,`isValiDate`,`description`,`jsClassFile`,`type`,`namespace`,`mainClass`) VALUES 
 (4,8000,'系统管理',0,'../images/systemControl.png',NULL,'',8000,'1','','','iframe',NULL,''),
 (5,8001,'资源管理',8000,'../images/icon32/1335953321_maintenance.png',NULL,'',8001,'1','','basic/ResourcePanel.js','JSClass',NULL,'com.ms.basic.ResourcePanel'),
 (6,8002,'用户管理',8000,'../images/icon32/user-list.png',NULL,'',8002,'1','','basic/UserPanel.js','JSClass',NULL,'com.ms.basic.UserPanel'),
 (7,8003,'角色管理',8000,'../images/icon32/role.png',NULL,'',8003,'1','','basic/RolePanel.js;basic/RoleUserWin.js','JSClass',NULL,'com.ms.basic.RolePanel');
/*!40000 ALTER TABLE `resource` ENABLE KEYS */;


--
-- Definition of table `role`
--

DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `roleName` varchar(45) DEFAULT NULL,
  `describle` varchar(500) DEFAULT NULL,
  `roleAuth` varchar(45) DEFAULT 'person' COMMENT 'È«¹ú(all), ¸öÈË(person)',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `role`
--

/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` (`id`,`roleName`,`describle`,`roleAuth`) VALUES 
 (1,'管理员','管理系统','person'),
 (2,'普通用户','','person');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;


--
-- Definition of table `roleresource`
--

DROP TABLE IF EXISTS `roleresource`;
CREATE TABLE `roleresource` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `roleId` int(10) unsigned NOT NULL,
  `nodeId` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `roleresource`
--

/*!40000 ALTER TABLE `roleresource` DISABLE KEYS */;
INSERT INTO `roleresource` (`id`,`roleId`,`nodeId`) VALUES 
 (6,1,8000),
 (5,1,8001),
 (4,1,8000),
 (7,1,8001),
 (8,1,8002),
 (9,1,8000),
 (10,1,8001),
 (11,1,8002),
 (12,1,8003);
/*!40000 ALTER TABLE `roleresource` ENABLE KEYS */;


--
-- Definition of table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userName` varchar(45) DEFAULT NULL,
  `realName` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  `description` varchar(45) DEFAULT NULL,
  `insertDate` datetime DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `sex` tinyint(4) DEFAULT NULL,
  `birthDay` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`id`,`userName`,`realName`,`password`,`description`,`insertDate`,`email`,`sex`,`birthDay`) VALUES 
 (1,'admin','管理员','admin',NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;


--
-- Definition of table `userrole`
--

DROP TABLE IF EXISTS `userrole`;
CREATE TABLE `userrole` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `userId` int(10) unsigned NOT NULL,
  `roleId` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='ÓÃ»§½ÇÉ«±í';

--
-- Dumping data for table `userrole`
--

/*!40000 ALTER TABLE `userrole` DISABLE KEYS */;
INSERT INTO `userrole` (`id`,`userId`,`roleId`) VALUES 
 (1,1,1);
/*!40000 ALTER TABLE `userrole` ENABLE KEYS */;




/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
