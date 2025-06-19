-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: hackathon
-- ------------------------------------------------------
-- Server version	8.0.41

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
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `account_balance` decimal(38,2) DEFAULT NULL,
  `account_number` varchar(255) DEFAULT NULL,
  `account_type` varchar(255) DEFAULT NULL,
  `version` bigint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `account_change_audit`
--

DROP TABLE IF EXISTS `account_change_audit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account_change_audit` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `account_id` bigint DEFAULT NULL,
  `change_summary` varchar(255) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account_change_audit`
--

LOCK TABLES `account_change_audit` WRITE;
/*!40000 ALTER TABLE `account_change_audit` DISABLE KEYS */;
/*!40000 ALTER TABLE `account_change_audit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `agent`
--

DROP TABLE IF EXISTS `agent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `agent` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `account_number` varchar(255) DEFAULT NULL,
  `agent_balance` decimal(38,2) DEFAULT NULL,
  `agent_name` varchar(255) DEFAULT NULL,
  `agent_number` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `pin` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `agent`
--

LOCK TABLES `agent` WRITE;
/*!40000 ALTER TABLE `agent` DISABLE KEYS */;
INSERT INTO `agent` VALUES (2,'202518169825',44600.00,'Riocool Agent','3320307','2025-06-15 21:09:06.621455','$2a$10$7hvsH7ImX2KGFImiMOHBRuvXCSWRB20LMjMQ1QYB489lNKufYfypW','AGENT','ACTIVE');
/*!40000 ALTER TABLE `agent` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `alert`
--

DROP TABLE IF EXISTS `alert`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alert` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `message` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `timestamp` datetime(6) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `posted_by` bigint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alert`
--

LOCK TABLES `alert` WRITE;
/*!40000 ALTER TABLE `alert` DISABLE KEYS */;
/*!40000 ALTER TABLE `alert` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `anomaly_log`
--

DROP TABLE IF EXISTS `anomaly_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `anomaly_log` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `details` varchar(255) DEFAULT NULL,
  `detected_at` datetime(6) DEFAULT NULL,
  `transaction_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `anomaly_log`
--

LOCK TABLES `anomaly_log` WRITE;
/*!40000 ALTER TABLE `anomaly_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `anomaly_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `audit_log`
--

DROP TABLE IF EXISTS `audit_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `audit_log` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `action` varchar(255) DEFAULT NULL,
  `changes` longtext,
  `entity_id` bigint DEFAULT NULL,
  `entity_name` varchar(255) DEFAULT NULL,
  `performed_by` varchar(255) DEFAULT NULL,
  `timestamp` datetime(6) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `audit_log`
--

