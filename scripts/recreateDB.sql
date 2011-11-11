-- MySQL dump 10.13  Distrib 5.1.48, for apple-darwin10.3.0 (i386)
--
-- Host: localhost    Database: mydb
-- ------------------------------------------------------
-- Server version	5.1.48

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cash`
--

DROP TABLE IF EXISTS `cash`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cash` (
  `cash_id` int(11) NOT NULL,
  PRIMARY KEY (`cash_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cash`
--

LOCK TABLES `cash` WRITE;
/*!40000 ALTER TABLE `cash` DISABLE KEYS */;
/*!40000 ALTER TABLE `cash` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `equity`
--

DROP TABLE IF EXISTS `equity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `equity` (
  `equity_id` int(11) NOT NULL,
  `ticker_symbol` varchar(45) DEFAULT NULL,
  `company_name` varchar(45) DEFAULT NULL,
  `company_type` varchar(45) DEFAULT NULL,
  `price` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`equity_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equity`
--

LOCK TABLES `equity` WRITE;
/*!40000 ALTER TABLE `equity` DISABLE KEYS */;
/*!40000 ALTER TABLE `equity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fixed_income`
--

DROP TABLE IF EXISTS `fixed_income`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `fixed_income` (
  `fixed_income_id` int(11) NOT NULL,
  `fixed_income_name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`fixed_income_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fixed_income`
--

LOCK TABLES `fixed_income` WRITE;
/*!40000 ALTER TABLE `fixed_income` DISABLE KEYS */;
/*!40000 ALTER TABLE `fixed_income` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `other`
--

DROP TABLE IF EXISTS `other`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `other` (
  `other_id` int(11) NOT NULL,
  `other_name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`other_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `other`
--

LOCK TABLES `other` WRITE;
/*!40000 ALTER TABLE `other` DISABLE KEYS */;
/*!40000 ALTER TABLE `other` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `real_estate`
--

DROP TABLE IF EXISTS `real_estate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `real_estate` (
  `real_estate_id` int(11) NOT NULL,
  `real_estate_name` varchar(45) DEFAULT NULL,
  `real_estate_cost` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`real_estate_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `real_estate`
--

LOCK TABLES `real_estate` WRITE;
/*!40000 ALTER TABLE `real_estate` DISABLE KEYS */;
/*!40000 ALTER TABLE `real_estate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  `email_address` varchar(45) DEFAULT NULL,
  `address` varchar(45) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `zipcode` int(10) DEFAULT NULL,
  `country` varchar(45) DEFAULT NULL,
  `state` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'arpan',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(2,'test',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(3,'t',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(4,'testthis',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(5,'testthat',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(6,'testthat1',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(7,'testthat2',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(8,'test',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(9,'blah',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(10,'blah',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(11,'blahblah blah',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(12,'blahblah blah',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(13,'blahblah blah',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(14,'test',NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_asset`
--

DROP TABLE IF EXISTS `user_asset`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_asset` (
  `user_asset_id` int(11) NOT NULL,
  `user_id` varchar(45) DEFAULT NULL,
  `equity_id` varchar(45) DEFAULT NULL,
  `fixed_income_id` varchar(45) DEFAULT NULL,
  `real_estate_id` varchar(45) DEFAULT NULL,
  `cash_id` varchar(45) DEFAULT NULL,
  `other_id` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`user_asset_id`),
  KEY `fk_equity` (`equity_id`),
  KEY `fk_cash` (`cash_id`),
  KEY `fk_real_estate` (`real_estate_id`),
  KEY `fk_fixed_income` (`fixed_income_id`),
  KEY `fk_other` (`other_id`),
  KEY `fk_user` (`user_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_asset`
--

LOCK TABLES `user_asset` WRITE;
/*!40000 ALTER TABLE `user_asset` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_asset` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2011-08-21 14:42:11
