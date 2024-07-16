-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Jul 15, 2024 at 12:54 AM
-- Server version: 5.7.39
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pentastore`
--

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `user` int(11) NOT NULL,
  `text` longtext NOT NULL,
  `redirect` varchar(250) NOT NULL,
  `createat` datetime DEFAULT CURRENT_TIMESTAMP,
  `orderid` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `user`, `text`, `redirect`, `createat`, `orderid`) VALUES
(15, 40, ' Hi Fauzan Khalid, pesanan produk Pentacloud anda dengan id 6317e270-7d48-4a32-92cd-a0897c65cbe4 telah berhasil dicapture. Ayo cek order List Anda', 'test', '2024-05-14 21:10:43', '6317e270-7d48-4a32-92cd-a0897c65cbe4'),
(16, 40, ' Hi Fauzan Khalid, pesanan produk Pentacloud anda dengan id 6317e270-7d48-4a32-92cd-a0897c65cbe4 telah berhasil dicapture. Ayo cek order List Anda', 'test', '2024-05-14 21:11:07', '6317e270-7d48-4a32-92cd-a0897c65cbe4'),
(17, 40, ' Hi Fauzan Khalid, pesanan produk Pentacloud anda dengan id 6317e270-7d48-4a32-92cd-a0897c65cbe4 telah berhasil dicapture. Ayo cek order List Anda', 'test', '2024-05-14 21:15:20', '6317e270-7d48-4a32-92cd-a0897c65cbe4'),
(18, 40, ' Hi Fauzan Khalid, pesanan produk Pentacloud anda dengan id 6317e270-7d48-4a32-92cd-a0897c65cbe4 telah berhasil dicapture. Ayo cek order List Anda', 'test', '2024-05-14 21:15:46', '6317e270-7d48-4a32-92cd-a0897c65cbe4'),
(19, 40, ' Hi Fauzan Khalid, pesanan produk Pentacloud anda dengan id 6317e270-7d48-4a32-92cd-a0897c65cbe4 telah berhasil dicapture. Ayo cek order List Anda', 'test', '2024-05-14 21:16:47', '6317e270-7d48-4a32-92cd-a0897c65cbe4'),
(20, 40, ' Hi Fauzan Khalid, pesanan produk Pentacloud anda dengan id 6317e270-7d48-4a32-92cd-a0897c65cbe4 telah berhasil dicapture. Ayo cek order List Anda', 'test', '2024-05-14 21:17:26', '6317e270-7d48-4a32-92cd-a0897c65cbe4'),
(21, 5, ' Hi Jepi okta, pesanan produk Penta anda dengan id 23bcbd00-5d3b-4f11-b854-4402251e9904 telah berhasil dicapture. Ayo cek order List Anda', 'test', '2024-05-15 00:44:55', '23bcbd00-5d3b-4f11-b854-4402251e9904'),
(22, 5, ' Hi Jepi okta, pesanan produk dsjkdjks anda dengan id 0d154f59-5916-440f-a128-050bab76febe telah berhasil dicapture. Ayo cek order List Anda', 'test', '2024-05-18 17:50:53', '0d154f59-5916-440f-a128-050bab76febe'),
(23, 5, ' Hi Jepi Oktamipa, pesanan produk PentaMessage anda dengan id 549e8466-df59-4e93-9578-f5cf1bf2af86 telah berhasil dicapture. Ayo cek order List Anda', 'test', '2024-05-21 17:54:33', '549e8466-df59-4e93-9578-f5cf1bf2af86'),
(24, 44, ' Hi Jefyoktamipa, pesanan produk PentaAi anda dengan id ad0a73db-2a7a-4238-8fc9-eb78dbe9aff0 telah berhasil dicapture. Ayo cek order List Anda', 'test', NULL, 'ad0a73db-2a7a-4238-8fc9-eb78dbe9aff0'),
(25, 46, ' Hi Test, pesanan produk PentaAi anda dengan id 7de567fe-e91b-4ddd-a246-884f39c5528e telah berhasil dicapture. Ayo cek order List Anda', 'test', NULL, '7de567fe-e91b-4ddd-a246-884f39c5528e'),
(26, 47, ' Hi Tetsttt, pesanan produk PentaAi anda dengan id d03436cd-dab9-4fb7-8368-42ec8887b8b3 telah berhasil dicapture. Ayo cek order List Anda', 'test', '2024-06-10 00:13:53', 'd03436cd-dab9-4fb7-8368-42ec8887b8b3');

-- --------------------------------------------------------

--
-- Table structure for table `pesanan`
--

CREATE TABLE `pesanan` (
  `id` varchar(200) NOT NULL,
  `idproduk` int(11) NOT NULL,
  `qty` bigint(250) NOT NULL,
  `total` bigint(225) NOT NULL,
  `tanggalpembelian` datetime DEFAULT CURRENT_TIMESTAMP,
  `status` tinyint(1) DEFAULT '0',
  `token` longtext NOT NULL,
  `user` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `pesanan`
--

INSERT INTO `pesanan` (`id`, `idproduk`, `qty`, `total`, `tanggalpembelian`, `status`, `token`, `user`) VALUES
('12313fsd', 116, 1, 200000, '2024-06-04 00:43:04', 1, 'gkdmgdkdsngjnskrngktjndjng', 5),
('31d67866-7ea4-4366-afbb-3a6967222d26', 116, 1, 100000, '2024-06-10 22:54:29', 0, '515d04e5-a82e-49b1-9b2e-3060c30eabf0', 5),
('549e8466-df59-4e93-9578-f5cf1bf2af86', 94, 1, 100000, '2024-05-21 17:48:18', 1, 'acc2570b-5b9c-4e12-95a8-a045c4653f1b', 5),
('6a559243-d659-4bb0-af11-4959319c5bbc', 97, 1, 800000, '2024-05-22 05:47:50', 0, 'fc369072-130f-4c91-ae78-021206051ce6', 5),
('6e59b3a5-f51b-4f63-a419-23b4fa41f4c4', 116, 1, 100000, '2024-06-10 22:53:20', 0, '189ebeee-1ae0-470c-9dc4-1c2912fd77b9', 5),
('7de567fe-e91b-4ddd-a246-884f39c5528e', 116, 1, 100000, '2024-06-10 00:07:45', 1, 'e6c9c133-75a9-4a28-b96d-609161398529', 46),
('7e8b9967-01bf-4696-bbf9-ce21a126f02c', 94, 1, 100000, '2024-06-10 00:13:03', 0, '06066f1d-2dfd-419e-96ad-63e1ac1433be', 47),
('ad0a73db-2a7a-4238-8fc9-eb78dbe9aff0', 116, 1, 100000, '2024-06-09 23:39:59', 1, '92ab67c9-761e-40b5-9959-d5f24c3e203f', 44),
('b1168b7a-21e2-455c-b1ad-a050447552b8', 116, 1, 100000, '2024-06-09 23:48:39', 0, '5ba353ca-0d0f-40c6-9010-56c6964b35f2', 45),
('d03436cd-dab9-4fb7-8368-42ec8887b8b3', 116, 1, 100000, '2024-06-10 00:12:57', 1, '52ecf494-3a76-435c-8df7-c53cad10bfe3', 47),
('f3effada-bb6c-4f1d-aaf0-a510544dd7a7', 97, 1, 800000, '2024-05-11 01:43:33', 1, '185967d3-efbe-4aaf-9968-b6c4eb5e4959', 37);

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `product` varchar(250) NOT NULL,
  `harga` bigint(250) NOT NULL,
  `tech` varchar(250) NOT NULL,
  `gambar` varchar(225) NOT NULL,
  `launched` tinyint(1) DEFAULT '0',
  `link` varchar(225) DEFAULT NULL,
  `desc` longtext,
  `type` varchar(225) DEFAULT 'other'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `product`, `harga`, `tech`, `gambar`, `launched`, `link`, `desc`, `type`) VALUES
(94, 'PentaMessage', 100000, 'Php', '65bb638cbd08a.jpg', 1, 'https://penta.store/products/', '', 'chat'),
(97, 'Penta', 800000, 'php', '65b79206c9f6c.png', 1, 'https://dsadas.com', '', 'other'),
(98, 'example1', 100000, '3D', '65bb5b6c9be05.png', 1, 'https://penta.store/products/', '', 'other'),
(99, 'Php database template', 10000, 'Php', '65bb5b6c9be05.png', 1, 'https://penta.store/products/', '', 'web'),
(100, 'example1', 123, '3D', '65bb5b6c9be05.png', 1, 'https://dsadas.com', '', 'other'),
(101, 'example1', 23, '3D', '65bb5b6c9be05.png', 1, 'https://dsadas.com', '', 'other'),
(102, 'example1321', 123, '3D', '65baed6537c9f.png', 1, 'https://dsadas.com', '', 'other'),
(103, 'example1aeq', 123, '3D', '65bb5b6c9be05.png', 1, 'https://penta.store/products/', '', 'other'),
(104, 'Ntahlah', 10000, '3D', '65bb5b6c9be05.png', 1, 'https://dsadas.com', '', 'other'),
(105, 'PentaGames', 200000, 'Php', '65bb5b6c9be05.png', 1, 'https://penta.store/products/', '', 'game'),
(106, 'kskadnsa', 10000, 'Php', '65bb5b6c9be05.png', 1, 'https://penta.store/products/', '', 'other'),
(107, 'dsjkdjks', 1000, '3D', '65bb5b6c9be05.png', 1, 'https://dsadas.com', '', 'other'),
(108, 'example12313213', 90, 'Php', '65bb5b6c9be05.png', 1, 'https://dsadas.com', '', 'other'),
(109, 'mem', 123, '3D', '65e7d2697ea59.png', 1, 'https://dsadas.com', '', 'other'),
(110, 'Pentacloud', 100000, 'react native', '6641bfb327686.png', 1, 'https://penta.store/products/pentaclous', NULL, 'cloud'),
(111, 'PentaTestIOSApp', 300000, 'Swift', '6643b9dc3744b.jpg', 1, 'https://penta.store/productssss', NULL, 'apple'),
(116, 'PentaAi', 100000, 'React-Native', '664d4cec02130.png', 1, 'https://penta.store/product/penta', NULL, 'chat');

-- --------------------------------------------------------

--
-- Table structure for table `rate`
--

CREATE TABLE `rate` (
  `id` int(11) NOT NULL,
  `comment` longtext,
  `value` int(1) NOT NULL,
  `productid` int(11) NOT NULL,
  `userid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `rate`
