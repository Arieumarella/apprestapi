-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Waktu pembuatan: 17 Sep 2020 pada 13.45
-- Versi server: 10.4.12-MariaDB-log
-- Versi PHP: 7.4.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `iot_pogung`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `admin`
--

CREATE TABLE `admin` (
  `id` int(20) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` int(225) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struktur dari tabel `akses_token`
--

CREATE TABLE `akses_token` (
  `id` int(20) NOT NULL,
  `id_user` int(20) DEFAULT NULL,
  `access_token` text NOT NULL,
  `ip_address` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `akses_token`
--

INSERT INTO `akses_token` (`id`, `id_user`, `access_token`, `ip_address`) VALUES
(2, 23, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb3dzIjpbeyJpZCI6MiwiZGV2aWNlX2tleSI6IlBPTFVJVVlSVCIsIm5hbWFfZGV2aWNlIjoiIiwidGFuZ2dhbF9kYWZ0YXIiOiIwMDAwLTAwLTAwIn1dLCJpYXQiOjE2MDAzMzUwNzEsImV4cCI6MTYwMDQyMTQ3MX0.BpEFV7YJgla7UVgxYrdjq-Mx2CaIdDMUiATylafHPYY', '192.168.42.112'),
(79, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb3dzIjpbeyJpZCI6MiwiZGV2aWNlX2tleSI6IlBPTFVJVVlSVCIsIm5hbWFfZGV2aWNlIjoiIiwidGFuZ2dhbF9kYWZ0YXIiOiIwMDAwLTAwLTAwIn1dLCJpYXQiOjE2MDAxOTc5NTYsImV4cCI6MTYwMDI4NDM1Nn0.KPlO58cs7fUaD6dTgIe27PaclkWjBo18MjQ17LUt4VA', '192.168.42.245'),
(80, 23, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb3dzIjpbeyJpZCI6MjMsImlkX2RldmljZSI6MSwibmFtYSI6ImRlZmF1bHQiLCJ1c2VybmFtZSI6ImRlZmF1bHQiLCJwYXNzd29yZCI6ImMyMWY5NjliNWYwM2QzM2Q0M2UwNGY4ZjEzNmU3NjgyIiwidGFuZ2dhbF9kYWZ0YXIiOiIyMDIwLTA4LTI5VDE3OjAwOjAwLjAwMFoifV0sImlhdCI6MTYwMDE5Nzk3NCwiZXhwIjoxNjAwMjg0Mzc0fQ.TbTGRxU7FQ5tJGdewEIa7hhmOwvUH8G8SeM1r0Z5Z9E', '192.168.42.245'),
(81, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb3dzIjpbeyJpZCI6MiwiZGV2aWNlX2tleSI6IlBPTFVJVVlSVCIsIm5hbWFfZGV2aWNlIjoiIiwidGFuZ2dhbF9kYWZ0YXIiOiIwMDAwLTAwLTAwIn1dLCJpYXQiOjE2MDAxOTgwNjUsImV4cCI6MTYwMDI4NDQ2NX0.6l9aiVO6WXcHJyyPQIyZfFN1GhSyS9xYCB61kkv2MTM', '192.168.42.245'),
(82, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb3dzIjpbeyJpZCI6MiwiZGV2aWNlX2tleSI6IlBPTFVJVVlSVCIsIm5hbWFfZGV2aWNlIjoiIiwidGFuZ2dhbF9kYWZ0YXIiOiIwMDAwLTAwLTAwIn1dLCJpYXQiOjE2MDAzMzQ0NTEsImV4cCI6MTYwMDQyMDg1MX0.6MR5r95VY0X3UsES2WkAF3XJc1kfUYHmzRFKJQN_dls', '192.168.42.112'),
(83, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb3dzIjpbeyJpZCI6MiwiZGV2aWNlX2tleSI6IlBPTFVJVVlSVCIsIm5hbWFfZGV2aWNlIjoiIiwidGFuZ2dhbF9kYWZ0YXIiOiIwMDAwLTAwLTAwIn1dLCJpYXQiOjE2MDAzMzQ0ODgsImV4cCI6MTYwMDQyMDg4OH0.RdfMciMQ27LyM8Bdr9WvkPnDvmzNlQgJyly8SiT9AWU', '192.168.42.112'),
(84, 23, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb3dzIjpbeyJpZCI6MiwiZGV2aWNlX2tleSI6IlBPTFVJVVlSVCIsIm5hbWFfZGV2aWNlIjoiIiwidGFuZ2dhbF9kYWZ0YXIiOiIwMDAwLTAwLTAwIn1dLCJpYXQiOjE2MDAzMzQ1NjMsImV4cCI6MTYwMDQyMDk2M30.xZ1BjOzwOxhXrW9jeqOrpHcQvwU5oD3oxsX59bYRFso', '192.168.42.112'),
(85, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb3dzIjpbeyJpZCI6MiwiZGV2aWNlX2tleSI6IlBPTFVJVVlSVCIsIm5hbWFfZGV2aWNlIjoiIiwidGFuZ2dhbF9kYWZ0YXIiOiIwMDAwLTAwLTAwIn1dLCJpYXQiOjE2MDAzMzQ5NTksImV4cCI6MTYwMDQyMTM1OX0.H2FLNJ_NTfpcx9xGqYXS18rOBD-YAwLPSquzuuUuVvo', '192.168.42.112'),
(86, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb3dzIjpbeyJpZCI6MiwiZGV2aWNlX2tleSI6IlBPTFVJVVlSVCIsIm5hbWFfZGV2aWNlIjoiIiwidGFuZ2dhbF9kYWZ0YXIiOiIwMDAwLTAwLTAwIn1dLCJpYXQiOjE2MDAzMzUwMDQsImV4cCI6MTYwMDQyMTQwNH0.5V44oTKlI3NCvFKadcxRALp_mwSzFGz6r4f8KDwg0AU', '192.168.42.112'),
(87, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb3dzIjpbeyJpZCI6MiwiZGV2aWNlX2tleSI6IlBPTFVJVVlSVCIsIm5hbWFfZGV2aWNlIjoiIiwidGFuZ2dhbF9kYWZ0YXIiOiIwMDAwLTAwLTAwIn1dLCJpYXQiOjE2MDAzMzUwMjEsImV4cCI6MTYwMDQyMTQyMX0.9jjJe16BZpVUd-Jt9EprK9p9fSP3w8jksSAqgs9cJcQ', '192.168.42.112'),
(88, 23, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb3dzIjpbeyJpZCI6MiwiZGV2aWNlX2tleSI6IlBPTFVJVVlSVCIsIm5hbWFfZGV2aWNlIjoiIiwidGFuZ2dhbF9kYWZ0YXIiOiIwMDAwLTAwLTAwIn1dLCJpYXQiOjE2MDAzMzUwNTcsImV4cCI6MTYwMDQyMTQ1N30.wBOFeLghmxMiylhFVX2_h30jdXjLAUKtxHsawZCW22o', '192.168.42.112'),
(89, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb3dzIjpbeyJpZCI6MiwiZGV2aWNlX2tleSI6IlBPTFVJVVlSVCIsIm5hbWFfZGV2aWNlIjoiIiwidGFuZ2dhbF9kYWZ0YXIiOiIwMDAwLTAwLTAwIn1dLCJpYXQiOjE2MDAzMzUxNTIsImV4cCI6MTYwMDQyMTU1Mn0.zBO0JwQ8qj2FGy9lX1-OGEyNF2NaQ4EQIOYeBKGo_4Q', '192.168.42.112'),
(90, 23, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb3dzIjpbeyJpZCI6MjMsImlkX2RldmljZSI6MSwibmFtYSI6ImRlZmF1bHQiLCJ1c2VybmFtZSI6ImRlZmF1bHQiLCJwYXNzd29yZCI6ImMyMWY5NjliNWYwM2QzM2Q0M2UwNGY4ZjEzNmU3NjgyIiwidGFuZ2dhbF9kYWZ0YXIiOiIyMDIwLTA4LTI5VDE3OjAwOjAwLjAwMFoifV0sImlhdCI6MTYwMDMzNTIyNCwiZXhwIjoxNjAwNDIxNjI0fQ.E4KZELJepmXKGbFAWITj_VRheL252LNaJ7UBZgaZ4xo', '192.168.42.112');

-- --------------------------------------------------------

--
-- Struktur dari tabel `device`
--

CREATE TABLE `device` (
  `id` int(20) NOT NULL,
  `device_key` varchar(20) NOT NULL,
  `nama_device` varchar(255) NOT NULL,
  `tanggal_daftar` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `device`
--

INSERT INTO `device` (`id`, `device_key`, `nama_device`, `tanggal_daftar`) VALUES
(1, 'ABVCFDRE', '', '0000-00-00'),
(2, 'POLUIUYRT', '', '0000-00-00'),
(3, 'sadhvhsdvh', 'test-data', '2020-09-16');

-- --------------------------------------------------------

--
-- Struktur dari tabel `relay`
--

CREATE TABLE `relay` (
  `id` int(20) NOT NULL,
  `id_device` int(20) NOT NULL,
  `id_user` int(20) NOT NULL,
  `nama_relay` varchar(255) NOT NULL,
  `pin` int(20) NOT NULL,
  `kondisi` enum('0','1') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `relay`
--

INSERT INTO `relay` (`id`, `id_device`, `id_user`, `nama_relay`, `pin`, `kondisi`) VALUES
(8, 1, 23, 'Saklar Pompa air', 1, '0'),
(10, 1, 22, 'Saklar Kamar Ari tampan', 5, '0'),
(11, 1, 24, 'Saklar Kamar Opik', 4, '0'),
(13, 2, 23, 'Saklar TV', 8, '0'),
(14, 2, 22, 'kipas angin', 4, '0');

-- --------------------------------------------------------

--
-- Struktur dari tabel `user`
--

CREATE TABLE `user` (
  `id` int(20) NOT NULL,
  `id_device` int(20) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `tanggal_daftar` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `user`
--

INSERT INTO `user` (`id`, `id_device`, `nama`, `username`, `password`, `tanggal_daftar`) VALUES
(21, 1, 'oke', 'jugaa', '92deb3f274aaee236194c05729bfa443', '2020-08-30'),
(22, 1, 'arie umarudin', 'umar', '92deb3f274aaee236194c05729bfa443', '2020-08-30'),
(23, 1, 'default', 'default', 'c21f969b5f03d33d43e04f8f136e7682', '2020-08-30'),
(24, 1, 'opik', 'opick', 'a5553bf55ffd70c92906667b910f6676', '2020-08-30'),
(25, 1, 'opik', 'test1', 'ad0234829205b9033196ba818f7a872b', '2020-09-15');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `akses_token`
--
ALTER TABLE `akses_token`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`),
  ADD KEY `id_user` (`id_user`);

--
-- Indeks untuk tabel `device`
--
ALTER TABLE `device`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `relay`
--
ALTER TABLE `relay`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_device` (`id_device`),
  ADD KEY `id_user` (`id_user`);

--
-- Indeks untuk tabel `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_device` (`id_device`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `akses_token`
--
ALTER TABLE `akses_token`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=91;

--
-- AUTO_INCREMENT untuk tabel `device`
--
ALTER TABLE `device`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `relay`
--
ALTER TABLE `relay`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT untuk tabel `user`
--
ALTER TABLE `user`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `akses_token`
--
ALTER TABLE `akses_token`
  ADD CONSTRAINT `akses_token_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `relay`
--
ALTER TABLE `relay`
  ADD CONSTRAINT `relay_ibfk_1` FOREIGN KEY (`id_device`) REFERENCES `device` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `relay_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`id_device`) REFERENCES `device` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
