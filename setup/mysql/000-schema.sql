CREATE DATABASE IF NOT EXISTS `products`;

USE `products`;

DROP TABLE IF EXISTS `products`;

CREATE TABLE `products` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(60) NOT NULL,
    `price` decimal(6,2) NOT NULL DEFAULT '0.00',
    `description` text,
    PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;