--

INSERT INTO `rate` (`id`, `comment`, `value`, `productid`, `userid`) VALUES
(3, 'gada', 5, 105, 5),
(4, 'gadadada', 4, 105, 5);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `username` varchar(200) NOT NULL,
  `nama` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `gambar` varchar(200) NOT NULL DEFAULT 'profile.png',
  `role` tinyint(1) DEFAULT NULL,
  `id` int(255) NOT NULL,
  `refreshtoken` longtext,
  `crosstoken` longtext,
  `createat` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `lastupdate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `verifycode` int(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`username`, `nama`, `password`, `email`, `gambar`, `role`, `id`, `refreshtoken`, `crosstoken`, `createat`, `lastupdate`, `verifycode`) VALUES
('capee', 'capebgt', 'unaa123', 'cp@gm.com', 'profile.png', NULL, 1, NULL, NULL, '2024-05-10 08:52:43', '2024-05-10 08:52:43', NULL),
('devi', 'depi', 'unaa123', 'devi2@gmail.com', 'profile.png', NULL, 2, NULL, NULL, '2024-05-10 08:52:43', '2024-05-10 08:52:43', NULL),
('endang permatasari', 'Endang', 'unaa123', 'Epermatasari@gmail.com', 'profile.png', 1, 3, NULL, NULL, '2024-05-10 08:52:43', '2024-05-10 08:52:43', NULL),
('hehh', 'ngetest laggi, dasar dev goblok', 'unaa123', 'gobloklu@gmail.com', 'profile.png', NULL, 4, NULL, NULL, '2024-05-10 08:52:43', '2024-05-10 08:52:43', NULL),
('jefyokta', 'Jepi Oktamipa', '123', 'jefyokta50@icloud.com', 'default/jepi3.png', 1, 5, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwidXNlcm5hbWUiOiJqZWZ5b2t0YSIsImVtYWlsIjoiamVmeW9rdGE1MEBpY2xvdWQuY29tIiwiZ2FtYmFyIjoiZGVmYXVsdC9qZXBpMy5wbmciLCJyb2xlIjoxLCJpYXQiOjE3MTgzMzU5ODV9.3oFh1wR6g42KIcxHhgSwKlNG1Dhmv-hjQA-fOa1V5Ws', NULL, '2024-05-10 08:52:43', '2024-06-10 00:12:12', NULL),
('jefyoktaa', 'jefyokta', '123', 'jefyokra@gmail.com', '65b5ffbfbcb6b.png', NULL, 6, NULL, NULL, '2024-05-10 08:52:43', '2024-05-10 08:52:43', NULL),
('jefyoktaaa1', '123121', 'unaa123', '3123@mail.com', 'profile.png', NULL, 7, NULL, NULL, '2024-05-10 08:52:43', '2024-05-10 08:52:43', NULL),
('jefyoktaaaa', 'jepi oktamipa', 'unaa123', 'jepiii@gmail.com', 'profile.png', NULL, 8, NULL, NULL, '2024-05-10 08:52:43', '2024-05-10 08:52:43', NULL),
('jepi', 'jepi', 'unaa123', 'jepi!@gmail.com', 'profile.png', NULL, 9, NULL, NULL, '2024-05-10 08:52:43', '2024-05-10 08:52:43', NULL),
('okta', 'okta', 'unaa123', 'okbnr@gamil.com', 'profile.png', NULL, 10, NULL, NULL, '2024-05-10 08:52:43', '2024-05-10 08:52:43', NULL),
('ppppp', '12', 'unaa123', 'mmesaSAkbweqwau@gmail.com', 'profile.png', NULL, 11, NULL, NULL, '2024-05-10 08:52:43', '2024-05-10 08:52:43', NULL),
('rafiki', 'rafiki syaputra', 'unaa123', 'nekochan@gmail.com', 'profile.png', NULL, 12, NULL, NULL, '2024-05-10 08:52:43', '2024-05-10 08:52:43', NULL),
('rahmadevi', 'Rahma Devi', 'unaa123', 'devi@gmail.com', 'profile.png', 1, 13, NULL, NULL, '2024-05-10 08:52:43', '2024-05-10 08:52:43', NULL),
('sandikhagalih', 'pa dika', '123', 'sandikhagalih@gmail.com', 'profile.png', NULL, 15, NULL, NULL, '2024-05-10 08:52:43', '2024-05-10 08:52:43', NULL),
('udahberapani', 'ntahlah', 'unaa123', 'gatau@gmai.com', 'profile.png', NULL, 16, NULL, NULL, '2024-05-10 08:52:43', '2024-05-10 08:52:43', NULL),
('unaa', 'yumna/una', 'unaa123', 'ymna@gmail.com', '65af62c3a817b.jpg', NULL, 17, NULL, NULL, '2024-05-10 08:52:43', '2024-05-10 08:52:43', NULL),
('Jefyoktaaa', 'Jefyokta', '123', 'Jefyokta@icloud.com', 'profile.png', NULL, 18, NULL, NULL, '2024-05-10 08:52:43', '2024-05-10 08:52:43', NULL),
('Jefyoktaaaaa', 'Jedi ganteng baik dan soleh', 'memekbau', 'Jefyokta5@icloud.com', 'profile.png', NULL, 20, NULL, NULL, '2024-05-10 08:52:43', '2024-05-10 08:52:43', NULL),
('Komtoelfesdnss', 'Jepi raja iblis isekai', '10dosasoeharto', 'Memekbauuuuuu@gmail.com', 'profile.png', NULL, 22, NULL, NULL, '2024-05-10 08:52:43', '2024-05-10 08:52:43', NULL),
('Adede', '1231', '1231', 'Dead', 'profile.png', NULL, 23, NULL, NULL, '2024-05-10 08:52:43', '2024-05-10 08:52:43', NULL),
('Edsde', '123213', '123', 'Kongolo', 'profile.png', NULL, 24, NULL, NULL, '2024-05-10 08:52:43', '2024-05-10 08:52:43', NULL),
('Jefyoktaaaaaa', '2312', '123', 'Jefyokta50@icloud.com22', 'profile.png', NULL, 25, NULL, NULL, '2024-05-10 08:52:43', '2024-05-10 08:52:43', NULL),
('Dirgamedia', 'Dirga media', '123', 'Dirgamedia@gmail.com', 'profile.png', NULL, 27, NULL, NULL, '2024-05-10 08:52:43', '2024-05-10 08:52:43', NULL),
('Irvandi', 'Irvandi kurniawan', '123', 'Irvandi@gmail.com', 'profile.png', NULL, 28, NULL, NULL, '2024-05-10 08:52:43', '2024-05-10 08:52:43', 730518),
('Testapp1', 'Test', '1', 'Testapp@gmail.com', 'profile.png', NULL, 29, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjksInVzZXJuYW1lIjoiVGVzdGFwcDEiLCJlbWFpbCI6IlRlc3RhcHBAZ21haWwuY29tIiwiZ2FtYmFyIjoicHJvZmlsZS5wbmciLCJyb2xlIjpudWxsLCJpYXQiOjE3MTQxNzgzNDV9._M68cemvXRaHYMm4tKLa9MqVJcjQyYxGDLCCq2v9QV8', NULL, '2024-05-10 08:52:43', '2024-05-10 08:52:43', NULL),
('Testregist2', '123', '123', 'Test', 'profile.png', NULL, 30, NULL, NULL, '2024-05-10 08:52:43', '2024-05-10 08:52:43', NULL),
('Sadad', 'Didandkan', '1', 'Jepipdj', 'profile.png', NULL, 31, NULL, NULL, '2024-05-10 08:52:43', '2024-05-10 08:52:43', NULL),
('Jefyokta123456', 'Usiduisud', '1', 'Ayoyai', 'profile.png', NULL, 32, NULL, NULL, '2024-05-10 08:52:43', '2024-05-10 08:52:43', NULL),
('Jefyoktamipa', 'Jefyoktamipa123', '123', 'Jeffff@gmail.com', 'profile.png', NULL, 33, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzMsInVzZXJuYW1lIjoiSmVmeW9rdGFtaXBhIiwiZW1haWwiOiJKZWZmZmZAZ21haWwuY29tIiwiZ2FtYmFyIjoicHJvZmlsZS5wbmciLCJyb2xlIjpudWxsLCJpYXQiOjE3MTQxNzg3NDF9.Rv-rGDipQ9rQIBqzpWQfCkJforwkBmh9VS8E-6YJVos', NULL, '2024-05-10 08:52:43', '2024-05-10 08:52:43', NULL),
('Costumer1', 'Constumer test 1', '1', 'Constumer1@gmail.com', 'profile.png', NULL, 34, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzQsInVzZXJuYW1lIjoiQ29zdHVtZXIxIiwiZW1haWwiOiJDb25zdHVtZXIxQGdtYWlsLmNvbSIsImdhbWJhciI6InByb2ZpbGUucG5nIiwicm9sZSI6bnVsbCwiaWF0IjoxNzE0MTc5NjAzfQ.JhOWD34gb5xmrkHidXcg1f9mxXj7WKPOjQARnLTH5iM', NULL, '2024-05-10 08:52:43', '2024-05-10 08:52:43', NULL),
('I punk', 'Ipunkdi', '31081665', 'Ipunk1223@gmail.com', 'profile.png', NULL, 35, NULL, NULL, '2024-05-10 08:52:43', '2024-05-10 08:52:43', NULL),
('sintia', 'saumi sintia', '123', 'saumisinita@gmail.com', 'profile.png', 1, 36, NULL, NULL, '2024-05-10 08:52:43', '2024-05-10 08:52:43', NULL),
('CStest', 'Costumer tesst', '123', 'Cstest@gmail.com', 'profile.png', NULL, 37, NULL, NULL, '2024-05-11 01:43:11', '2024-05-11 01:43:11', NULL),
('fauzan', 'Fauza Khalid', '123', 'f4uzankhalid@gmail.com', 'profile.png', 1, 38, NULL, NULL, '2024-05-13 14:20:47', '2024-05-13 14:20:47', NULL),
('Ivandi', 'Irvandi kurniawan', '123', 'Fathanfanrita76@gmail.com', 'profile.png', NULL, 39, NULL, NULL, '2024-05-14 17:20:50', '2024-05-14 17:25:55', NULL),
('Fauzankhalid', 'Fauzan Khalid', '123', 'Fauzankhalid@gmail.com', 'profile.png', NULL, 40, NULL, NULL, '2024-05-14 21:06:08', '2024-05-14 21:06:08', NULL),
('Awan', 'Awan Keven', '123', 'Jfytest', 'profile.png', NULL, 41, NULL, NULL, '2024-05-16 23:22:56', '2024-05-16 23:22:56', NULL),
('test12', 'User for test', '123', 'Usertest', 'default/jepi2.png', NULL, 42, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDIsInVzZXJuYW1lIjoidGVzdDEyIiwiZW1haWwiOiJVc2VydGVzdCIsImdhbWJhciI6InByb2ZpbGUucG5nIiwicm9sZSI6bnVsbCwiaWF0IjoxNzE2MDA4NzEzfQ.dCp-tiekVzBTdT8T5fDTB4WTpO43MM_MxtKOE9tl8-M', NULL, '2024-05-18 12:05:13', '2024-05-18 12:05:13', NULL),
('Illunca', 'Akmal Lahia', '123second', 'Badakmal29@gmail.com', 'default/jepi3.png', NULL, 43, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDMsInVzZXJuYW1lIjoiSWxsdW5jYSIsImVtYWlsIjoiQmFkYWttYWwyOUBnbWFpbC5jb20iLCJnYW1iYXIiOiJwcm9maWxlLnBuZyIsInJvbGUiOm51bGwsImlhdCI6MTcxNjE5MDUxMX0.W-3rr-bEQejNvrLuG6Bhjd59YJ64botQKD6MULsxRE8', NULL, '2024-05-20 14:35:11', '2024-05-20 14:35:11', NULL),
('Jefokta', 'Jefyoktamipa', 'jefy', 'Jefyoktaaaa@gmail.com', 'profile.png', NULL, 44, NULL, NULL, '2024-06-09 23:26:16', '2024-06-09 23:26:16', NULL),
('Jeff', 'Jefyokta', '123', 'Jefff@gmail.com', 'profile.png', NULL, 45, NULL, NULL, '2024-06-09 23:48:20', '2024-06-09 23:48:20', NULL),
('Testdemo', 'Test', '123', 'Test@gmail.com', 'profile.png', NULL, 46, NULL, NULL, '2024-06-10 00:07:25', '2024-06-10 00:07:25', NULL),
('Jefff', 'Tetsttt', '123123', 'Ftesttt@gmail.com', 'profile.png', NULL, 47, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDcsInVzZXJuYW1lIjoiSmVmZmYiLCJlbWFpbCI6IkZ0ZXN0dHRAZ21haWwuY29tIiwiZ2FtYmFyIjoicHJvZmlsZS5wbmciLCJyb2xlIjpudWxsLCJpYXQiOjE3MTc5NTQyMTF9.a0VYrNj-xDZxrvUaHjRSR-tFGg8lgqlssT8wngf29Zo', NULL, '2024-06-10 00:12:39', '2024-06-10 00:12:39', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user` (`user`),
  ADD KEY `orderid` (`orderid`);

--
-- Indexes for table `pesanan`
--
ALTER TABLE `pesanan`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idproduk` (`idproduk`),
  ADD KEY `user` (`user`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `rate`
--
ALTER TABLE `rate`
  ADD PRIMARY KEY (`id`),
  ADD KEY `productid` (`productid`),
  ADD KEY `userid` (`userid`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`) USING BTREE,
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=117;

--
-- AUTO_INCREMENT for table `rate`
--
ALTER TABLE `rate`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`user`) REFERENCES `users` (`id`);

--
-- Constraints for table `pesanan`
--
ALTER TABLE `pesanan`
  ADD CONSTRAINT `pesanan_ibfk_2` FOREIGN KEY (`idproduk`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pesanan_ibfk_3` FOREIGN KEY (`user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `rate`
--
ALTER TABLE `rate`
  ADD CONSTRAINT `rate_ibfk_1` FOREIGN KEY (`productid`) REFERENCES `product` (`id`),
  ADD CONSTRAINT `rate_ibfk_2` FOREIGN KEY (`userid`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
