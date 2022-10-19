CREATE DATABASE  IF NOT EXISTS `drink_shop` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `drink_shop`;
-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: drink_shop
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `menu`
--

DROP TABLE IF EXISTS `menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menu` (
  `menu_id` int NOT NULL AUTO_INCREMENT,
  `menu_name` varchar(45) NOT NULL,
  `menu_price` double NOT NULL,
  `menu_type_id` int NOT NULL,
  `menu_image` varchar(45) NOT NULL,
  PRIMARY KEY (`menu_id`),
  KEY `menu_type_id_idx` (`menu_type_id`),
  CONSTRAINT `menu_type_id` FOREIGN KEY (`menu_type_id`) REFERENCES `menu_type` (`menu_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu`
--

LOCK TABLES `menu` WRITE;
/*!40000 ALTER TABLE `menu` DISABLE KEYS */;
INSERT INTO `menu` VALUES (1,'Americano',35,1,'Hot_Americano.png'),(2,'Americano',55,2,'Iced_Americano.png'),(3,'Americano',60,3,'FRAPPE_Americano.png'),(4,'Mocha',50,1,'hot_mocha.jpg'),(5,'Mocha',65,2,'iced_mocha.jpg'),(6,'Mocha',70,3,'Mocha_Frap.jpg'),(7,'Latte Macchiato',50,1,'hot_latte.png'),(8,'Latte Macchiato',70,2,'iced_latte.png'),(9,'Latte Macchiato',80,3,'freppe_latte.png'),(10,'Tea',40,1,'Tea.png'),(11,'Green Tea',50,2,'Green_Tea.png'),(12,'Thai Tea',50,2,'Thai_Tea.png'),(13,'Chocolate',45,1,'hot_Chocolate.png'),(14,'Chocolate',50,2,'iced_Chocolate.png'),(15,'Chocolate',55,3,'Frappe_Chocolate.png'),(16,'Fresh Milk',35,1,'hot_milk.png'),(17,'Fresh Milk',45,2,'iced_milk.png'),(18,'Fresh Milk',50,3,'frappe_milk.png');
/*!40000 ALTER TABLE `menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menu_type`
--

DROP TABLE IF EXISTS `menu_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menu_type` (
  `menu_type_id` int NOT NULL AUTO_INCREMENT,
  `menu_type_name` varchar(45) NOT NULL,
  PRIMARY KEY (`menu_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu_type`
--

LOCK TABLES `menu_type` WRITE;
/*!40000 ALTER TABLE `menu_type` DISABLE KEYS */;
INSERT INTO `menu_type` VALUES (1,'HOT'),(2,'COLD'),(3,'FRAPPE');
/*!40000 ALTER TABLE `menu_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `receipt`
--

DROP TABLE IF EXISTS `receipt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `receipt` (
  `rcp_id` int NOT NULL AUTO_INCREMENT,
  `rcp_date` timestamp NOT NULL,
  PRIMARY KEY (`rcp_id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `receipt`
--

LOCK TABLES `receipt` WRITE;
/*!40000 ALTER TABLE `receipt` DISABLE KEYS */;
INSERT INTO `receipt` VALUES (2,'2022-10-19 11:11:03'),(3,'2022-10-19 11:11:48'),(4,'2022-10-19 11:18:33'),(5,'2022-10-19 11:21:39'),(6,'2022-10-19 11:40:24'),(7,'2022-10-19 11:40:48'),(8,'2022-10-19 11:41:53'),(9,'2022-10-19 11:42:41'),(10,'2022-10-19 11:43:05'),(11,'2022-10-19 11:46:57'),(12,'2022-10-19 11:47:47'),(13,'2022-10-19 11:48:25'),(14,'2022-10-19 11:49:01'),(15,'2022-10-19 11:50:13'),(16,'2022-10-19 11:50:13'),(17,'2022-10-19 11:53:53'),(18,'2022-10-19 11:54:43'),(19,'2022-10-19 11:55:30'),(20,'2022-10-19 11:57:42'),(21,'2022-10-19 11:58:05'),(22,'2022-10-19 11:58:11'),(23,'2022-10-19 11:59:02'),(24,'2022-10-19 11:59:22'),(25,'2022-10-19 11:59:26'),(26,'2022-10-19 11:59:49'),(27,'2022-10-19 12:00:05'),(28,'2022-10-19 12:00:08'),(29,'2022-10-19 12:01:52');
/*!40000 ALTER TABLE `receipt` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `receipt_detail`
--

DROP TABLE IF EXISTS `receipt_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `receipt_detail` (
  `rcp_id` int NOT NULL,
  `menu_id` int NOT NULL,
  `amount` int NOT NULL,
  `total` double NOT NULL,
  KEY `reciept_detail_id_idx` (`rcp_id`),
  KEY `menu_id_idx` (`menu_id`),
  CONSTRAINT `menu_id` FOREIGN KEY (`menu_id`) REFERENCES `menu` (`menu_id`),
  CONSTRAINT `reciept_detail_id` FOREIGN KEY (`rcp_id`) REFERENCES `receipt` (`rcp_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `receipt_detail`
--

LOCK TABLES `receipt_detail` WRITE;
/*!40000 ALTER TABLE `receipt_detail` DISABLE KEYS */;
INSERT INTO `receipt_detail` VALUES (13,1,1,35),(13,2,1,55),(13,3,1,60),(14,5,3,195),(15,1,1,35),(15,2,1,55),(15,3,1,60),(16,5,3,195),(17,5,1,65),(17,4,1,50),(18,5,1,65),(18,4,1,50),(19,5,1,65),(20,18,1,50),(21,18,1,50),(22,11,1,50),(23,5,1,65),(24,5,1,65),(25,3,1,60),(29,5,1,65),(29,10,1,40);
/*!40000 ALTER TABLE `receipt_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `usr_id` int NOT NULL AUTO_INCREMENT,
  `usr_username` varchar(45) NOT NULL,
  `usr_password` varchar(45) NOT NULL,
  `usr_firstname` varchar(45) NOT NULL,
  `usr_lastname` varchar(45) NOT NULL,
  PRIMARY KEY (`usr_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'1234','1234','Rachanon','Montree');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-19 19:41:18
