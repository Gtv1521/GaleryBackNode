-- MySQL dump 10.13  Distrib 8.0.34, for Linux (x86_64)
--
-- Host: localhost    Database: dataImagenes
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` char(30) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(90) DEFAULT NULL,
  `userName` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES (23,'gustavo','$2a$10$gxUGqN9fxrfCAlnlHX58S.wylaz/mRP9a20sZm1exB5yvumjcFrkK','gustavober98@gmail.com','GTV123'),(24,'gustavo','$2a$10$4zz6FoSiN46n0wyRb8qOaeQ7oStz4BzUncOOmookvogqfI3kANkJm','gustavober98@gmail.com','GTV1234'),(25,'gustavo','$2a$10$fLMx9nIKeRP5h/8.CNIN5uchX.AwHx.KBUNdmCZzrgfuiTCPsVIMy','gustavober98@gmail.com','gus'),(26,'gustavo','$2a$10$aqGI1e6ujvvU2gpv51s1heBuCFCNrVu841nsvbsQnHAh7QRIkTzwi','gustavober98@gmail.com','Gtv1521'),(27,'gustavo','$2a$10$5vYBBNq9TcpCuetqLd9Whemgk9P3.d..lUxxI7C8E4JBq5YKCa82W','gustavober98@gmail.com','Gtv152'),(28,'Gustavo','$2a$10$pSp.lZD060xyKMzFGwSmUuU5iZVIh9XK6KdD61wG/tXNelnTuto1u','gustavo@gmail.com','GTV_129'),(29,'Gustavo','$2a$10$QYOlUeK65HZZc61G2nI8GeH6vn1aBap6awLdiJ5.c6BOvkD2NyqUK','gustavo@gmail.com',''),(30,'gustavo','$2a$10$kWA//Nn1fuoKBb6Ff/60nOHFksHQIcJ2brWCslEt8.HZ0XKy4o/8O','gustavobe98@gmail.com','Gtv099'),(31,'gustavo','$2a$10$AykQ.60yr7g0qvCv0gm1AO.UChr88/xbhogWTCYK6NxpXB11aStgO','gustavober980@gmail.com','Gtv_12'),(32,'gustavo','$2a$10$JHCTC0D5XNM1vThwOIzXjelmm9euFnuH7FOUj5pnLUbsc5YyT0mTK','gustavober80@gmail.com','Gtv_129'),(33,'gustavo','$2a$10$RwF8OXDIz/G6KbuF2d6Lf.6fiz./vgstUTXLk4B08IHtnbtClTh9u','gustavober00@gmail.com','GustavoBernal'),(34,'gustavo','$2a$10$H/Wf78JAzvya2SA.EtDLjO/wcWK4gS7eQ9DqiJEqCA9nNNAX/Zs16','gustav@gmail.com','Gustavo123');
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `imagenes`
--

DROP TABLE IF EXISTS `imagenes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `imagenes` (
  `id_img` int NOT NULL AUTO_INCREMENT,
  `name_img` varchar(255) DEFAULT NULL,
  `description_img` varchar(255) DEFAULT NULL,
  `url_img` varchar(255) DEFAULT NULL,
  `username` int DEFAULT NULL,
  `id_url` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_img`),
  KEY `username` (`username`),
  CONSTRAINT `imagenes_ibfk_1` FOREIGN KEY (`username`) REFERENCES `User` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `imagenes`
--

LOCK TABLES `imagenes` WRITE;
/*!40000 ALTER TABLE `imagenes` DISABLE KEYS */;
/*!40000 ALTER TABLE `imagenes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-05  9:48:08