LOCK TABLES `audit_log` WRITE;
/*!40000 ALTER TABLE `audit_log` DISABLE KEYS */;
INSERT INTO `audit_log` VALUES (1,'READ','Returned data: 0.0, 0.0',NULL,'IPLocationUtils','location unavailable','2025-06-13 13:03:48.929050','Location lookup for IP: 0:0:0:0:0:0:0:1'),(2,'READ','Returned data: 0.0, 0.0',NULL,'IPLocationUtils','location unavailable','2025-06-13 13:13:56.795755','Location lookup for IP: 0:0:0:0:0:0:0:1'),(3,'LOGIN',NULL,15,'User','riocoolnjama9@gmail.com','2025-06-14 20:22:44.856183','riocoolnjama9@gmail.com login successful from IP: 0:0:0:0:0:0:0:1 and location: location unavailable'),(4,'LOGIN',NULL,2,'User','masikanjama@gmail.com','2025-06-14 20:27:33.481420','masikanjama@gmail.com login successful from IP: 0:0:0:0:0:0:0:1 and location: location unavailable'),(5,'LOGIN',NULL,15,'User','riocoolnjama9@gmail.com','2025-06-14 20:46:57.241784','riocoolnjama9@gmail.com login successful from IP: 0:0:0:0:0:0:0:1 and location: location unavailable'),(6,'LOGIN',NULL,1,'User','justinenjama33@gmail.com','2025-06-15 09:37:20.844665','justinenjama33@gmail.com login successful from IP: 0:0:0:0:0:0:0:1 and location: location unavailable'),(7,'LOGIN',NULL,1,'User','justinenjama33@gmail.com','2025-06-15 13:53:05.769366','Login from device: Windows, IP: 0:0:0:0:0:0:0:1, location: location unavailable'),(8,'LOGIN',NULL,1,'User','justinenjama33@gmail.com','2025-06-15 15:59:30.039100','Login from device: Windows, IP: 0:0:0:0:0:0:0:1, location: location unavailable'),(9,'LOGIN',NULL,1,'User','justinenjama33@gmail.com','2025-06-15 22:08:53.321314','Login from device: Windows, IP: 0:0:0:0:0:0:0:1, location: location unavailable');
/*!40000 ALTER TABLE `audit_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fraud_alert`
--

DROP TABLE IF EXISTS `fraud_alert`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fraud_alert` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `description` varchar(255) DEFAULT NULL,
  `detected_by` varchar(255) DEFAULT NULL,
  `severity` varchar(255) DEFAULT NULL,
  `timestamp` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fraud_alert`
--

LOCK TABLES `fraud_alert` WRITE;
/*!40000 ALTER TABLE `fraud_alert` DISABLE KEYS */;
/*!40000 ALTER TABLE `fraud_alert` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `loan`
--

DROP TABLE IF EXISTS `loan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `loan` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `account_number` varchar(255) DEFAULT NULL,
  `applicant_income` float NOT NULL,
  `coapplicant_income` float NOT NULL,
  `credit_history` float NOT NULL,
  `due_date` date DEFAULT NULL,
  `education` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `interest_rate` double DEFAULT NULL,
  `loan_amount` float NOT NULL,
  `loan_amount_term` float NOT NULL,
  `loan_application_date` date DEFAULT NULL,
  `loan_id` varchar(255) DEFAULT NULL,
  `married` varchar(255) DEFAULT NULL,
  `property_area` varchar(255) DEFAULT NULL,
  `remaining_balance` decimal(38,2) DEFAULT NULL,
  `self_employed` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `total_debt` decimal(38,2) DEFAULT NULL,
  `ref_number` varchar(255) DEFAULT NULL,
  `interest` decimal(38,2) DEFAULT NULL,
  `approved_at` date DEFAULT NULL,
  `approved_by` bigint DEFAULT NULL,
  `paid_amount` decimal(38,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loan`
--

LOCK TABLES `loan` WRITE;
/*!40000 ALTER TABLE `loan` DISABLE KEYS */;
INSERT INTO `loan` VALUES (1,'202518169825',500000,150000,1,'2055-05-30','Graduate','Male',0.07,8900,360,'2025-05-30','38U9S441','Yes','Urban',27590.00,'No','APPROVED',27590.00,NULL,NULL,NULL,NULL,NULL),(2,'202545018355',10000,8000,0,'2027-06-12','Not Graduate','Female',NULL,20000,24,'2025-06-12','19b4974e-aee5-43a7-bd6e-cfc1c264248d','Yes','Rural',22800.00,'Yes','PENDING',22800.00,'S7L38WP8',2800.00,NULL,NULL,0.00);
/*!40000 ALTER TABLE `loan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `loan_defaulters`
--

DROP TABLE IF EXISTS `loan_defaulters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `loan_defaulters` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `account_number` varchar(255) DEFAULT NULL,
  `added_at` date DEFAULT NULL,
  `amount` decimal(38,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loan_defaulters`
--

LOCK TABLES `loan_defaulters` WRITE;
/*!40000 ALTER TABLE `loan_defaulters` DISABLE KEYS */;
/*!40000 ALTER TABLE `loan_defaulters` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `loan_payment`
--

DROP TABLE IF EXISTS `loan_payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `loan_payment` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `paid_amount` decimal(38,2) DEFAULT NULL,
  `paid_at` date DEFAULT NULL,
  `total_debt` decimal(38,2) DEFAULT NULL,
  `account_number` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loan_payment`
--

LOCK TABLES `loan_payment` WRITE;
/*!40000 ALTER TABLE `loan_payment` DISABLE KEYS */;
/*!40000 ALTER TABLE `loan_payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `login_audit`
--

DROP TABLE IF EXISTS `login_audit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `login_audit` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `action` enum('LOGIN','LOGOUT') DEFAULT NULL,
  `ip_address` varchar(255) DEFAULT NULL,
  `timestamp` datetime(6) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `login_audit`
--

LOCK TABLES `login_audit` WRITE;
/*!40000 ALTER TABLE `login_audit` DISABLE KEYS */;
INSERT INTO `login_audit` VALUES (1,'LOGIN','0:0:0:0:0:0:0:1','2025-06-01 20:32:56.939946','justinenjama33@gmail.com'),(2,'LOGIN','0:0:0:0:0:0:0:1','2025-06-01 20:51:11.393787','justinenjama33@gmail.com'),(3,'LOGIN','0:0:0:0:0:0:0:1','2025-06-06 23:01:37.963323','justinenjama33@gmail.com'),(4,'LOGIN','0:0:0:0:0:0:0:1','2025-06-07 09:02:35.690111','justinenjama33@gmail.com'),(5,'LOGIN','0:0:0:0:0:0:0:1','2025-06-07 10:13:03.520854','justinenjama33@gmail.com'),(6,'LOGIN','0:0:0:0:0:0:0:1','2025-06-11 08:35:27.818064','masikanjama@gmail.com'),(7,'LOGIN','0:0:0:0:0:0:0:1','2025-06-11 20:47:25.184389','masikanjama@gmail.com'),(8,'LOGIN','0:0:0:0:0:0:0:1','2025-06-11 21:58:55.379939','masikanjama@gmail.com'),(9,'LOGIN','0:0:0:0:0:0:0:1','2025-06-12 10:02:00.277471','masikanjama@gmail.com'),(10,'LOGIN','0:0:0:0:0:0:0:1','2025-06-12 11:54:39.075820','masikanjama@gmail.com'),(11,'LOGIN','0:0:0:0:0:0:0:1','2025-06-12 12:57:22.365935','justinenjama33@gmail.com'),(12,'LOGIN','0:0:0:0:0:0:0:1','2025-06-14 20:22:42.514563','riocoolnjama9@gmail.com'),(13,'LOGIN','0:0:0:0:0:0:0:1','2025-06-14 20:27:30.583895','masikanjama@gmail.com'),(14,'LOGIN','0:0:0:0:0:0:0:1','2025-06-14 20:46:55.707557','riocoolnjama9@gmail.com'),(15,'LOGIN','0:0:0:0:0:0:0:1','2025-06-15 09:37:19.388468','justinenjama33@gmail.com'),(16,'LOGIN','0:0:0:0:0:0:0:1','2025-06-15 13:52:59.280185','justinenjama33@gmail.com'),(17,'LOGIN','0:0:0:0:0:0:0:1','2025-06-15 15:59:25.658993','justinenjama33@gmail.com'),(18,'LOGIN','0:0:0:0:0:0:0:1','2025-06-15 22:08:45.073985','justinenjama33@gmail.com');
/*!40000 ALTER TABLE `login_audit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `login_history`
--

DROP TABLE IF EXISTS `login_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `login_history` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `ip_address` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `login_time` datetime(6) DEFAULT NULL,
  `successful` bit(1) NOT NULL,
  `version` bigint DEFAULT NULL,
  `device_info` varchar(255) DEFAULT NULL,
  `trusted_device` bit(1) NOT NULL,
  `user_agent` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=181 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `login_history`
--

LOCK TABLES `login_history` WRITE;
/*!40000 ALTER TABLE `login_history` DISABLE KEYS */;
INSERT INTO `login_history` VALUES (1,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-13 22:37:42.613000',_binary '',NULL,NULL,_binary '\0',NULL),(2,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-13 22:41:21.551000',_binary '',NULL,NULL,_binary '\0',NULL),(3,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-13 22:45:55.098000',_binary '',NULL,NULL,_binary '\0',NULL),(4,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-14 09:26:03.506000',_binary '',NULL,NULL,_binary '\0',NULL),(5,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-14 09:36:59.075000',_binary '',NULL,NULL,_binary '\0',NULL),(6,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-14 09:44:19.170000',_binary '',NULL,NULL,_binary '\0',NULL),(7,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-14 12:06:41.426000',_binary '',NULL,NULL,_binary '\0',NULL),(8,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-14 16:25:27.752000',_binary '',NULL,NULL,_binary '\0',NULL),(9,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-14 21:16:31.822000',_binary '',NULL,NULL,_binary '\0',NULL),(10,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-14 21:18:46.029000',_binary '',NULL,NULL,_binary '\0',NULL),(11,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-14 21:24:28.627000',_binary '',NULL,NULL,_binary '\0',NULL),(12,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-14 21:26:02.396000',_binary '',NULL,NULL,_binary '\0',NULL),(13,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-14 21:27:16.546000',_binary '',NULL,NULL,_binary '\0',NULL),(14,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-15 09:11:29.023000',_binary '',NULL,NULL,_binary '\0',NULL),(15,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-15 09:17:50.485000',_binary '',NULL,NULL,_binary '\0',NULL),(16,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-15 09:35:21.323000',_binary '',NULL,NULL,_binary '\0',NULL),(17,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-15 09:41:42.484000',_binary '',NULL,NULL,_binary '\0',NULL),(18,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-15 09:44:09.089000',_binary '',NULL,NULL,_binary '\0',NULL),(19,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-15 09:48:20.628000',_binary '',NULL,NULL,_binary '\0',NULL),(20,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-15 09:57:50.970000',_binary '',NULL,NULL,_binary '\0',NULL),(21,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-16 13:00:18.558000',_binary '',NULL,NULL,_binary '\0',NULL),(22,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-16 13:01:36.132000',_binary '',NULL,NULL,_binary '\0',NULL),(23,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-16 13:01:58.694000',_binary '',NULL,NULL,_binary '\0',NULL),(24,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-16 13:03:07.791000',_binary '',NULL,NULL,_binary '\0',NULL),(25,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-16 13:03:50.500000',_binary '',NULL,NULL,_binary '\0',NULL),(26,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-16 13:04:09.881000',_binary '',NULL,NULL,_binary '\0',NULL),(27,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-16 13:04:38.341000',_binary '',NULL,NULL,_binary '\0',NULL),(28,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-16 13:05:42.538000',_binary '',NULL,NULL,_binary '\0',NULL),(29,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-17 18:32:49.818000',_binary '',NULL,NULL,_binary '\0',NULL),(30,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-17 18:44:18.254000',_binary '',NULL,NULL,_binary '\0',NULL),(31,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-17 19:14:09.717000',_binary '\0',NULL,NULL,_binary '\0',NULL),(32,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-17 19:14:29.281000',_binary '\0',NULL,NULL,_binary '\0',NULL),(33,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-17 19:14:44.216000',_binary '\0',NULL,NULL,_binary '\0',NULL),(34,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-17 19:14:56.495000',_binary '\0',NULL,NULL,_binary '\0',NULL),(35,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-17 19:15:10.442000',_binary '\0',NULL,NULL,_binary '\0',NULL),(36,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-20 13:52:22.449000',_binary '',0,NULL,_binary '\0',NULL),(37,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-20 13:52:42.612000',_binary '',0,NULL,_binary '\0',NULL),(38,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-20 13:55:52.710000',_binary '',0,NULL,_binary '\0',NULL),(39,'masikanjama@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-20 13:56:45.956000',_binary '',0,NULL,_binary '\0',NULL),(40,'masikanjama@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-20 13:59:05.704000',_binary '',0,NULL,_binary '\0',NULL),(41,'masikanjama@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-20 14:01:14.229000',_binary '',0,NULL,_binary '\0',NULL),(42,'masikanjama@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-20 14:05:47.660000',_binary '',0,NULL,_binary '\0',NULL),(43,'masikanjama@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-20 14:14:33.385000',_binary '',0,NULL,_binary '\0',NULL),(44,'masikanjama@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-21 21:00:14.458000',_binary '',0,NULL,_binary '\0',NULL),(45,'masikanjama@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-21 21:10:11.440000',_binary '',0,NULL,_binary '\0',NULL),(46,'masikanjama@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-21 21:42:40.688000',_binary '',0,NULL,_binary '\0',NULL),(47,'masikanjama@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-21 22:07:16.542000',_binary '',0,NULL,_binary '\0',NULL),(48,'masikanjama@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-21 22:19:04.165000',_binary '',0,NULL,_binary '\0',NULL),(49,'masikanjama@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-21 22:26:25.883000',_binary '',0,NULL,_binary '\0',NULL),(50,'masikanjama@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-21 22:39:05.490000',_binary '',0,NULL,_binary '\0',NULL),(51,'masikanjama@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-21 22:40:04.964000',_binary '',0,NULL,_binary '\0',NULL),(52,'masikanjama@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-21 22:42:40.929000',_binary '',0,NULL,_binary '\0',NULL),(53,'masikanjama@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-21 22:47:17.624000',_binary '',0,NULL,_binary '\0',NULL),(54,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-21 22:51:40.916000',_binary '',0,NULL,_binary '\0',NULL),(55,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-24 14:06:09.981000',_binary '',0,NULL,_binary '\0',NULL),(56,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-24 14:14:41.982000',_binary '',0,NULL,_binary '\0',NULL),(57,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-24 14:21:29.445000',_binary '',0,NULL,_binary '\0',NULL),(58,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-24 14:23:37.808000',_binary '',0,NULL,_binary '\0',NULL),(59,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-24 14:25:02.895000',_binary '',0,NULL,_binary '\0',NULL),(60,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-24 14:38:36.068000',_binary '',0,NULL,_binary '\0',NULL),(61,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-24 14:42:14.577000',_binary '',0,NULL,_binary '\0',NULL),(62,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-27 11:25:26.762000',_binary '',0,NULL,_binary '\0',NULL),(63,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-27 11:59:19.055000',_binary '\0',0,NULL,_binary '\0',NULL),(64,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-27 11:59:35.393000',_binary '',0,NULL,_binary '\0',NULL),(65,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-27 12:04:30.221000',_binary '\0',0,NULL,_binary '\0',NULL),(66,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-27 12:04:51.769000',_binary '',0,NULL,_binary '\0',NULL),(67,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-27 14:19:42.787000',_binary '\0',0,NULL,_binary '\0',NULL),(68,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-27 15:31:31.648000',_binary '\0',0,NULL,_binary '\0',NULL),(69,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-27 15:36:05.525000',_binary '\0',0,NULL,_binary '\0',NULL),(70,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-27 15:36:30.608000',_binary '\0',0,NULL,_binary '\0',NULL),(71,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-27 15:37:19.441000',_binary '\0',0,NULL,_binary '\0',NULL),(72,'masikanjama@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-27 15:45:38.980000',_binary '',0,NULL,_binary '\0',NULL),(73,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-27 16:08:03.168000',_binary '',0,NULL,_binary '\0',NULL),(74,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-28 00:05:05.130000',_binary '\0',0,NULL,_binary '\0',NULL),(75,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-28 00:15:26.341000',_binary '',0,NULL,_binary '\0',NULL),(76,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-28 00:18:21.395000',_binary '',0,NULL,_binary '\0',NULL),(77,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-28 00:20:14.388000',_binary '',0,NULL,_binary '\0',NULL),(78,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-28 00:20:59.441000',_binary '',0,NULL,_binary '\0',NULL),(79,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-28 00:43:10.773000',_binary '',0,NULL,_binary '\0',NULL),(80,'masikanjama@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-28 09:05:38.802000',_binary '',0,NULL,_binary '\0',NULL),(81,'masikanjama@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-28 09:28:20.336000',_binary '',0,NULL,_binary '\0',NULL),(82,'masikanjama@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-28 09:34:11.222000',_binary '',0,NULL,_binary '\0',NULL),(83,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-28 09:35:01.427000',_binary '',0,NULL,_binary '\0',NULL),(84,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-28 09:43:23.053000',_binary '',0,NULL,_binary '\0',NULL),(85,'masikanjama@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-28 10:27:22.332000',_binary '',0,NULL,_binary '\0',NULL),(86,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-28 10:39:25.229000',_binary '',0,NULL,_binary '\0',NULL),(87,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-28 11:32:25.805000',_binary '',0,NULL,_binary '\0',NULL),(88,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-28 11:34:30.160000',_binary '',0,NULL,_binary '\0',NULL),(89,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-28 11:52:08.912000',_binary '',0,NULL,_binary '\0',NULL),(90,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-28 12:03:17.937000',_binary '',0,NULL,_binary '\0',NULL),(91,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-28 12:04:19.360000',_binary '',0,NULL,_binary '\0',NULL),(92,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-28 12:04:53.261000',_binary '',0,NULL,_binary '\0',NULL),(93,'masikanjama@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-28 12:05:18.385000',_binary '',0,NULL,_binary '\0',NULL),(94,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-28 12:12:12.933000',_binary '\0',0,NULL,_binary '\0',NULL),(95,'masikanjama@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-28 12:12:53.257000',_binary '',0,NULL,_binary '\0',NULL),(96,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-28 12:13:16.867000',_binary '',0,NULL,_binary '\0',NULL),(97,'riocoolnjama@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-28 13:30:28.775000',_binary '',0,NULL,_binary '\0',NULL),(98,'masikanjama@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-28 14:34:44.875000',_binary '',0,NULL,_binary '\0',NULL),(99,'masikanjama@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-28 14:59:50.711000',_binary '',0,NULL,_binary '\0',NULL),(100,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-28 15:00:26.071000',_binary '',0,NULL,_binary '\0',NULL),(101,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-28 15:27:27.329000',_binary '',0,NULL,_binary '\0',NULL),(102,'masikanjama@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-28 17:03:28.790000',_binary '',0,NULL,_binary '\0',NULL),(103,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-28 17:10:56.030000',_binary '',0,NULL,_binary '\0',NULL),(104,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-28 17:33:16.170000',_binary '',0,NULL,_binary '\0',NULL),(105,'masikanjama@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-28 19:56:35.298000',_binary '',0,NULL,_binary '\0',NULL),(106,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-28 20:01:40.466000',_binary '',0,NULL,_binary '\0',NULL),(107,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-28 20:49:45.157000',_binary '',0,NULL,_binary '\0',NULL),(108,'masikanjama@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-28 20:50:56.237000',_binary '',0,NULL,_binary '\0',NULL),(109,'masikanjama@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-28 20:57:14.617000',_binary '',0,NULL,_binary '\0',NULL),(110,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-28 21:11:48.799000',_binary '',0,NULL,_binary '\0',NULL),(111,'masikanjama@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-28 21:13:14.564000',_binary '',0,NULL,_binary '\0',NULL),(112,'masikanjama@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-28 21:36:12.430000',_binary '',0,NULL,_binary '\0',NULL),(113,'masikanjama@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-28 21:41:36.463000',_binary '',0,NULL,_binary '\0',NULL),(114,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-28 21:43:48.592000',_binary '',0,NULL,_binary '\0',NULL),(115,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-28 21:44:29.799000',_binary '',0,NULL,_binary '\0',NULL),(116,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-28 21:47:09.788000',_binary '',0,NULL,_binary '\0',NULL),(117,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-28 22:06:24.905000',_binary '',0,NULL,_binary '\0',NULL),(118,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-28 22:34:54.938000',_binary '',0,NULL,_binary '\0',NULL),(119,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-29 00:21:44.897000',_binary '',0,NULL,_binary '\0',NULL),(120,'masikanjama@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-29 09:52:13.516000',_binary '',0,NULL,_binary '\0',NULL),(121,'masikanjama@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-29 11:22:09.367000',_binary '',0,NULL,_binary '\0',NULL),(122,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-29 11:45:06.914000',_binary '',0,NULL,_binary '\0',NULL),(123,'masikanjama@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-29 11:59:19.630000',_binary '',0,NULL,_binary '\0',NULL),(124,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-29 12:04:06.515000',_binary '',0,NULL,_binary '\0',NULL),(125,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-29 13:17:48.131000',_binary '',0,NULL,_binary '\0',NULL),(126,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-29 13:22:32.950000',_binary '',0,NULL,_binary '\0',NULL),(127,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-29 15:28:39.984000',_binary '',0,NULL,_binary '\0',NULL),(128,'masikanjama@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-29 16:41:49.726000',_binary '\0',0,NULL,_binary '\0',NULL),(129,'masikanjama@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-29 16:45:47.813000',_binary '\0',0,NULL,_binary '\0',NULL),(130,'masikanjama@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-29 19:33:05.587000',_binary '\0',0,NULL,_binary '\0',NULL),(131,'masikanjama@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-29 19:33:33.750000',_binary '\0',0,NULL,_binary '\0',NULL),(132,'masikanjama@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-29 19:33:54.530000',_binary '\0',0,NULL,_binary '\0',NULL),(133,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-29 19:39:05.590000',_binary '',0,NULL,_binary '\0',NULL),(134,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-30 09:46:59.359000',_binary '',0,NULL,_binary '\0',NULL),(135,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-30 10:57:17.718000',_binary '\0',0,NULL,_binary '\0',NULL),(136,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-30 11:00:10.113000',_binary '\0',0,NULL,_binary '\0',NULL),(137,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-30 11:02:00.374000',_binary '\0',0,NULL,_binary '\0',NULL),(138,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-30 11:02:29.436000',_binary '\0',0,NULL,_binary '\0',NULL),(139,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-30 11:02:44.803000',_binary '\0',0,NULL,_binary '\0',NULL),(140,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-30 11:14:18.208000',_binary '\0',0,NULL,_binary '\0',NULL),(141,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-30 11:19:09.968000',_binary '\0',0,NULL,_binary '\0',NULL),(142,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-30 11:19:54.042000',_binary '',0,NULL,_binary '\0',NULL),(143,'bndgdd@go.ke','0:0:0:0:0:0:0:1','location unavailable','2025-05-30 11:57:52.045000',_binary '\0',0,NULL,_binary '\0',NULL),(144,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-30 11:58:18.794000',_binary '\0',0,NULL,_binary '\0',NULL),(145,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-30 11:58:38.533000',_binary '',0,NULL,_binary '\0',NULL),(146,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-30 12:02:25.713000',_binary '',0,NULL,_binary '\0',NULL),(147,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-30 13:07:35.470000',_binary '\0',0,NULL,_binary '\0',NULL),(148,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-05-30 13:07:46.900000',_binary '',0,NULL,_binary '\0',NULL),(149,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-06-01 11:54:06.027000',_binary '',0,NULL,_binary '\0',NULL),(150,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-06-01 12:55:02.925000',_binary '\0',0,NULL,_binary '\0',NULL),(151,'masikanjama@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-06-01 13:21:38.710000',_binary '\0',0,NULL,_binary '\0',NULL),(152,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-06-01 13:23:23.091000',_binary '',0,NULL,_binary '\0',NULL),(153,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-06-01 13:28:29.208000',_binary '',0,NULL,_binary '\0',NULL),(154,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-06-01 13:34:10.389000',_binary '',0,NULL,_binary '\0',NULL),(155,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-06-01 13:36:36.262000',_binary '',0,NULL,_binary '\0',NULL),(156,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-06-01 13:37:47.595000',_binary '',0,NULL,_binary '\0',NULL),(157,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-06-01 13:46:12.268000',_binary '',0,NULL,_binary '\0',NULL),(158,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-06-01 13:51:57.918000',_binary '\0',0,NULL,_binary '\0',NULL),(159,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-06-01 13:52:18.228000',_binary '',0,NULL,_binary '\0',NULL),(160,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-06-01 20:32:42.769000',_binary '\0',0,NULL,_binary '\0',NULL),(161,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-06-01 20:33:00.372000',_binary '',0,NULL,_binary '\0',NULL),(162,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-06-01 20:51:12.219000',_binary '',0,NULL,_binary '\0',NULL),(163,'masikanjama@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-06-06 22:59:57.894000',_binary '\0',0,NULL,_binary '\0',NULL),(164,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-06-06 23:01:39.214000',_binary '',0,NULL,_binary '\0',NULL),(165,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-06-07 09:02:36.913000',_binary '',0,NULL,_binary '\0',NULL),(166,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-06-07 10:13:05.647000',_binary '',0,NULL,_binary '\0',NULL),(167,'masikanjama@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-06-11 08:35:29.309000',_binary '',0,NULL,_binary '\0',NULL),(168,'masikanjama@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-06-11 20:47:31.081000',_binary '',0,NULL,_binary '\0',NULL),(169,'masikanjama@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-06-11 21:58:57.293000',_binary '',0,NULL,_binary '\0',NULL),(170,'masikanjama@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-06-12 10:02:03.528000',_binary '',0,NULL,_binary '\0',NULL),(171,'masikanjama@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-06-12 11:54:39.550000',_binary '',0,NULL,_binary '\0',NULL),(172,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-06-12 12:56:04.160000',_binary '\0',0,NULL,_binary '\0',NULL),(173,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-06-12 12:57:22.736000',_binary '',0,NULL,_binary '\0',NULL),(174,'riocoolnjama9@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-06-14 20:22:43.216000',_binary '',0,NULL,_binary '\0',NULL),(175,'masikanjama@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-06-14 20:27:31.367000',_binary '',0,NULL,_binary '\0',NULL),(176,'riocoolnjama9@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-06-14 20:46:55.893000',_binary '',0,NULL,_binary '\0',NULL),(177,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-06-15 09:37:19.660000',_binary '',0,NULL,_binary '\0',NULL),(178,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-06-15 13:53:03.177000',_binary '',0,'Windows',_binary '\0',NULL),(179,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-06-15 15:59:26.278000',_binary '',0,'Windows',_binary '\0',NULL),(180,'justinenjama33@gmail.com','0:0:0:0:0:0:0:1','location unavailable','2025-06-15 22:08:45.958000',_binary '',0,'Windows',_binary '\0',NULL);
/*!40000 ALTER TABLE `login_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notification`
--

DROP TABLE IF EXISTS `notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notification` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `message` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  `version` bigint DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification`
--

LOCK TABLES `notification` WRITE;
/*!40000 ALTER TABLE `notification` DISABLE KEYS */;
INSERT INTO `notification` VALUES (1,'2025-05-24 14:14:58.059860','You successfully credited KSH. 4000 into your account at Sat May 24 14:14:58 EAT 2025. Your account balance is KSH. 23577.00','READ',1,0,'CREDIT'),(2,'2025-05-24 14:15:10.101077','You successfully credited KSH. 4000 into your account at Sat May 24 14:15:10 EAT 2025. Your account balance is KSH. 27577.00','READ',1,0,'CREDIT'),(3,'2025-05-24 14:22:09.578121','You successfully credited KSH. 4000 into your account at Sat May 24 14:22:09 EAT 2025. Your account balance is KSH. 31577.00','READ',1,0,'CREDIT'),(4,'2025-05-24 14:25:19.139492','You successfully debited KSH. 4000 from your account at Sat May 24 14:25:19 EAT 2025. Transaction cost is KSH. 50. Your account balance is KSH. 23477.00','READ',1,0,'DEBIT'),(5,'2025-05-24 14:25:39.558661','You successfully debited KSH. 400 from your account at Sat May 24 14:25:39 EAT 2025. Transaction cost is KSH. 23. Your account balance is KSH. 23054.00','READ',1,0,'DEBIT'),(6,'2025-05-24 14:25:56.281797','You successfully debited KSH. 3000 from your account at Sat May 24 14:25:56 EAT 2025. Transaction cost is KSH. 50. Your account balance is KSH. 20004.00','READ',1,0,'DEBIT'),(7,'2025-05-24 14:26:09.239209','You successfully debited KSH. 4000 from your account at Sat May 24 14:26:09 EAT 2025. Transaction cost is KSH. 50. Your account balance is KSH. 15954.00','READ',1,0,'DEBIT'),(8,'2025-05-28 22:13:57.148593','You successfully credited KSH. 3200 into your account at Wed May 28 22:13:56 EAT 2025. Your account balance is KSH. 15200.00','READ',1,0,'CREDIT'),(9,'2025-05-28 22:14:31.932030','You successfully debited KSH. 200 from your account at Wed May 28 22:14:31 EAT 2025. Transaction cost is KSH. 23. Your account balance is KSH. 14977.00','READ',1,0,'DEBIT'),(10,'2025-05-28 22:33:16.321912','You successfully debited KSH. 333 from your account at Wed May 28 22:33:16 EAT 2025. Transaction cost is KSH. 23. Your account balance is KSH. 14621.00','READ',1,0,'DEBIT'),(11,'2025-05-28 22:33:43.262995','You successfully debited KSH. 4567 from your account at Wed May 28 22:33:43 EAT 2025. Transaction cost is KSH. 50. Your account balance is KSH. 10004.00','READ',1,0,'DEBIT'),(12,'2025-05-28 22:33:53.673077','You successfully debited KSH. 567 from your account at Wed May 28 22:33:53 EAT 2025. Transaction cost is KSH. 26. Your account balance is KSH. 9411.00','READ',1,0,'DEBIT'),(13,'2025-05-29 21:48:55.408111','You successfully credited KSH. 3456 into your account at Thu May 29 21:48:55 EAT 2025. Your account balance is KSH. 3456.00','UNREAD',5,0,NULL),(14,'2025-05-29 21:49:34.720782','You successfully debited KSH. 400 from your account at Thu May 29 21:49:34 EAT 2025. Transaction cost is KSH. 23. Your account balance is KSH. 3033.00','UNREAD',5,0,NULL),(15,'2025-05-30 00:48:18.693441','You successfully debited KSH. 12 from your account at Fri May 30 00:48:18 EAT 2025. Transaction cost is KSH. 0. Your account balance is KSH. 9399.00','READ',1,0,NULL),(16,'2025-05-30 00:48:20.505285','You successfully debited KSH. 12 from your account at Fri May 30 00:48:20 EAT 2025. Transaction cost is KSH. 0. Your account balance is KSH. 9387.00','READ',1,0,NULL),(17,'2025-05-30 11:31:58.062224','You successfully credited KSH. 2000 into your account at Fri May 30 11:31:57 EAT 2025. Your account balance is KSH. 2000.00','UNREAD',14,0,NULL),(18,'2025-05-30 11:32:42.358268','You successfully debited KSH. 200 from your account at Fri May 30 11:32:42 EAT 2025. Transaction cost is KSH. 23. Your account balance is KSH. 1777.00','UNREAD',14,0,NULL),(19,'2025-05-30 11:45:18.819289','You successfully debited KSH. 423 from your account at Fri May 30 11:45:18 EAT 2025. Transaction cost is KSH. 23. Your account balance is KSH. 1331.00','UNREAD',14,0,NULL),(20,'2025-05-30 11:45:20.660168','You successfully credited KSH. 400 into your account at Fri May 30 11:45:20 EAT 2025. Your account balance is KSH. 400.00','UNREAD',12,0,NULL),(21,'2025-05-30 11:45:23.943771','You successfully debited KSH. 400 from your account at Fri May 30 11:45:23 EAT 2025. Transaction cost is KSH. 23. Your account balance is KSH. 1777.00','UNREAD',14,0,NULL),(22,'2025-05-30 11:45:25.910608','You successfully debited KSH. 400 from your account at Fri May 30 11:45:25 EAT 2025. Transaction cost is KSH. 23. Your account balance is KSH. 0.00','UNREAD',12,0,NULL),(23,'2025-05-30 12:07:32.658311','You successfully debited KSH. 567 from your account at Fri May 30 12:07:32 EAT 2025. Transaction cost is KSH. 26. Your account balance is KSH. 8794.00','READ',1,0,NULL),(24,'2025-06-01 12:10:06.570950','You successfully credited KSH. 200 into your account at Sun Jun 01 12:10:02 EAT 2025. Your account balance is KSH. 44200.00','UNREAD',4,0,NULL),(25,'2025-06-01 12:17:39.407255','You successfully credited KSH. 3000 into your account at Sun Jun 01 12:17:35 EAT 2025. Your account balance is KSH. 11794.00','READ',1,0,'CREDIT'),(26,'2025-06-01 12:18:36.420489','You successfully credited KSH. 20100 into your account at Sun Jun 01 12:18:32 EAT 2025. Your account balance is KSH. 64300.00','UNREAD',4,0,'CREDIT'),(27,'2025-06-01 12:28:33.529868','You successfully debited KSH. 1026 from your account at Sun Jun 01 12:28:30 EAT 2025. Transaction cost is KSH. 39. Your account balance is KSH. 10729.00','READ',1,0,'DEBIT'),(28,'2025-06-01 12:28:37.406443','You successfully credited KSH. 1000 into your account at Sun Jun 01 12:28:34 EAT 2025. Your account balance is KSH. 1000.00','UNREAD',13,0,'CREDIT'),(29,'2025-06-01 12:28:47.762472','You successfully debited KSH. 1000 from your account at Sun Jun 01 12:28:44 EAT 2025. Transaction cost is KSH. 26. Your account balance is KSH. 11794.00','READ',1,0,'TRANSFER'),(30,'2025-06-01 12:28:52.276292','You successfully debited KSH. 1000 from your account at Sun Jun 01 12:28:48 EAT 2025. Transaction cost is KSH. 26. Your account balance is KSH. 0.00','UNREAD',13,0,'TRANSFER'),(31,'2025-06-01 23:19:41.067396','Your withdrawal of KSH 2000.00 has been approved. New balance: KSH 2900.0000 Note: An early withdrawal penalty of KSH 100.0000 was applied.','READ',1,0,'CREDIT'),(32,'2025-06-01 23:21:19.031018','Your withdrawal of KSH -1.00 has been approved. New balance: KSH 2901.0500 Note: An early withdrawal penalty of KSH -0.0500 was applied.','READ',1,0,'CREDIT'),(33,'2025-06-01 23:21:27.638778','Your withdrawal of KSH -1.00 has been approved. New balance: KSH 2902.1000 Note: An early withdrawal penalty of KSH -0.0500 was applied.','READ',1,0,'CREDIT'),(34,'2025-06-01 23:22:17.690415','Your withdrawal of KSH -1.00 has been approved. New balance: KSH 2903.1500 Note: An early withdrawal penalty of KSH -0.0500 was applied.','READ',1,0,'CREDIT'),(35,'2025-06-01 23:30:53.108587','Your withdrawal of KSH 0.00 has been approved. New balance: KSH 2903.1500 Note: An early withdrawal penalty of KSH 0.0000 was applied.','READ',1,0,'CREDIT'),(36,'2025-06-14 21:52:43.094501','Bank ref: null. You transaction of KSH 6000.00. failed. Your current Balance is : KSH 5217.00','READ',1,0,'WITHDRAWAL_REQUEST'),(37,'2025-06-15 13:56:46.223037','Your pay bill application has been approved at 15, Sunday 01:56 pm.','READ',1,0,'PAYBILL APPLICATION'),(38,'2025-06-15 13:56:46.620483','Pay bill application request for account number 202518169825 has been approved by admin with id 1','READ',1,0,'PAYBILL APPRICATION'),(39,'2025-06-15 13:56:46.896844','Pay bill application request for account number 202518169825 has been approved by admin with id 1','UNREAD',15,0,'PAYBILL APPRICATION'),(40,'2025-06-15 13:57:16.428252','Your pay bill application has been approved at 15, Sunday 01:57 pm.','UNREAD',15,0,'PAYBILL APPLICATION'),(41,'2025-06-15 13:57:16.679542','Pay bill application request for account number 202519424221 has been approved by admin with id 1','READ',1,0,'PAYBILL APPRICATION'),(42,'2025-06-15 13:57:17.078562','Pay bill application request for account number 202519424221 has been approved by admin with id 1','UNREAD',15,0,'PAYBILL APPRICATION'),(43,'2025-06-15 13:58:39.764409','Your agent number application has been approved at 15, Sunday 01:58 pm.','READ',1,0,'AGENT NUMBER APPLICATION'),(44,'2025-06-15 13:58:41.321390','Agent application request for account number 202518169825 has been approved by admin with id 1','READ',1,0,'AGENT NUMBER APPRICATION'),(45,'2025-06-15 13:58:41.670131','Agent application request for account number 202518169825 has been approved by admin with id 1','UNREAD',15,0,'AGENT NUMBER APPRICATION'),(46,'2025-06-15 16:00:56.393723','Ref: IUTG3I1C You transferred KSH 2500.00 to account 202519424221','READ',1,0,'TRANSFER'),(47,'2025-06-15 16:00:56.854439','Ref: IUTG3I1C You received KSH 2500.00 from account 202518169825','UNREAD',15,0,'TRANSFER'),(48,'2025-06-15 16:01:08.625296','Bank ref: IGYJR5Z6. You transaction of KSH 2500.00. failed. Your current Balance is : KSH 2667.00','READ',1,0,'TRANSFER'),(49,'2025-06-15 16:01:13.161943','Bank ref: N9UAA0FW. You transaction of KSH 2500.00. failed. Your current Balance is : KSH 2667.00','READ',1,0,'TRANSFER'),(50,'2025-06-15 16:01:19.761057','Bank ref: null. You transaction of KSH 6000.00. failed. Your current Balance is : KSH 2667.00','READ',1,0,'WITHDRAWAL_REQUEST'),(51,'2025-06-15 16:05:38.247458','Bank ref: IGYJR5Z6. You transaction of KSH 2500.00. failed. Your current Balance is : KSH 2667.00','READ',1,0,'TRANSFER'),(52,'2025-06-15 16:05:40.029437','Bank ref: N9UAA0FW. You transaction of KSH 2500.00. failed. Your current Balance is : KSH 2667.00','READ',1,0,'TRANSFER'),(53,'2025-06-15 16:05:44.759672','Bank ref: null. You transaction of KSH 6000.00. failed. Your current Balance is : KSH 2667.00','READ',1,0,'WITHDRAWAL_REQUEST'),(54,'2025-06-15 21:09:21.669398','Your agent number application has been approved at 15, Sunday 09:09 pm.','READ',1,0,'AGENT NUMBER APPLICATION'),(55,'2025-06-15 21:09:26.520807','Agent application request for account number 202518169825 has been approved by admin with id 1','READ',1,0,'AGENT NUMBER APPRICATION'),(56,'2025-06-15 21:09:31.303997','Agent application request for account number 202518169825 has been approved by admin with id 1','UNREAD',15,0,'AGENT NUMBER APPRICATION'),(57,'2025-06-15 21:11:47.697542','Bank ref: E2RBL13O. Confirmed deposit of KSH. 400 into your account at 15, Sunday 09:11 pm using agent Riocool Agent (3320307). New balance: KSH. 2900.00','UNREAD',15,0,'CREDIT'),(58,'2025-06-15 21:11:52.093677','Bank ref: E2RBL13O. Confirmed deposit of KSH. 400 to njama mungoma (A/C: 202519424221) at 15, Sunday 09:11 pm. Your new agent balance: KSH. 49600.00','READ',1,0,'CREDIT'),(59,'2025-06-15 22:09:47.593641','Ref: IGYJR5Z6 You transferred KSH 2500.00 to account 202518169825','UNREAD',1,0,'TRANSFER'),(60,'2025-06-15 22:09:51.593956','Ref: IGYJR5Z6 You received KSH 2500.00 from account 202518169825','UNREAD',1,0,'TRANSFER'),(61,'2025-06-15 22:10:06.384145','Ref: 1W44RKJW You transferred KSH 2500.00 to account 202518169825','UNREAD',1,0,'TRANSFER'),(62,'2025-06-15 22:10:10.898791','Ref: 1W44RKJW You received KSH 2500.00 from account 202518169825','UNREAD',1,0,'TRANSFER'),(63,'2025-06-15 22:10:24.713213','Bank ref: N9UAA0FW. You transaction of KSH 2500.00. failed. Your current Balance is : KSH 7667.00','UNREAD',1,0,'TRANSFER'),(64,'2025-06-15 22:18:20.766385','Bank ref: ESBCLRTX. Confirmed deposit of KSH. 5000 into your account at 15, Sunday 10:18 pm using agent Riocool Agent (3320307). New balance: KSH. 5000.00','UNREAD',8,0,'CREDIT'),(65,'2025-06-15 22:18:24.560940','Bank ref: ESBCLRTX. Confirmed deposit of KSH. 5000 to mujoka chatu (A/C: 202583008187) at 15, Sunday 10:18 pm. Your new agent balance: KSH. 44600.00','UNREAD',1,0,'CREDIT');
/*!40000 ALTER TABLE `notification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_reset_token`
--

DROP TABLE IF EXISTS `password_reset_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_reset_token` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `code` int DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `expiry_time` datetime(6) DEFAULT NULL,
  `version` bigint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_reset_token`
--

LOCK TABLES `password_reset_token` WRITE;
/*!40000 ALTER TABLE `password_reset_token` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_reset_token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `paybill`
--

DROP TABLE IF EXISTS `paybill`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `paybill` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `account_number` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `pay_bill_balance` decimal(38,2) DEFAULT NULL,
  `pay_bill_name` varchar(255) DEFAULT NULL,
  `pay_bill_number` varchar(255) DEFAULT NULL,
  `pin` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paybill`
--

LOCK TABLES `paybill` WRITE;
/*!40000 ALTER TABLE `paybill` DISABLE KEYS */;
INSERT INTO `paybill` VALUES (1,'202518169825','2025-06-15 13:56:45.692156',0.00,'Njama Enterprise','294246','$2a$10$O/XvfmmR5i0nsjjvcTXM1.yi9E9f5Ql0vGO7di75NRHFP8jsulp0u','PENDING'),(2,'202518169825','2025-06-15 13:57:15.667352',0.00,'Riocool Developers','492837','$2a$10$0cS6WmaTkGyE5aUPPBjbdetu//5wIHBPCe44SyOHF64sVuZMg8vDq','PENDING');
/*!40000 ALTER TABLE `paybill` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pending_application`
--

DROP TABLE IF EXISTS `pending_application`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pending_application` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `account_number` varchar(255) DEFAULT NULL,
  `application_type` varchar(255) DEFAULT NULL,
  `approved_at` datetime(6) DEFAULT NULL,
  `approved_by` bigint DEFAULT NULL,
  `business_name` varchar(255) DEFAULT NULL,
  `business_number` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `pin` varchar(255) DEFAULT NULL,
  `rejected_at` datetime(6) DEFAULT NULL,
  `rejected_by` bigint DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pending_application`
--

LOCK TABLES `pending_application` WRITE;
/*!40000 ALTER TABLE `pending_application` DISABLE KEYS */;
INSERT INTO `pending_application` VALUES (1,'202519424221','PAYBILL','2025-06-15 13:57:15.347665',1,'Riocool Developers','492837','2025-06-14 23:09:05.439726','$2a$10$0cS6WmaTkGyE5aUPPBjbdetu//5wIHBPCe44SyOHF64sVuZMg8vDq',NULL,NULL,'APPROVED'),(2,'202518169825','PAYBILL','2025-06-15 13:56:44.980626',1,'Njama Enterprise','294246','2025-06-15 09:41:08.300901','$2a$10$O/XvfmmR5i0nsjjvcTXM1.yi9E9f5Ql0vGO7di75NRHFP8jsulp0u',NULL,NULL,'APPROVED'),(3,'202518169825','AGENT','2025-06-15 13:58:38.023252',1,'Mujoka ','3722438','2025-06-15 13:58:19.089565','$2a$10$J50jKXPMNIB3YpK1DkZLze2x5Bl9NvYMnlJ1guRMv0agmlAIsO8Eq',NULL,NULL,'APPROVED'),(4,'202518169825','AGENT','2025-06-15 21:09:06.459732',1,'Riocool Agent','3320307','2025-06-15 21:08:53.501098','$2a$10$7hvsH7ImX2KGFImiMOHBRuvXCSWRB20LMjMQ1QYB489lNKufYfypW',NULL,NULL,'APPROVED'),(5,'202518169825','PAYBILL',NULL,NULL,'Mombasa Devs','271728','2025-06-15 22:12:28.478324','$2a$10$BZHY6sXH7ZYhNHm3Hg.l/OVkJuAAGNH4JZY.IDfCR4VeFPTCvi/ge',NULL,NULL,'PENDING');
/*!40000 ALTER TABLE `pending_application` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pool`
--

DROP TABLE IF EXISTS `pool`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pool` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_date` datetime(6) DEFAULT NULL,
  `total_amount` decimal(38,2) DEFAULT NULL,
  `version` bigint DEFAULT NULL,
  `current_amount` decimal(38,2) NOT NULL,
  `lock_period_days` int NOT NULL,
  `owner_account_number` varchar(255) NOT NULL,
  `pool_name` varchar(255) NOT NULL,
  `start_date` datetime(6) NOT NULL,
  `target_amount` decimal(38,2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pool`
--

LOCK TABLES `pool` WRITE;
/*!40000 ALTER TABLE `pool` DISABLE KEYS */;
/*!40000 ALTER TABLE `pool` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recent_activity`
--

DROP TABLE IF EXISTS `recent_activity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recent_activity` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `activity_type` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `timestamp` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recent_activity`
--

LOCK TABLES `recent_activity` WRITE;
/*!40000 ALTER TABLE `recent_activity` DISABLE KEYS */;
INSERT INTO `recent_activity` VALUES (1,'LOCATION_LOOKUP','AT 13, Friday 01:03 pm Looked up IP: 0:0:0:0:0:0:0:1 → 0.0, 0.0','location unavailable','2025-06-13 13:03:40.138843'),(2,'LOCATION_LOOKUP','AT 13, Friday 01:13 pm Looked up IP: 0:0:0:0:0:0:0:1 → 0.0, 0.0','location unavailable','2025-06-13 13:13:55.650515'),(3,'CREDIT','Credited account 202519424221 with KSH 400','justinenjama33@gmail.com','2025-06-15 21:11:52.675764'),(4,'CREDIT','Credited account 202583008187 with KSH 5000','justinenjama33@gmail.com','2025-06-15 22:18:24.611109');
/*!40000 ALTER TABLE `recent_activity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `revenue`
--

DROP TABLE IF EXISTS `revenue`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `revenue` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `bank_revenue` decimal(38,2) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `revenu_date` datetime(6) DEFAULT NULL,
  `tax` decimal(38,2) DEFAULT NULL,
  `transaction_cost_amount` decimal(38,2) DEFAULT NULL,
  `transaction_type` varchar(255) DEFAULT NULL,
  `transaction_method` varchar(255) DEFAULT NULL,
  `account_number` varchar(255) DEFAULT NULL,
  `version` bigint DEFAULT NULL,
  `source` varchar(255) DEFAULT NULL,
  `agent_commission` decimal(38,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `revenue`
--

LOCK TABLES `revenue` WRITE;
/*!40000 ALTER TABLE `revenue` DISABLE KEYS */;
INSERT INTO `revenue` VALUES (1,20.01,'justinenjama33@gmail.com','2025-05-15 09:48:34.331000',2.99,23.00,'DEBIT',NULL,NULL,NULL,NULL,NULL),(2,20.01,'justinenjama33@gmail.com','2025-05-15 09:55:25.646000',2.99,23.00,'DEBIT',NULL,NULL,NULL,NULL,NULL),(3,20.01,'justinenjama33@gmail.com','2025-05-15 09:58:14.522000',2.99,23.00,'DEBIT',NULL,NULL,NULL,NULL,NULL),(4,0.00,NULL,'2025-05-16 13:09:28.606000',0.00,0.00,'TRANSFER',NULL,'202518169825',NULL,NULL,NULL),(5,0.00,NULL,'2025-05-16 13:10:12.862000',0.00,0.00,'TRANSFER',NULL,'202518169825',NULL,NULL,NULL),(6,0.00,NULL,'2025-05-16 13:10:16.624000',0.00,0.00,'TRANSFER',NULL,'202518169825',NULL,NULL,NULL),(7,0.00,NULL,'2025-05-16 13:10:19.386000',0.00,0.00,'TRANSFER',NULL,'202518169825',NULL,NULL,NULL),(8,0.00,NULL,'2025-05-16 13:10:37.793000',0.00,0.00,'TRANSFER',NULL,'202518169825',NULL,NULL,NULL),(9,0.00,NULL,'2025-05-17 18:33:37.200000',0.00,0.00,'DEBIT',NULL,'202518169825',NULL,NULL,NULL),(10,0.00,NULL,'2025-05-17 18:33:42.228000',0.00,0.00,'DEBIT',NULL,'202518169825',NULL,NULL,NULL),(11,0.00,NULL,'2025-05-17 18:33:44.898000',0.00,0.00,'DEBIT',NULL,'202518169825',NULL,NULL,NULL),(12,0.00,NULL,'2025-05-17 18:34:54.838000',0.00,0.00,'DEBIT',NULL,'202518169825',NULL,NULL,NULL),(13,0.00,NULL,'2025-05-17 18:44:50.749000',0.00,0.00,'DEBIT',NULL,'202518169825',NULL,NULL,NULL),(14,20.01,NULL,'2025-05-17 18:49:09.120000',2.99,23.00,'DEBIT',NULL,'202518169825',NULL,NULL,NULL),(15,43.50,NULL,'2025-05-24 14:23:57.293000',6.50,50.00,'DEBIT',NULL,'202518169825',0,NULL,NULL),(16,43.50,NULL,'2025-05-24 14:25:18.274000',6.50,50.00,'DEBIT',NULL,'202518169825',0,NULL,NULL),(17,20.01,NULL,'2025-05-24 14:25:38.848000',2.99,23.00,'DEBIT',NULL,'202518169825',0,NULL,NULL),(18,43.50,NULL,'2025-05-24 14:25:56.071000',6.50,50.00,'DEBIT',NULL,'202518169825',0,NULL,NULL),(19,43.50,NULL,'2025-05-24 14:26:08.983000',6.50,50.00,'DEBIT',NULL,'202518169825',0,NULL,NULL),(20,20.01,NULL,'2025-05-28 22:14:29.284000',2.99,23.00,'DEBIT',NULL,'202518169825',0,NULL,NULL),(21,20.01,NULL,'2025-05-28 22:33:15.197000',2.99,23.00,'DEBIT',NULL,'202518169825',0,NULL,NULL),(22,43.50,NULL,'2025-05-28 22:33:42.469000',6.50,50.00,'DEBIT',NULL,'202518169825',0,NULL,NULL),(23,22.62,NULL,'2025-05-28 22:33:53.033000',3.38,26.00,'DEBIT',NULL,'202518169825',0,NULL,NULL),(24,20.01,NULL,'2025-05-29 21:49:33.533000',2.99,23.00,'DEBIT',NULL,'202598515432',0,NULL,NULL),(25,0.00,NULL,'2025-05-30 00:48:16.869000',0.00,0.00,'DEBIT',NULL,'202518169825',0,NULL,NULL),(26,0.00,NULL,'2025-05-30 00:48:19.448000',0.00,0.00,'DEBIT',NULL,'202518169825',0,NULL,NULL),(27,20.01,NULL,'2025-05-30 11:32:41.026000',2.99,23.00,'DEBIT',NULL,'202548193361',0,NULL,NULL),(28,20.01,NULL,'2025-05-30 11:45:16.860000',2.99,23.00,'DEBIT',NULL,'202548193361',0,NULL,NULL),(29,20.01,NULL,'2025-05-30 11:45:22.668000',2.99,23.00,'TRANSFER',NULL,'202548193361',0,NULL,NULL),(30,22.62,NULL,'2025-05-30 12:07:30.803000',3.38,26.00,'DEBIT',NULL,'202518169825',0,NULL,NULL),(31,33.93,NULL,'2025-06-01 12:28:28.298000',5.07,39.00,'DEBIT',NULL,'202518169825',0,NULL,NULL),(32,22.62,NULL,'2025-06-01 12:28:39.435000',3.38,26.00,'TRANSFER',NULL,'202518169825',0,NULL,NULL),(33,0.00,NULL,'2025-06-15 21:11:39.804000',0.00,0.00,'CREDIT',NULL,'202518169825',0,'CREDIT',0.00),(34,0.00,NULL,'2025-06-15 22:18:14.900000',0.00,0.00,'CREDIT',NULL,'202518169825',0,'CREDIT',0.00);
/*!40000 ALTER TABLE `revenue` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `saving_pool`
--

DROP TABLE IF EXISTS `saving_pool`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `saving_pool` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_date` datetime(6) DEFAULT NULL,
  `total_amount` decimal(38,2) DEFAULT NULL,
  `version` bigint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `saving_pool`
--

LOCK TABLES `saving_pool` WRITE;
/*!40000 ALTER TABLE `saving_pool` DISABLE KEYS */;
/*!40000 ALTER TABLE `saving_pool` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `savings`
--

DROP TABLE IF EXISTS `savings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `savings` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `account_number` varchar(255) DEFAULT NULL,
  `balance` decimal(38,2) DEFAULT NULL,
  `deposit_time` datetime(6) DEFAULT NULL,
  `interest` decimal(38,2) DEFAULT NULL,
  `lock_period_days` int DEFAULT NULL,
  `saving_amount` decimal(38,2) DEFAULT NULL,
  `start_date` datetime(6) DEFAULT NULL,
  `tax` decimal(38,2) DEFAULT NULL,
  `transaction_id` varchar(255) DEFAULT NULL,
  `version` bigint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `savings`
--

LOCK TABLES `savings` WRITE;
/*!40000 ALTER TABLE `savings` DISABLE KEYS */;
INSERT INTO `savings` VALUES (1,'202518169825',2903.15,'2025-06-01 23:30:48.470474',NULL,300,2903.15,'2025-06-01 23:18:38.524104',0.00,'85d93a36-d64e-4a4d-ba3f-00dfbd80509d',5);
/*!40000 ALTER TABLE `savings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `system_attack_alert`
--

DROP TABLE IF EXISTS `system_attack_alert`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `system_attack_alert` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `attack_type` varchar(255) DEFAULT NULL,
  `detected_at` datetime(6) DEFAULT NULL,
  `originip` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `system_attack_alert`
--

LOCK TABLES `system_attack_alert` WRITE;
/*!40000 ALTER TABLE `system_attack_alert` DISABLE KEYS */;
/*!40000 ALTER TABLE `system_attack_alert` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `system_failure_alert`
--

DROP TABLE IF EXISTS `system_failure_alert`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `system_failure_alert` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `component` varchar(255) DEFAULT NULL,
  `failure_time` datetime(6) DEFAULT NULL,
  `failure_type` varchar(255) DEFAULT NULL,
  `impact` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `system_failure_alert`
--

LOCK TABLES `system_failure_alert` WRITE;
/*!40000 ALTER TABLE `system_failure_alert` DISABLE KEYS */;
/*!40000 ALTER TABLE `system_failure_alert` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `system_update_alert`
--

DROP TABLE IF EXISTS `system_update_alert`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `system_update_alert` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `applied_at` datetime(6) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `update_title` varchar(255) DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  `posted_by` bigint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `system_update_alert`
--

LOCK TABLES `system_update_alert` WRITE;
/*!40000 ALTER TABLE `system_update_alert` DISABLE KEYS */;
/*!40000 ALTER TABLE `system_update_alert` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `till`
--

DROP TABLE IF EXISTS `till`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `till` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `account_number` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `pin` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `till_balance` decimal(38,2) DEFAULT NULL,
  `till_name` varchar(255) DEFAULT NULL,
  `till_number` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `till`
--

LOCK TABLES `till` WRITE;
/*!40000 ALTER TABLE `till` DISABLE KEYS */;
/*!40000 ALTER TABLE `till` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaction_audit`
--

DROP TABLE IF EXISTS `transaction_audit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transaction_audit` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `amount` decimal(38,2) DEFAULT NULL,
  `from_account` varchar(255) DEFAULT NULL,
  `performed_by` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `timestamp` datetime(6) DEFAULT NULL,
  `to_account` varchar(255) DEFAULT NULL,
  `transaction_id` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction_audit`
--

LOCK TABLES `transaction_audit` WRITE;
/*!40000 ALTER TABLE `transaction_audit` DISABLE KEYS */;
INSERT INTO `transaction_audit` VALUES (1,400.00,'3320307','justinenjama33@gmail.com','SUCCESS','2025-06-15 21:11:52.109836','202519424221','41bd5d4e-fc98-4590-937a-6ce9d4ac3b16','DEPOSIT'),(2,5000.00,'3320307','justinenjama33@gmail.com','SUCCESS','2025-06-15 22:18:24.599007','202583008187','47afff18-6f0e-4a4b-866a-48fafd44b6cd','DEPOSIT');
/*!40000 ALTER TABLE `transaction_audit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaction_history`
--

DROP TABLE IF EXISTS `transaction_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transaction_history` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `transaction_type` varchar(255) DEFAULT NULL,
  `transaction_cost` decimal(38,2) DEFAULT NULL,
  `transaction_amount` decimal(38,2) DEFAULT NULL,
  `account_number` varchar(255) DEFAULT NULL,
  `transaction_date` datetime(6) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `transaction_id` varchar(255) DEFAULT NULL,
  `version` bigint DEFAULT NULL,
  `merchant` varchar(255) DEFAULT NULL,
  `merchant_latitude` double NOT NULL,
  `merchant_longitude` double NOT NULL,
  `user_latitude` double NOT NULL,
  `user_longitude` double NOT NULL,
  `is_anomaly` bit(1) DEFAULT NULL,
  `approved_at` datetime(6) DEFAULT NULL,
  `approved_by_admin_id` bigint DEFAULT NULL,
  `ref_number` varchar(255) DEFAULT NULL,
  `transaction_method` varchar(255) DEFAULT NULL,
  `rejected_by_admin_id` bigint DEFAULT NULL,
  `rejected_at` datetime(6) DEFAULT NULL,
  `approved_by` bigint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=94 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction_history`
--

LOCK TABLES `transaction_history` WRITE;
/*!40000 ALTER TABLE `transaction_history` DISABLE KEYS */;
INSERT INTO `transaction_history` VALUES (1,'CREDIT',0.00,23.00,'202518169825','2025-05-10 08:01:00.000000','COMPLETED','4fb1e6fe-3ec5-11f0-824c-f43909e02553',1,'UNKNOWN',1.251,36.801,1.001,36.601,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(2,'CREDIT',0.00,23.00,'202518169825','2025-05-10 08:02:00.000000','COMPLETED','4fb1ef32-3ec5-11f0-824c-f43909e02553',1,'UNKNOWN',1.252,36.802,1.002,36.602,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(3,'CREDIT',0.00,1003.00,'202518169825','2025-05-10 08:03:00.000000','COMPLETED','4fb1f117-3ec5-11f0-824c-f43909e02553',1,'UNKNOWN',1.253,36.803,1.003,36.603,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(4,'DEBIT',23.00,100.00,'202518169825','2025-05-15 09:48:34.439000','COMPLETED','4fb1f283-3ec5-11f0-824c-f43909e02553',1,'UNKNOWN',1.254,36.804,1.004,36.604,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(5,'DEBIT',23.00,100.00,'202518169825','2025-05-15 09:55:25.762000','COMPLETED','4fb1f3e2-3ec5-11f0-824c-f43909e02553',1,'UNKNOWN',1.255,36.805,1.005,36.605,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(6,'DEBIT',23.00,100.00,'202518169825','2025-05-15 09:58:14.747000','COMPLETED','4fb1f52f-3ec5-11f0-824c-f43909e02553',1,'UNKNOWN',1.256,36.806,1.006,36.606,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(7,'DEBIT',0.00,3.00,'202518169825','2025-05-16 13:09:28.098000','COMPLETED','4fb1f67c-3ec5-11f0-824c-f43909e02553',1,'UNKNOWN',1.257,36.807,1.007,36.607,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(8,'CREDIT',0.00,3.00,'202545018355','2025-05-16 13:09:28.098000','COMPLETED','4fb1f7d7-3ec5-11f0-824c-f43909e02553',1,'UNKNOWN',1.258,36.808,1.008,36.608,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(9,'DEBIT',0.00,3.00,'202518169825','2025-05-16 13:10:12.612000','COMPLETED','4fb1fc2f-3ec5-11f0-824c-f43909e02553',1,'UNKNOWN',1.259,36.809,1.009,36.609,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(10,'CREDIT',0.00,3.00,'202545018355','2025-05-16 13:10:12.612000','COMPLETED','4fb1fdde-3ec5-11f0-824c-f43909e02553',1,'UNKNOWN',1.26,36.81,1.01,36.61,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(11,'DEBIT',0.00,3.00,'202518169825','2025-05-16 13:10:16.325000','COMPLETED','4fb1ff27-3ec5-11f0-824c-f43909e02553',1,'UNKNOWN',1.261,36.811,1.011,36.611,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(12,'CREDIT',0.00,3.00,'202545018355','2025-05-16 13:10:16.325000','COMPLETED','4fb200ae-3ec5-11f0-824c-f43909e02553',1,'UNKNOWN',1.262,36.812,1.012,36.612,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(13,'DEBIT',0.00,3.00,'202518169825','2025-05-16 13:10:19.055000','COMPLETED','4fb20201-3ec5-11f0-824c-f43909e02553',1,'UNKNOWN',1.263,36.813,1.013,36.613,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(14,'CREDIT',0.00,3.00,'202545018355','2025-05-16 13:10:19.055000','COMPLETED','4fb2034a-3ec5-11f0-824c-f43909e02553',1,'UNKNOWN',1.264,36.814,1.014,36.614,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(15,'DEBIT',0.00,3.00,'202518169825','2025-05-16 13:10:37.578000','COMPLETED','4fb2049f-3ec5-11f0-824c-f43909e02553',1,'UNKNOWN',1.265,36.815,1.015,36.615,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(16,'CREDIT',0.00,3.00,'202545018355','2025-05-16 13:10:37.578000','COMPLETED','4fb205f2-3ec5-11f0-824c-f43909e02553',1,'UNKNOWN',1.266,36.816,1.016,36.616,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(17,'TRANSFER',0.00,3.00,'202518169825','2025-05-17 18:33:37.020000','COMPLETED','bd0e0da8-e425-4cd1-b417-3c0681a070e0',1,'UNKNOWN',1.267,36.817,1.017,36.617,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(18,'DEBIT',0.00,3.00,'202518169825','2025-05-17 18:33:37.475000','COMPLETED','4fb20752-3ec5-11f0-824c-f43909e02553',1,'UNKNOWN',1.268,36.818,1.018,36.618,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(19,'CREDIT',0.00,3.00,'202545018355','2025-05-17 18:33:38.207000','COMPLETED','4fb2089e-3ec5-11f0-824c-f43909e02553',1,'UNKNOWN',1.269,36.819,1.019,36.619,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(20,'TRANSFER',0.00,3.00,'202518169825','2025-05-17 18:33:42.048000','COMPLETED','e0f50060-5af5-419d-b577-f443fe99ec02',1,'UNKNOWN',1.27,36.82,1.02,36.62,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(21,'DEBIT',0.00,3.00,'202518169825','2025-05-17 18:33:42.290000','COMPLETED','4fb20a49-3ec5-11f0-824c-f43909e02553',1,'UNKNOWN',1.271,36.821,1.021,36.621,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(22,'CREDIT',0.00,3.00,'202545018355','2025-05-17 18:33:42.512000','COMPLETED','4fb20b97-3ec5-11f0-824c-f43909e02553',1,'UNKNOWN',1.272,36.822,1.022,36.622,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(23,'TRANSFER',0.00,3.00,'202518169825','2025-05-17 18:33:44.743000','COMPLETED','0b1a30d5-a971-43bd-b506-59dc8f9db16d',1,'UNKNOWN',1.273,36.823,1.023,36.623,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(24,'DEBIT',0.00,3.00,'202518169825','2025-05-17 18:33:44.963000','COMPLETED','4fb20d11-3ec5-11f0-824c-f43909e02553',1,'UNKNOWN',1.274,36.824,1.024,36.624,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(25,'CREDIT',0.00,3.00,'202545018355','2025-05-17 18:33:45.259000','COMPLETED','4fb20e70-3ec5-11f0-824c-f43909e02553',1,'UNKNOWN',1.275,36.825,1.025,36.625,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(26,'TRANSFER',0.00,1.00,'202518169825','2025-05-17 18:34:54.046000','COMPLETED','128c1eb4-382d-4b14-baac-e58b44cd7e77',1,'UNKNOWN',1.276,36.826,1.026,36.626,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(27,'DEBIT',0.00,1.00,'202518169825','2025-05-17 18:34:55.054000','COMPLETED','4fb20fcf-3ec5-11f0-824c-f43909e02553',1,'UNKNOWN',1.277,36.827,1.027,36.627,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(28,'CREDIT',0.00,1.00,'202545018355','2025-05-17 18:34:55.370000','COMPLETED','4fb21119-3ec5-11f0-824c-f43909e02553',1,'UNKNOWN',1.278,36.828,1.028,36.628,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(29,'TRANSFER',0.00,0.00,'202518169825','2025-05-17 18:35:24.597000','COMPLETED','0547f441-8ae2-4b16-a35f-122fac1ac451',2,'UNKNOWN',1.279,36.829,1.029,36.629,_binary '','2025-06-01 23:30:48.470474',1,NULL,NULL,NULL,NULL,NULL),(30,'TRANSFER',-0.05,-1.00,'202518169825','2025-05-17 18:35:35.566000','COMPLETED','8c5ef522-8590-47cb-a778-bf3ffa0f30f0',2,'UNKNOWN',1.28,36.83,1.03,36.63,_binary '','2025-06-01 23:21:23.804842',1,NULL,NULL,NULL,NULL,NULL),(31,'TRANSFER',-0.05,-1.00,'202518169825','2025-05-17 18:35:37.468000','COMPLETED','22404ebf-ca70-4346-87e8-c50f67ec1ca3',2,'UNKNOWN',1.281,36.831,1.031,36.631,_binary '','2025-06-01 23:22:13.123210',1,NULL,NULL,NULL,NULL,NULL),(32,'TRANSFER',-0.05,-1.00,'202518169825','2025-05-17 18:39:43.768000','COMPLETED','e9cd57ce-b559-4366-b8a5-01c6ef0a7649',2,'UNKNOWN',1.282,36.832,1.032,36.632,_binary '','2025-06-01 23:21:14.174548',1,NULL,NULL,NULL,NULL,NULL),(33,'TRANSFER',0.00,1.00,'202518169825','2025-05-17 18:44:50.563000','COMPLETED','66e72c5c-bfc9-4daf-90ca-22aa55d9f010',1,'UNKNOWN',1.283,36.833,1.033,36.633,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(34,'DEBIT',0.00,1.00,'202518169825','2025-05-17 18:44:50.869000','COMPLETED','4fb212c7-3ec5-11f0-824c-f43909e02553',1,'UNKNOWN',1.284,36.834,1.034,36.634,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(35,'CREDIT',0.00,1.00,'202545018355','2025-05-17 18:44:53.679000','COMPLETED','4fb216e2-3ec5-11f0-824c-f43909e02553',1,'UNKNOWN',1.285,36.835,1.035,36.635,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(36,'CREDIT',0.00,23.00,'202518169825','2025-05-17 18:46:49.621000','COMPLETED','4fb21830-3ec5-11f0-824c-f43909e02553',1,'UNKNOWN',1.286,36.836,1.036,36.636,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(37,'CREDIT',0.00,4000.00,'202518169825','2025-05-17 18:46:58.664000','COMPLETED','4fb219c6-3ec5-11f0-824c-f43909e02553',1,'UNKNOWN',1.287,36.837,1.037,36.637,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(38,'CREDIT',0.00,5000.00,'202545018355','2025-05-17 18:47:21.156000','COMPLETED','4fb21b1a-3ec5-11f0-824c-f43909e02553',1,'UNKNOWN',1.288,36.838,1.038,36.638,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(39,'CREDIT',0.00,15000.00,'202574069698','2025-05-17 18:47:39.528000','COMPLETED','4fb21c87-3ec5-11f0-824c-f43909e02553',1,'UNKNOWN',1.289,36.839,1.039,36.639,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(40,'CREDIT',0.00,44000.00,'202566997697','2025-05-17 18:48:15.036000','COMPLETED','4fb21dd9-3ec5-11f0-824c-f43909e02553',1,'UNKNOWN',1.29,36.84,1.04,36.64,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(41,'TRANSFER',23.00,400.00,'202518169825','2025-05-17 18:49:08.933000','COMPLETED','17b20a2f-6405-421a-8b91-b329c5fe6438',1,'UNKNOWN',1.291,36.841,1.041,36.641,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(42,'DEBIT',23.00,423.00,'202518169825','2025-05-17 18:49:09.220000','COMPLETED','4fb21f32-3ec5-11f0-824c-f43909e02553',1,'UNKNOWN',1.292,36.842,1.042,36.642,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(43,'CREDIT',0.00,400.00,'202545018355','2025-05-17 18:49:09.838000','COMPLETED','4fb22077-3ec5-11f0-824c-f43909e02553',1,'UNKNOWN',1.293,36.843,1.043,36.643,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(44,'CREDIT',0.00,4000.00,'202518169825','2025-05-24 14:10:10.573000','COMPLETED','51e0d7a3-7cdb-4bdc-bdf2-c7edc3440a47',0,'UNKNOWN',1.294,36.844,1.044,36.644,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(45,'CREDIT',0.00,4000.00,'202518169825','2025-05-24 14:10:19.651000','COMPLETED','7f56eb59-19de-459b-bb24-4aee2c2b1ea6',0,'UNKNOWN',1.295,36.845,1.045,36.645,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(46,'CREDIT',0.00,4000.00,'202518169825','2025-05-24 14:11:01.197000','COMPLETED','09853509-2c6c-4b37-b571-f8e63903e9cc',0,'UNKNOWN',1.296,36.846,1.046,36.646,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(47,'CREDIT',0.00,4000.00,'202518169825','2025-05-24 14:11:24.484000','COMPLETED','8b1bb1b7-754d-49dc-98dc-13a6761ee0b5',0,'UNKNOWN',1.297,36.847,1.047,36.647,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(48,'CREDIT',0.00,4000.00,'202518169825','2025-05-24 14:14:57.775000','COMPLETED','7792e278-d9df-4f04-9831-221dd1f13e85',0,'UNKNOWN',1.298,36.848,1.048,36.648,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(49,'CREDIT',0.00,4000.00,'202518169825','2025-05-24 14:15:09.921000','COMPLETED','5c81358c-e77f-43bf-aba3-21df528ca50d',0,'UNKNOWN',1.299,36.849,1.049,36.649,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(50,'CREDIT',0.00,4000.00,'202518169825','2025-05-24 14:22:09.295000','COMPLETED','34126bf3-a475-4b71-8dd2-056ced56acf9',0,'UNKNOWN',1.3,36.85,1.05,36.65,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(51,'DEBIT',50.00,4000.00,'202518169825','2025-05-24 14:23:58.094000','COMPLETED','ea8f8d19-2f67-4dd7-bf1d-e0557147574b',0,'UNKNOWN',1.301,36.851,1.051,36.651,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(52,'DEBIT',50.00,4000.00,'202518169825','2025-05-24 14:25:18.714000','COMPLETED','fe7a3daf-3f24-45e9-a8d9-25a3d6976908',0,'UNKNOWN',1.302,36.852,1.052,36.652,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(53,'DEBIT',23.00,400.00,'202518169825','2025-05-24 14:25:39.148000','COMPLETED','ac2d7d8a-c7fa-478f-9aca-87c1f8dc439e',0,'UNKNOWN',1.303,36.853,1.053,36.653,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(54,'DEBIT',50.00,3000.00,'202518169825','2025-05-24 14:25:56.195000','COMPLETED','aeac68cb-ce51-49b4-b489-18a80867c766',0,'UNKNOWN',1.304,36.854,1.054,36.654,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(55,'DEBIT',50.00,4000.00,'202518169825','2025-05-24 14:26:09.106000','COMPLETED','935e9715-cc3a-4589-b4ec-d8bb658fa392',0,'UNKNOWN',1.305,36.855,1.055,36.655,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(56,'SAVING',140.00,16043.00,'202518169825','2025-05-24 14:40:09.537000','COMPLETED','9cdd913f-1695-4ec5-bbf6-a539ac0d70f4',0,'UNKNOWN',1.306,36.856,1.056,36.656,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(57,'SAVING',140.00,16043.00,'202518169825','2025-05-24 14:42:31.728000','COMPLETED','fd796cd9-8d23-4354-b4eb-6816d7cb74ad',0,'UNKNOWN',1.307,36.857,1.057,36.657,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(58,'CREDIT',0.00,4000.00,'202518169825','2025-05-27 11:27:48.630000','COMPLETED','a9398fc5-9304-429b-988b-84f2d4c4e7e5',0,'UNKNOWN',1.308,36.858,1.058,36.658,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(59,'CREDIT',0.00,4000.00,'202518169825','2025-05-27 11:29:48.572000','COMPLETED','66d0674b-f501-416c-b555-f3c80c31d03b',0,'UNKNOWN',1.309,36.859,1.059,36.659,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(60,'CREDIT',0.00,4000.00,'202518169825','2025-05-27 16:08:57.898000','COMPLETED','f9a56f19-88a7-4070-855e-1d397df92673',0,'UNKNOWN',1.31,36.86,1.06,36.66,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(61,'CREDIT',0.00,3200.00,'202518169825','2025-05-28 22:13:52.759000','COMPLETED','c3e3833d-f52e-4127-8a66-18ea18304d00',0,'UNKNOWN',1.311,36.861,1.061,36.661,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(62,'DEBIT',23.00,200.00,'202518169825','2025-05-28 22:14:31.215000','COMPLETED','ea936ad5-844c-4c43-af9b-b62532277944',0,'UNKNOWN',1.312,36.862,1.062,36.662,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(63,'DEBIT',23.00,333.00,'202518169825','2025-05-28 22:33:15.723000','COMPLETED','3b40a621-3376-49d7-a909-dd75de9bb334',0,'UNKNOWN',1.313,36.863,1.063,36.663,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(64,'DEBIT',50.00,4567.00,'202518169825','2025-05-28 22:33:42.653000','COMPLETED','be0ae48a-5d7a-4161-9367-7a15bcd55cc1',0,'UNKNOWN',1.314,36.864,1.064,36.664,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(65,'DEBIT',26.00,567.00,'202518169825','2025-05-28 22:33:53.239000','COMPLETED','78288a21-ed2f-44b3-9cc3-c9959881f73f',0,'UNKNOWN',1.315,36.865,1.065,36.665,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(66,'CREDIT',0.00,3456.00,'202598515432','2025-05-29 21:48:54.161000','COMPLETED','fc96e323-febb-423e-a9fa-2c2ae8efe9af',0,'UNKNOWN',1.316,36.866,1.066,36.666,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(67,'DEBIT',23.00,400.00,'202598515432','2025-05-29 21:49:34.487000','COMPLETED','3c356aa5-1256-4b57-b662-94d174fffa0a',0,'UNKNOWN',1.317,36.867,1.067,36.667,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(68,'DEBIT',0.00,12.00,'202518169825','2025-05-30 00:48:17.773000','COMPLETED','5ca32537-6788-4a0a-a888-9e55a28249c3',0,'UNKNOWN',1.318,36.868,1.068,36.668,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(69,'DEBIT',0.00,12.00,'202518169825','2025-05-30 00:48:19.767000','COMPLETED','8a25dcee-965f-44ef-a56e-d3c2b7db3ce2',0,'UNKNOWN',1.319,36.869,1.069,36.669,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(70,'CREDIT',0.00,2000.00,'202548193361','2025-05-30 11:31:57.042000','COMPLETED','0b49b4ba-0501-4136-95f2-afa46feac8f9',0,'UNKNOWN',1.32,36.87,1.07,36.67,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(71,'DEBIT',23.00,200.00,'202548193361','2025-05-30 11:32:41.711000','COMPLETED','965045e2-6294-4cb1-83f8-c63fdaa50485',0,'UNKNOWN',1.321,36.871,1.071,36.671,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(72,'TRANSFER',23.00,400.00,'202548193361','2025-05-30 11:45:15.283000','COMPLETED','d60d1723-cb1c-45d2-a1b1-6f00f5219848',0,'UNKNOWN',1.322,36.872,1.072,36.672,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(73,'DEBIT',23.00,423.00,'202548193361','2025-05-30 11:45:18.062000','COMPLETED','e7dccc02-aa22-442d-bf6f-e06a2e0db2fa',0,'UNKNOWN',1.323,36.873,1.073,36.673,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(74,'CREDIT',0.00,400.00,'202591325748','2025-05-30 11:45:20.195000','COMPLETED','14a66191-b67b-47bf-8702-8b2c793d5156',0,'UNKNOWN',1.324,36.874,1.074,36.674,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(75,'DEBIT',26.00,567.00,'202518169825','2025-05-30 12:07:31.684000','COMPLETED','36c7fe3d-1bca-4278-ad51-ad4a3fe91b35',0,'UNKNOWN',1.325,36.875,1.075,36.675,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(76,'CREDIT',0.00,200.00,'202566997697','2025-06-01 12:10:02.330000','COMPLETED','f3c1fd05-8db6-4f88-b638-e4e1c1d3d300',0,NULL,0,0,0,0,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(77,'CREDIT',0.00,3000.00,'202518169825','2025-06-01 12:17:34.125000','COMPLETED','ef3cb135-ca41-43af-bf5c-226c418363bf',0,NULL,0,0,0,0,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(78,'CREDIT',0.00,20100.00,'202566997697','2025-06-01 12:18:30.886000','COMPLETED','499fd15d-f9f5-445b-9f21-627ab3276ec8',0,NULL,0,0,0,0,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(79,'TRANSFER',26.00,1000.00,'202518169825','2025-06-01 12:28:27.780000','COMPLETED','30f14cfd-93b4-47b4-8224-28411fc6ea00',0,NULL,0,0,0,0,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(80,'DEBIT',39.00,1026.00,'202518169825','2025-06-01 12:28:30.261000','COMPLETED','9156b33d-4662-4668-ab35-4376d6170245',0,NULL,0,0,0,0,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(81,'CREDIT',0.00,1000.00,'202586547861','2025-06-01 12:28:34.207000','COMPLETED','6a89bea6-ece0-43f1-82f9-ac351dd11a87',0,NULL,0,0,0,0,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(82,'SAVING',0.00,12.00,'202518169825',NULL,'COMPLETED','4c57c040-4bf3-46f7-a3d7-105a61b1cfd4',0,NULL,0,0,0,0,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(83,'WITHDRAWAL_REQUEST',0.00,6000.00,'202518169825',NULL,'PENDING','5a4c74a3-ec84-472c-aee0-dc42f56bc0d1',0,NULL,0,0,0,0,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(84,'SAVING',0.00,500.00,'202518169825',NULL,'COMPLETED','f2cba232-5831-4310-92b7-e4145b152145',0,NULL,0,0,0,0,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(85,'WITHDRAWAL_REQUEST',0.00,6000.00,'202518169825',NULL,'PENDING','1c636901-7905-422c-88f1-9d2bff51791c',0,NULL,0,0,0,0,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(86,'SAVING',0.00,5000.00,'202518169825',NULL,'COMPLETED','85d93a36-d64e-4a4d-ba3f-00dfbd80509d',0,NULL,0,0,0,0,_binary '\0',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(87,'WITHDRAWAL_REQUEST',100.00,2000.00,'202518169825',NULL,'COMPLETED','db0630df-c0d1-4945-933d-3cbdd3dff154',1,NULL,0,0,0,0,_binary '\0','2025-06-01 23:19:31.549525',1,NULL,NULL,NULL,NULL,NULL),(88,'TRANSFER',50.00,2500.00,'202518169825','2025-06-15 15:39:07.984000','PENDING','bb36bd82-3391-4d8e-9e6f-c094027ea7b1',0,'202519424221',0,0,0,0,_binary '\0',NULL,NULL,'N9UAA0FW','MOBILE',NULL,NULL,NULL),(89,'TRANSFER',50.00,2500.00,'202518169825','2025-06-15 15:40:22.085000','COMPLETED','f5a69015-b1b8-4a42-808e-ccdc6bde0e64',1,'202518169825',0,0,0,0,_binary '\0','2025-06-15 22:10:01.438496',NULL,'1W44RKJW','MOBILE',NULL,NULL,1),(90,'TRANSFER',50.00,2500.00,'202518169825','2025-06-15 15:41:51.979000','COMPLETED','236d0deb-2615-4e35-ba26-c6e25894d297',1,'202518169825',0,0,0,0,_binary '\0','2025-06-15 22:09:41.281580',NULL,'IGYJR5Z6','MOBILE',NULL,NULL,1),(91,'TRANSFER',50.00,2500.00,'202518169825','2025-06-15 15:42:20.125000','COMPLETED','fb518bf2-086d-44e5-a5f4-66242e9395f6',1,'202519424221',0,0,0,0,_binary '\0','2025-06-15 16:00:55.665882',NULL,'IUTG3I1C','MOBILE',NULL,NULL,1),(92,'DEPOSIT',0.00,400.00,'202519424221','2025-06-15 21:11:43.269000','COMPLETED','41bd5d4e-fc98-4590-937a-6ce9d4ac3b16',0,'202519424221',0,0,0,0,_binary '\0',NULL,NULL,'E2RBL13O','CASH',NULL,NULL,NULL),(93,'DEPOSIT',0.00,5000.00,'202583008187','2025-06-15 22:18:15.069000','COMPLETED','47afff18-6f0e-4a4b-866a-48fafd44b6cd',0,'202583008187',0,0,0,0,_binary '\0',NULL,NULL,'ESBCLRTX','CASH',NULL,NULL,NULL);
/*!40000 ALTER TABLE `transaction_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trusted_device`
--

DROP TABLE IF EXISTS `trusted_device`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trusted_device` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `device_id` varchar(255) DEFAULT NULL,
  `ip` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `trusted_at` datetime(6) DEFAULT NULL,
  `user_agent` varchar(1024) DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKi6tr061nm8g56harwpy3wss88` (`user_id`),
  CONSTRAINT `FKi6tr061nm8g56harwpy3wss88` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trusted_device`
--

LOCK TABLES `trusted_device` WRITE;
/*!40000 ALTER TABLE `trusted_device` DISABLE KEYS */;
INSERT INTO `trusted_device` VALUES (1,'dabdf2e4264a594d66e1b5a646fbd12e97cc753a70c8bdd6c20b95cf1aa92491','0:0:0:0:0:0:0:1','location unavailable','2025-06-12 17:43:00.371911','PostmanRuntime/7.44.0',1),(2,'953011c601fc684a8ae57b3b212bd1b00c788d66c7e912c3a9c366b78b132525','0:0:0:0:0:0:0:1','location unavailable','2025-06-13 11:51:19.799563','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36',1),(3,'26dfa53efeea01f1fbfbcaae9bf8e88de67a369e30b6a4e23e8f8f248768bd7d','0:0:0:0:0:0:0:1','location unavailable','2025-06-13 12:06:13.226620','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 Edg/137.0.0.0',1),(4,'26dfa53efeea01f1fbfbcaae9bf8e88de67a369e30b6a4e23e8f8f248768bd7d','0:0:0:0:0:0:0:1','location unavailable','2025-06-14 20:22:43.939366','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 Edg/137.0.0.0',15),(5,'26dfa53efeea01f1fbfbcaae9bf8e88de67a369e30b6a4e23e8f8f248768bd7d','0:0:0:0:0:0:0:1','location unavailable','2025-06-14 20:27:32.980997','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 Edg/137.0.0.0',2),(6,'47d9decba3e30f82eebea1c496ec252b97bca33dece71bcc2398c5a5e846e576','0:0:0:0:0:0:0:1','location unavailable','2025-06-15 11:59:07.118384','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36',1);
/*!40000 ALTER TABLE `trusted_device` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `account_balance` decimal(38,2) DEFAULT NULL,
  `account_number` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `alternative_phone_number` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `failed_login_attempts` int NOT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `last_activity_time` datetime(6) DEFAULT NULL,
  `last_known_location` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `other_name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `pin` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `session_status` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `version` bigint DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `job` varchar(255) DEFAULT NULL,
  `latitude` double NOT NULL,
  `longitude` double NOT NULL,
  `date_of_birth` datetime(6) DEFAULT NULL,
  `merchant` varchar(255) DEFAULT NULL,
  `pay_bill_number` varchar(255) DEFAULT NULL,
  `till_number` varchar(255) DEFAULT NULL,
  `next_of_kin` varchar(255) DEFAULT NULL,
  `next_of_kin_relationship` varchar(255) DEFAULT NULL,
  `district` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `national_identity_card_number` int NOT NULL,
  `sub_location` varchar(255) DEFAULT NULL,
  `agent_balance` decimal(38,2) DEFAULT NULL,
  `agent_number` varchar(255) DEFAULT NULL,
  `failed_pin_attempts` int NOT NULL,
  `pay_bill_balance` decimal(38,2) DEFAULT NULL,
  `till_balance` decimal(38,2) DEFAULT NULL,
  `account_locked_at` datetime(6) DEFAULT NULL,
  `notify_on_login` bit(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,7667.00,'202518169825','27, Paris','+254707838361','France','justinenjama33@gmail.com',0,'justine','male','2025-06-15 22:31:06.663000','location unavailable','stanslous','njama','$2a$10$vcwexiEJ4b7aCUaDdwjtPO1vRLzUGaCIOgE.EiloJgp1ICz51SgSW','+254704269165','7915','ADMIN','ONLINE','ACTIVE',NULL,NULL,NULL,NULL,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,0,NULL,NULL,NULL,_binary '\0'),(2,5425.00,'202545018355','53, Msumarini','+254707838361','Kenya','masikanjama@gmail.com',0,'masika','female','2025-06-14 20:45:59.682000','location unavailable','njama','chisiwa','$2a$10$Pf52ebcqwZvAHqGrckAview8tUoZ3Dr3uuvrYddooxVxDa2a1w.CG','+254712356791','3075','USER','OFFLINE','ACTIVE',NULL,NULL,NULL,NULL,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,0,NULL,NULL,NULL,_binary '\0'),(3,15000.00,'202574069698','14, MOgadishu','+254707838361','Somalia','riocoolnjama@gmail.com',0,'riocool','male','2025-05-28 13:30:30.933000','location unavailable','njama','pixie','$2a$10$02iy./8kwiuii7rUD3gbhupkLFapSm5Ilw8beuss1mj9OdWKVLRH2','+254733889912','3231','USER','OFFLINE','ACTIVE',NULL,NULL,NULL,NULL,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,0,NULL,NULL,NULL,_binary '\0'),(4,64300.00,'202566997697','23, Dodoma','+254707838361','Tanzania','malikiauchi@gmail.com',0,'malikia','female',NULL,NULL,'ngala','uchi','$2a$10$fIbVfL3RrSwLmWD0jLfEx.bfbYp/cmeDPcsfva289Xev7Mc8LkUAG','+254709094514','8033','USER',NULL,'ACTIVE',NULL,NULL,NULL,NULL,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,0,NULL,NULL,NULL,_binary '\0'),(5,3033.00,'202598515432','53 Gongoni','+250704269165','Kenya','masikanjama44@gmail.com',0,'Justine','MALE',NULL,NULL,'Stanslous','Njama','$2a$10$MgPyMevy3k52c1Tvrzg0r.mloKc9vL2w6B8IlWl0VzASP1WmMyHwi','+254704269166','4399','USER',NULL,'ACTIVE','2025-05-27 21:32:30.575000',NULL,NULL,NULL,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,0,NULL,NULL,NULL,_binary '\0'),(6,0.00,'202550822568','23, Kampala','+256704269165','Uganda','henrymungomambavu23@gmail.com',0,'Henry','MALE',NULL,NULL,'Mungoma','Ngala','$2a$10$Q1bS1cJ8nkHbXBfHZerdHecR9UoLSR.ijJNvjIHP4TtCI7M4JH2rW','+256746449715','3430','USER',NULL,'ACTIVE','2025-05-27 21:37:37.850000',NULL,NULL,NULL,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,0,NULL,NULL,NULL,_binary '\0'),(7,0.00,'202578578962','45 Kilifi','+254704269165','Kenya','mourinemunyazi4567@gmail.com',0,'mourine','MALE',NULL,NULL,'ngala','mnyazi','$2a$10$rXdsHwogd0pd6vUsehJ.zezPqZPVOU9qT6HpJvT1w.taRfEkAXSAK','+254718155007','2315','USER',NULL,'ACTIVE','2025-05-27 21:42:42.000000',NULL,NULL,NULL,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,0,NULL,NULL,NULL,_binary '\0'),(8,5000.00,'202583008187','46 Nairobi','+254798989898','Kenya','mujokachatu34@gmail.com',0,'mujoka','MALE',NULL,NULL,'python','chatu','$2a$10$yqmuMZOBGO/6vL53UJAQwOpqaAt0LJcsntoBtL0xRUqTLdjJzyJam','+254789898989','5206','USER',NULL,'ACTIVE','2025-05-27 21:47:45.529000',NULL,NULL,NULL,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,0,NULL,NULL,NULL,_binary '\0'),(9,0.00,'202536224517','45 Naivasha','+2547895656565','Kenya','nininini@gmail.com',0,'Justine','MALE',NULL,NULL,'Stanslous','Njama','$2a$10$hWu8T/0AZ6WQg.86jCqO1OWoT3BS4AevZukRCnR4GbrClTRyRziZK','+2547656565656','2470','USER',NULL,'ACTIVE','2025-05-27 21:52:17.381000',NULL,NULL,NULL,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,0,NULL,NULL,NULL,_binary '\0'),(10,0.00,'202570071069','56 kisumu','+254704269165','Kenya','nn@gmail.com',0,'nn','MALE',NULL,NULL,'nn','nn','$2a$10$nzn.frULnMZAExWOmZdC0OePNNMh9uQsuBsX8oJ8ixdji9Q9kpx9C','+254789789213','4145','USER',NULL,'ACTIVE','2025-05-27 21:57:54.916000',NULL,NULL,NULL,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,0,NULL,NULL,NULL,_binary '\0'),(11,0.00,'202538655403','23 Kijiji','+250704269165','Rwanda','nhnhyu#@gmail.com',0,'Justine','FEMALE',NULL,NULL,'Stanslous','Njama','$2a$10$9GWScT48r3yIjD6eGZvus.hwVDbbqfay7Dyc0jZBBd2FdPOqvy40y','+250704269165','1313','USER',NULL,'ACTIVE','2025-05-27 22:03:09.472000',NULL,NULL,NULL,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,0,NULL,NULL,NULL,_binary '\0'),(12,400.00,'202591325748','65 Mombasa','+254704269165','Kenya','sgshdjhafat@gmail.com',0,'Justine','FEMALE',NULL,NULL,'Stanslous','Njama','$2a$10$YCT9umqzzPUrlg0NWkL0yucgaYwN26dFD7y.6iVxNaQ6uPMk5/8XS','+254766666666','9166','USER',NULL,'ACTIVE','2025-05-27 22:11:08.830000',NULL,NULL,NULL,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,0,NULL,NULL,NULL,_binary '\0'),(13,1000.00,'202586547861','12 Adis Ababa','+251704269165','Ethiopia','b@gmail.com',0,'b','MALE',NULL,NULL,'b','b','$2a$10$HUx4/a/eo8cjgz/PBv1A..hm/HuIPlNPsoxebFnD7QB/z15pI4zLi','+251799999999','9093','USER',NULL,'ACTIVE','2025-05-27 22:14:02.643000',NULL,NULL,NULL,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,0,NULL,NULL,NULL,_binary '\0'),(14,1331.00,'202548193361','23 Rwanda','+254704269168','Rwanda','bndgdd@go.ke',1,'vbvbv','OTHER',NULL,NULL,'bvbv','bvnm','$2a$10$2kyH2bqleRKg9aWcftHFM.hpLc8JrUAj1e8kYTk0AwCtIGGRt4uCq','+250704269168','1861','USER',NULL,'ACTIVE','2025-05-27 22:25:07.673000',NULL,NULL,NULL,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,0,NULL,NULL,NULL,_binary '\0'),(15,2900.00,'202519424221','54-892345','+254709891237','Kenya','riocoolnjama9@gmail.com',0,'njama','male','2025-06-14 23:20:08.244000','location unavailable','ngala','mungoma','$2a$10$LSx8EWpsOBmUBJIz/05/w.Ih528gPnfTq/PN.Vk1cM32fOuFG4dIi','+254799989195','$2a$10$.5UzDOQC2vMtzrT20q.Fb.F560HcxWX6pMzncX2dS9WS7yyHwRWqS','ADMIN','OFFLINE','ACTIVE','2025-06-14 20:14:25.304948',NULL,'Malindi','Electric Engineer',0,0,'2000-06-07 00:00:00.000000',NULL,NULL,NULL,'masika njama','mother','Magarini','Fundissa',0,'Marereni',NULL,NULL,0,NULL,NULL,NULL,_binary '');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `withdrawal_request`
--

DROP TABLE IF EXISTS `withdrawal_request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `withdrawal_request` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `account_number` varchar(255) DEFAULT NULL,
  `approval_date` datetime(6) DEFAULT NULL,
  `approved_by_admin_id` bigint DEFAULT NULL,
  `penalty_amount` decimal(38,2) DEFAULT NULL,
  `request_date` datetime(6) DEFAULT NULL,
  `requested_amount` decimal(38,2) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `withdrawal_request`
--

LOCK TABLES `withdrawal_request` WRITE;
/*!40000 ALTER TABLE `withdrawal_request` DISABLE KEYS */;
/*!40000 ALTER TABLE `withdrawal_request` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-15 23:51:07
