-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Sep 18, 2020 at 05:21 PM
-- Server version: 5.7.24
-- PHP Version: 7.3.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `qdev`
--

-- --------------------------------------------------------

--
-- Table structure for table `iot_access_token`
--

CREATE TABLE `iot_access_token` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `iot_user_id` bigint(20) UNSIGNED NOT NULL,
  `iot_at_access_token` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `iot_at_ip` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT 'text',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `iot_microcontrollers`
--

CREATE TABLE `iot_microcontrollers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `iot_mc_device_key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `iot_mc_device_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `iot_relays`
--

CREATE TABLE `iot_relays` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `iot_mc_id` bigint(20) UNSIGNED NOT NULL,
  `iot_user_id` bigint(20) UNSIGNED NOT NULL,
  `iot_relay_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `iot_relay_pin` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `iot_relay_condition` enum('0','1') COLLATE utf8mb4_unicode_ci DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `iot_users`
--

CREATE TABLE `iot_users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `iot_mc_id` bigint(20) UNSIGNED NOT NULL,
  `iot_usr_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `iot_usr_username` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `iot_usr_password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `iot_access_token`
--
ALTER TABLE `iot_access_token`
  ADD PRIMARY KEY (`id`),
  ADD KEY `iot_access_token_iot_user_id_index` (`iot_user_id`);

--
-- Indexes for table `iot_microcontrollers`
--
ALTER TABLE `iot_microcontrollers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `iot_microcontrollers_iot_mc_device_key_unique` (`iot_mc_device_key`);

--
-- Indexes for table `iot_relays`
--
ALTER TABLE `iot_relays`
  ADD PRIMARY KEY (`id`),
  ADD KEY `iot_relays_iot_mc_id_index` (`iot_mc_id`),
  ADD KEY `iot_relays_iot_user_id_index` (`iot_user_id`);

--
-- Indexes for table `iot_users`
--
ALTER TABLE `iot_users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `iot_users_iot_usr_username_unique` (`iot_usr_username`),
  ADD KEY `iot_users_iot_mc_id_foreign` (`iot_mc_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `iot_access_token`
--
ALTER TABLE `iot_access_token`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `iot_microcontrollers`
--
ALTER TABLE `iot_microcontrollers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `iot_relays`
--
ALTER TABLE `iot_relays`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `iot_users`
--
ALTER TABLE `iot_users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `iot_access_token`
--
ALTER TABLE `iot_access_token`
  ADD CONSTRAINT `iot_access_token_iot_user_id_foreign` FOREIGN KEY (`iot_user_id`) REFERENCES `iot_users` (`id`);

--
-- Constraints for table `iot_relays`
--
ALTER TABLE `iot_relays`
  ADD CONSTRAINT `iot_relays_iot_mc_id_foreign` FOREIGN KEY (`iot_user_id`) REFERENCES `iot_users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `iot_relays_iot_user_id_foreign` FOREIGN KEY (`iot_mc_id`) REFERENCES `iot_microcontrollers` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `iot_users`
--
ALTER TABLE `iot_users`
  ADD CONSTRAINT `iot_users_iot_mc_id_foreign` FOREIGN KEY (`iot_mc_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
