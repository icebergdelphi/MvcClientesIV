-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         5.5.27 - MySQL Community Server (GPL)
-- SO del servidor:              Win32
-- HeidiSQL Versión:             8.0.0.4396
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Volcando estructura de base de datos para mvcclientes
CREATE DATABASE IF NOT EXISTS `mvcclientes` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `mvcclientes`;


-- Volcando estructura para tabla mvcclientes.catalogo_limite_credito
CREATE TABLE IF NOT EXISTS `catalogo_limite_credito` (
  `idlimite` int(10) NOT NULL AUTO_INCREMENT,
  `descripcion` char(50) DEFAULT NULL,
  PRIMARY KEY (`idlimite`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla mvcclientes.catalogo_limite_credito: ~4 rows (aproximadamente)
/*!40000 ALTER TABLE `catalogo_limite_credito` DISABLE KEYS */;
INSERT INTO `catalogo_limite_credito` (`idlimite`, `descripcion`) VALUES
	(1, 'Limite de credito hasta 1000'),
	(2, 'Limite de credito hasta 5000'),
	(3, 'Limite de credito hasta 10000'),
	(4, 'Limite de credito hasta 15000');
/*!40000 ALTER TABLE `catalogo_limite_credito` ENABLE KEYS */;


-- Volcando estructura para tabla mvcclientes.ci_sessions
CREATE TABLE IF NOT EXISTS `ci_sessions` (
  `session_id` varchar(40) NOT NULL DEFAULT '0',
  `ip_address` varchar(16) NOT NULL DEFAULT '0',
  `user_agent` varchar(120) NOT NULL,
  `last_activity` int(10) unsigned NOT NULL DEFAULT '0',
  `user_data` text NOT NULL,
  PRIMARY KEY (`session_id`),
  KEY `last_activity_idx` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla mvcclientes.ci_sessions: ~5 rows (aproximadamente)
/*!40000 ALTER TABLE `ci_sessions` DISABLE KEYS */;
INSERT INTO `ci_sessions` (`session_id`, `ip_address`, `user_agent`, `last_activity`, `user_data`) VALUES
	('10d3d71a9470fed7aeaba7c4c3bf28a1', '::1', 'Mozilla/5.0 (Windows NT 6.2; WOW64; rv:29.0) Gecko/20100101 Firefox/29.0 FirePHP/0.7.4', 1400454282, ''),
	('49c37e680d7771309808a4edb658a61c', '::1', 'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/34.0.1847.137 Safari/537.36', 1400459139, 'a:2:{s:9:"user_data";s:0:"";s:9:"logged_in";a:2:{s:2:"id";s:1:"6";s:8:"username";s:5:"Admin";}}'),
	('641f5394250fcac5702bdf3e3c0e1c08', '::1', 'Mozilla/5.0 (Windows NT 6.2; WOW64; rv:29.0) Gecko/20100101 Firefox/29.0', 1400453979, 'a:2:{s:9:"user_data";s:0:"";s:9:"logged_in";a:2:{s:2:"id";s:1:"6";s:8:"username";s:5:"Hiber";}}'),
	('6647b723b7f261e523e03b12db35ba12', '::1', 'Mozilla/5.0 (Windows NT 6.2; WOW64; rv:29.0) Gecko/20100101 Firefox/29.0', 1400455805, 'a:1:{s:9:"user_data";s:0:"";}'),
	('9c39e28ba49037822f8d03d5e42073ee', '::1', 'Mozilla/5.0 (Windows NT 6.2; WOW64; rv:29.0) Gecko/20100101 Firefox/29.0 FirePHP/0.7.4', 1400453940, 'a:1:{s:9:"user_data";s:0:"";}');
/*!40000 ALTER TABLE `ci_sessions` ENABLE KEYS */;


-- Volcando estructura para tabla mvcclientes.clientes
CREATE TABLE IF NOT EXISTS `clientes` (
  `idcliente` int(10) NOT NULL AUTO_INCREMENT,
  `Cliente` char(120) DEFAULT NULL,
  `Sexo` char(1) DEFAULT 'M',
  `Edad` tinyint(4) DEFAULT NULL,
  `id_limitecredito` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`idcliente`)
) ENGINE=InnoDB AUTO_INCREMENT=112 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla mvcclientes.clientes: ~17 rows (aproximadamente)
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
INSERT INTO `clientes` (`idcliente`, `Cliente`, `Sexo`, `Edad`, `id_limitecredito`) VALUES
	(1, 'Juan Patistan Lopez Lara', 'M', 27, 1),
	(2, 'Hortencia Ramirez Diaz', 'F', 35, 1),
	(6, 'Esteban Rios Pascacio', 'F', 12, 1),
	(12, 'Andres Ivan Moreno Pascacio', 'M', 12, 1),
	(15, 'Juan Pablo Moreno Tovilla', 'M', 30, 2),
	(16, 'Armando Diaz Lopez', 'M', 35, 3),
	(23, 'Donaciano Tovilla Hernandez', 'M', 26, 3),
	(27, 'Carlos Alejandro Moreno Pascacio', 'M', 2, 1),
	(60, 'Artemio Macias Aceros', 'M', 56, 1),
	(90, 'Lopez', 'M', 1, 2),
	(96, 'Gatos', 'M', 1, 1),
	(100, 'Hiber', 'M', 1, 3),
	(101, 'Juan', 'M', 1, 1),
	(106, 'Esteban Rios Pascacio', 'F', 12, 2),
	(108, 'Pancho', 'M', 12, 1),
	(110, 'Pinachin', 'M', 23, 1),
	(111, 'Salomon', 'M', 23, 1);
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */;


-- Volcando estructura para tabla mvcclientes.facturas
CREATE TABLE IF NOT EXISTS `facturas` (
  `IdFactura` int(10) NOT NULL AUTO_INCREMENT,
  `Idcliente` int(10) DEFAULT '0',
  `Total` double DEFAULT '0',
  PRIMARY KEY (`IdFactura`),
  KEY `FK__clientes` (`Idcliente`),
  CONSTRAINT `FK__clientes` FOREIGN KEY (`Idcliente`) REFERENCES `clientes` (`idcliente`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla mvcclientes.facturas: ~3 rows (aproximadamente)
/*!40000 ALTER TABLE `facturas` DISABLE KEYS */;
INSERT INTO `facturas` (`IdFactura`, `Idcliente`, `Total`) VALUES
	(1, 1, 100),
	(2, 1, 200),
	(3, 2, 100);
/*!40000 ALTER TABLE `facturas` ENABLE KEYS */;


-- Volcando estructura para tabla mvcclientes.groups
CREATE TABLE IF NOT EXISTS `groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla mvcclientes.groups: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `groups` DISABLE KEYS */;
INSERT INTO `groups` (`id`, `name`) VALUES
	(1, 'admin'),
	(2, 'Capturistas');
/*!40000 ALTER TABLE `groups` ENABLE KEYS */;


-- Volcando estructura para tabla mvcclientes.menu
CREATE TABLE IF NOT EXISTS `menu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `text` varchar(45) NOT NULL,
  `iconCls` varchar(15) DEFAULT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `className` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_Menu_Menu` (`parent_id`),
  CONSTRAINT `fk_Menu_Menu` FOREIGN KEY (`parent_id`) REFERENCES `menu` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla mvcclientes.menu: ~9 rows (aproximadamente)
/*!40000 ALTER TABLE `menu` DISABLE KEYS */;
INSERT INTO `menu` (`id`, `text`, `iconCls`, `parent_id`, `className`) VALUES
	(1, 'Catalogos', 'catalogos', NULL, NULL),
	(2, 'Clientes', 'clientes', 1, 'gridClientes'),
	(3, 'Proveedores', 'proveedores', 1, 'panel'),
	(4, 'Movimientos', 'movimientos', NULL, NULL),
	(5, 'Facturas', 'tabs', 4, 'panel'),
	(6, 'Devoluciones', 'tabs', 4, 'panel'),
	(7, 'Ingreso', 'tabs', 4, 'panel'),
	(8, 'Reportes', 'reportes', 4, 'panel'),
	(9, 'Consultas', 'tabs', 4, 'panel');
/*!40000 ALTER TABLE `menu` ENABLE KEYS */;


-- Volcando estructura para tabla mvcclientes.permissions
CREATE TABLE IF NOT EXISTS `permissions` (
  `Menu_id` int(11) NOT NULL,
  `Group_id` int(11) NOT NULL,
  PRIMARY KEY (`Menu_id`,`Group_id`),
  KEY `fk_Menu_has_Group_Group1` (`Group_id`),
  KEY `fk_Menu_has_Group_Menu1` (`Menu_id`),
  CONSTRAINT `fk_Menu_has_Group_Group1` FOREIGN KEY (`Group_id`) REFERENCES `groups` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Menu_has_Group_Menu1` FOREIGN KEY (`Menu_id`) REFERENCES `menu` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla mvcclientes.permissions: ~12 rows (aproximadamente)
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;
INSERT INTO `permissions` (`Menu_id`, `Group_id`) VALUES
	(1, 1),
	(2, 1),
	(3, 1),
	(4, 1),
	(5, 1),
	(6, 1),
	(7, 1),
	(8, 1),
	(9, 1),
	(4, 2),
	(5, 2),
	(6, 2);
/*!40000 ALTER TABLE `permissions` ENABLE KEYS */;


-- Volcando estructura para tabla mvcclientes.users
CREATE TABLE IF NOT EXISTS `users` (
  `email_address` char(50) DEFAULT NULL,
  `password` varchar(40) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `grupoId` int(11) NOT NULL DEFAULT '0',
  `username` char(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla mvcclientes.users: ~3 rows (aproximadamente)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`email_address`, `password`, `id`, `grupoId`, `username`) VALUES
	('andres@hotmail.com', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', 4, 1, 'Andres'),
	('delphiiceberg@gmail.com', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', 6, 1, 'Admin'),
	('jmendoza@tejidosjorgito.com', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', 7, 2, 'Jose');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
