-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Sep 19, 2020 at 07:26 PM
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
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `cat_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cat_parent_id` bigint(20) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `cat_name`, `cat_parent_id`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Uncategorized', NULL, '2020-09-16 19:34:39', '2020-09-16 19:34:39', NULL),
(2, 'Programming', NULL, '2020-09-16 19:34:39', '2020-09-16 19:34:39', NULL),
(3, 'Laravel', 2, '2020-09-16 19:35:44', '2020-09-16 19:35:44', NULL),
(10, 'Catseven', NULL, '2020-09-17 16:34:37', '2020-09-17 16:34:37', NULL),
(11, 'Javac', 2, '2020-09-17 16:35:51', '2020-09-17 16:35:51', NULL),
(12, 'React', 2, '2020-09-17 16:40:08', '2020-09-17 16:40:08', NULL),
(13, 'Blade', 3, '2020-09-17 16:40:37', '2020-09-17 16:40:37', NULL),
(14, 'Models', 3, '2020-09-17 16:42:21', '2020-09-17 16:42:21', NULL),
(15, 'Request', 3, '2020-09-17 16:44:32', '2020-09-17 16:44:32', NULL),
(16, 'Controller', 3, '2020-09-17 16:45:10', '2020-09-17 16:45:10', NULL),
(17, 'Accessors', 14, '2020-09-17 16:50:58', '2020-09-17 16:50:58', NULL),
(19, 'Rules', 15, '2020-09-17 16:53:43', '2020-09-17 16:53:43', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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

-- --------------------------------------------------------

--
-- Table structure for table `ipddns`
--

CREATE TABLE `ipddns` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `ip` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `ipddns`
--

INSERT INTO `ipddns` (`id`, `ip`, `created_at`, `updated_at`) VALUES
(1, '36.80.255.70', '2020-09-17 13:38:53', '2020-09-17 13:38:53');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2013_09_06_110816_create_roles_table', 1),
(2, '2014_10_12_000000_create_users_table', 1),
(3, '2014_10_12_100000_create_password_resets_table', 1),
(4, '2019_08_19_000000_create_failed_jobs_table', 1),
(5, '2020_09_03_170628_create_ipddns_table', 2),
(7, '2020_09_13_002143_create_posts_table', 3),
(8, '2020_09_13_034734_create_categories_table', 3),
(9, '2020_09_13_035325_create_post_categories_table', 4),
(10, '2020_09_18_233835_create_iot_microcontrollers_table', 5),
(11, '2020_09_18_233835_create_iot_users_table', 5),
(12, '2020_09_18_234709_create_iot_relays_table', 5),
(13, '2020_09_18_235530_create_iot_access_token_table', 5);

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `post_author` bigint(20) UNSIGNED NOT NULL,
  `post_slug` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `post_title` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `post_excerpt` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `post_content` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `post_featured_image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `post_status` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT 'hide',
  `post_type` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT 'public',
  `post_password` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `post_comment_status` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT 'enable',
  `post_comment_count` bigint(20) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `post_categories`
--

CREATE TABLE `post_categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `post_id` bigint(20) UNSIGNED NOT NULL,
  `cat_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `role_name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role_code` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `role_name`, `role_code`, `created_at`, `updated_at`) VALUES
(1, 'Administrator', '100', '2020-09-12 10:17:10', '2020-09-12 10:17:10'),
(2, 'Writer', '101', '2020-09-12 10:17:10', '2020-09-12 10:17:10'),
(3, 'Operator', '102', '2020-09-12 10:35:38', '2020-09-12 10:35:38');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `usr_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `usr_username` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `usr_email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `usr_email_verified_at` timestamp NULL DEFAULT NULL,
  `usr_password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `usr_picture` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `usr_role_code` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `usr_status` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT 'active',
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `usr_name`, `usr_username`, `usr_email`, `usr_email_verified_at`, `usr_password`, `usr_picture`, `usr_role_code`, `usr_status`, `remember_token`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'M Admin', 'm-admin', 'm.admim@mail.com', NULL, '$2y$10$3MdS/EXSs4aBE2RbJpGWHugfHW9YJsPALTv4CU5MoG/0ln7ThJAQm', 'mimin.png', '100', 'active', 'K96GxyRUm52Hs0nAcws5X5zaLr759hsUCg3KO2jy8XouqZtcdVrvHwjlKZbe', '2020-09-12 10:36:49', '2020-09-12 12:41:41', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categories_cat_parent_id_foreign` (`cat_parent_id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`);

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
-- Indexes for table `ipddns`
--
ALTER TABLE `ipddns`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `posts_post_slug_unique` (`post_slug`),
  ADD KEY `posts_post_author_index` (`post_author`);

--
-- Indexes for table `post_categories`
--
ALTER TABLE `post_categories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `post_categories_post_id_index` (`post_id`),
  ADD KEY `post_categories_cat_id_index` (`cat_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `roles_role_code_unique` (`role_code`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_usr_email_unique` (`usr_email`),
  ADD KEY `users_usr_role_code_foreign` (`usr_role_code`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

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
-- AUTO_INCREMENT for table `ipddns`
--
ALTER TABLE `ipddns`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `post_categories`
--
ALTER TABLE `post_categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `categories`
--
ALTER TABLE `categories`
  ADD CONSTRAINT `categories_cat_parent_id_foreign` FOREIGN KEY (`cat_parent_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE;

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

--
-- Constraints for table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_post_author_foreign` FOREIGN KEY (`post_author`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `post_categories`
--
ALTER TABLE `post_categories`
  ADD CONSTRAINT `post_categories_cat_id` FOREIGN KEY (`cat_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `post_categories_post_id` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_usr_role_code_foreign` FOREIGN KEY (`usr_role_code`) REFERENCES `roles` (`role_code`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
