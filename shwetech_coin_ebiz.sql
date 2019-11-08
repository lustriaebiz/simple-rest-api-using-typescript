/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 100121
Source Host           : localhost:3308
Source Database       : shwetech_coin_ebiz

Target Server Type    : MYSQL
Target Server Version : 100121
File Encoding         : 65001

Date: 2018-10-13 13:49:49
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for dompet_coin
-- ----------------------------
DROP TABLE IF EXISTS `dompet_coin`;
CREATE TABLE `dompet_coin` (
  `dompet_coin_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `coin_value` varchar(255) DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `created_date` datetime DEFAULT NULL,
  PRIMARY KEY (`dompet_coin_id`),
  UNIQUE KEY `user` (`user_id`) USING BTREE,
  CONSTRAINT `user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of dompet_coin
-- ----------------------------
INSERT INTO `dompet_coin` VALUES ('1', '1', '98', '2018-10-13 13:45:17', null);
INSERT INTO `dompet_coin` VALUES ('3', '2', '2', '2018-10-13 13:45:17', null);

-- ----------------------------
-- Table structure for log
-- ----------------------------
DROP TABLE IF EXISTS `log`;
CREATE TABLE `log` (
  `log_id` int(11) NOT NULL AUTO_INCREMENT,
  `topup_id` int(11) DEFAULT NULL,
  `status` enum('request','success','failed','cancel','') DEFAULT 'request',
  `updated_date` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `created_date` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`log_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of log
-- ----------------------------
INSERT INTO `log` VALUES ('8', '3', 'cancel', null, '2018-10-13 13:44:21');
INSERT INTO `log` VALUES ('9', '4', 'request', null, '2018-10-13 13:44:37');
INSERT INTO `log` VALUES ('10', '4', 'failed', null, '2018-10-13 13:45:04');
INSERT INTO `log` VALUES ('11', '4', 'success', null, '2018-10-13 13:45:17');

-- ----------------------------
-- Table structure for topup
-- ----------------------------
DROP TABLE IF EXISTS `topup`;
CREATE TABLE `topup` (
  `topup_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_request` int(11) DEFAULT NULL,
  `user_confirm` int(11) DEFAULT NULL,
  `value` int(11) DEFAULT NULL,
  `status` enum('true','false','request') DEFAULT 'request',
  `updated_date` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `created_date` datetime DEFAULT NULL,
  PRIMARY KEY (`topup_id`),
  KEY `user_req` (`user_request`),
  KEY `user_conf` (`user_confirm`),
  CONSTRAINT `user_conf` FOREIGN KEY (`user_confirm`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_req` FOREIGN KEY (`user_request`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of topup
-- ----------------------------
INSERT INTO `topup` VALUES ('1', '2', '1', '6', 'false', '2018-10-13 13:33:17', null);
INSERT INTO `topup` VALUES ('2', '2', '1', '14', 'false', null, null);
INSERT INTO `topup` VALUES ('3', '2', '1', '21', 'false', '2018-10-13 13:44:21', null);
INSERT INTO `topup` VALUES ('4', '2', '1', '2', 'true', '2018-10-13 13:45:17', null);

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `password` varchar(225) NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `level` enum('master','agent','buyer') DEFAULT 'buyer',
  `updated_date` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `created_date` datetime DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username` (`username`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'ebis', 'asdf', 'hh', 'master', null, null);
INSERT INTO `user` VALUES ('2', 'shaw', 'qwerty', 'dd', 'agent', '2018-10-13 13:15:16', null);
DROP TRIGGER IF EXISTS `request`;
DELIMITER ;;
CREATE TRIGGER `request` AFTER INSERT ON `topup` FOR EACH ROW BEGIN

INSERT INTO log (topup_id,status,created_date) VALUES (NEW.topup_id, 'request', NOW());

END
;;
DELIMITER ;
DROP TRIGGER IF EXISTS `confirm`;
DELIMITER ;;
CREATE TRIGGER `confirm` AFTER UPDATE ON `topup` FOR EACH ROW BEGIN

IF (NEW.status = 'true') THEN
UPDATE dompet_coin SET coin_value = (coin_value-OLD.value) WHERE user_id = OLD.user_confirm;
UPDATE dompet_coin SET coin_value = (coin_value+OLD.value) WHERE user_id = OLD.user_request;

INSERT INTO log (topup_id, status,created_date) VALUES (OLD.topup_id, 'success',NOW());
END IF;

IF (NEW.status = 'false' && OLD.status = 'true') THEN
UPDATE dompet_coin SET coin_value = (coin_value-OLD.value) WHERE user_id = OLD.user_request;
UPDATE dompet_coin SET coin_value = (coin_value+OLD.value) WHERE user_id = OLD.user_confirm;

INSERT INTO log (topup_id,status,created_date) VALUES (OLD.topup_id, 'cancel',NOW());
END IF;

IF (NEW.status = 'false' && OLD.status = 'request') THEN

INSERT INTO log (topup_id,status,created_date) VALUES (OLD.topup_id, 'failed',NOW());
END IF;

END
;;
DELIMITER ;
