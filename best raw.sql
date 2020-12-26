-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 26, 2020 at 09:56 AM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.2.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rumah_sakit`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `lihatObat_Bentuk_Obat` (`BentukObat` VARCHAR(10))  BEGIN
SELECT * FROM tabel_obat
WHERE Bentuk_Obat = BentukObat;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `username` varchar(25) NOT NULL,
  `kodeObat` varchar(25) NOT NULL,
  `quantity` int(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `log_perubahan`
--

CREATE TABLE `log_perubahan` (
  `Log_Id` int(11) NOT NULL,
  `Log_Kode_Obat` varchar(15) DEFAULT NULL,
  `Log_Nama_Obat` varchar(15) DEFAULT NULL,
  `Log_Harga_Lama` int(10) DEFAULT NULL,
  `Log_Harga_Baru` int(10) DEFAULT NULL,
  `Log_Tgl_Update` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `log_perubahan`
--

INSERT INTO `log_perubahan` (`Log_Id`, `Log_Kode_Obat`, `Log_Nama_Obat`, `Log_Harga_Lama`, `Log_Harga_Baru`, `Log_Tgl_Update`) VALUES
(1, 'KPRNS1723', 'RHINNOS', 45000, 1000, '2020-12-12'),
(2, 'KPRNS1723', 'RHINNOS', 1000, 45000, '2020-12-12');

-- --------------------------------------------------------

--
-- Table structure for table `obat_kadaluarsa`
--

CREATE TABLE `obat_kadaluarsa` (
  `exp_Kode_Obat` varchar(15) DEFAULT NULL,
  `exp_Nama_Obat` varchar(15) DEFAULT NULL,
  `exp_Tgl_Exp` date DEFAULT NULL,
  `aksi` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `obat_kadaluarsa`
--

INSERT INTO `obat_kadaluarsa` (`exp_Kode_Obat`, `exp_Nama_Obat`, `exp_Tgl_Exp`, `aksi`) VALUES
('KPRNS1723', 'RHINNOS', '2020-12-12', 'Obat ini sudah kadaluarsa');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `username` varchar(25) NOT NULL,
  `date` date NOT NULL,
  `kodeObat` varchar(25) NOT NULL,
  `namaObat` varchar(25) NOT NULL,
  `hargaSatuan` int(25) NOT NULL,
  `bentukObat` varchar(25) NOT NULL,
  `quantity` int(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tabel_obat`
--

CREATE TABLE `tabel_obat` (
  `Kode_Obat` varchar(10) NOT NULL,
  `Nama_Obat` varchar(15) NOT NULL,
  `Bentuk_Obat` enum('Salep','Syrup','Kaplet','Tablet') NOT NULL,
  `Tgl_Produksi` date NOT NULL,
  `Tgl_Kadaluarsa` date NOT NULL,
  `Harga_Satuan` int(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tabel_obat`
--

INSERT INTO `tabel_obat` (`Kode_Obat`, `Nama_Obat`, `Bentuk_Obat`, `Tgl_Produksi`, `Tgl_Kadaluarsa`, `Harga_Satuan`) VALUES
('KPRNS1723', 'RHINNOS', 'Kaplet', '2017-02-02', '2023-01-31', 45000),
('SLMNZ1520', 'MICONAZOLE', 'Salep', '2015-09-15', '2020-12-09', 18000),
('SRSCF1723', 'SUCRALFATE', 'Syrup', '2017-03-23', '2023-03-20', 62500),
('SRZNP1723', 'ZINCPRO', 'Syrup', '2017-02-02', '2023-01-31', 15000),
('TBALD1723', 'AMLODIPINE', 'Tablet', '2017-02-02', '2023-01-31', 51000);

--
-- Triggers `tabel_obat`
--
DELIMITER $$
CREATE TRIGGER `log_update` BEFORE UPDATE ON `tabel_obat` FOR EACH ROW begin
if old.Harga_Satuan != new.Harga_Satuan then
insert into log_perubahan
set
Log_Kode_Obat = OLD.Kode_Obat,
Log_Nama_Obat = OLD.Nama_Obat,
Log_Harga_Lama = OLD.Harga_Satuan,
Log_Harga_Baru = NEW.Harga_Satuan,
Log_Tgl_Update = NOW() ;
end if;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `obat_exp` AFTER UPDATE ON `tabel_obat` FOR EACH ROW begin
if new.Tgl_Kadaluarsa <= new.Tgl_Produksi Then
insert into obat_kadaluarsa
set
exp_Kode_Obat = NEW.Kode_Obat,
exp_Tgl_Exp = NEW.Tgl_Kadaluarsa,
exp_Nama_Obat = NEW.Nama_Obat,
aksi = "Obat ini sudah kadaluarsa" ;
end if;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `tabel_persediaan`
--

CREATE TABLE `tabel_persediaan` (
  `Kode_Obat` varchar(10) NOT NULL,
  `Jumlah_Sedia` int(5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tabel_persediaan`
--

INSERT INTO `tabel_persediaan` (`Kode_Obat`, `Jumlah_Sedia`) VALUES
('SLMNZ1520', 65),
('SRSCF1723', 77),
('SRZNP1723', 74),
('KPRNS1723', 67),
('TBALD1723', 36);

-- --------------------------------------------------------

--
-- Table structure for table `tabel_transaksi`
--

CREATE TABLE `tabel_transaksi` (
  `Kode_Obat` varchar(10) NOT NULL,
  `Tgl_Transaksi` date NOT NULL,
  `Jumlah_Obat` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tabel_transaksi`
--

INSERT INTO `tabel_transaksi` (`Kode_Obat`, `Tgl_Transaksi`, `Jumlah_Obat`) VALUES
('KPRNS1723', '2019-01-15', 17),
('KPRNS1723', '2019-03-15', 16),
('SLMNZ1520', '2019-01-13', 23),
('SLMNZ1520', '2019-02-13', 12),
('SRSCF1723', '2019-01-15', 14),
('SRSCF1723', '2019-03-15', 9),
('SRZNP1723', '2019-01-15', 6),
('SRZNP1723', '2019-02-11', 20),
('TBALD1723', '2019-01-15', 43),
('TBALD1723', '2019-03-15', 21);

--
-- Triggers `tabel_transaksi`
--
DELIMITER $$
CREATE TRIGGER `update_persediaan` AFTER INSERT ON `tabel_transaksi` FOR EACH ROW begin
update tabel_persediaan
set jumlah_sedia = jumlah_sedia - new.jumlah_obat
where 
tabel_persediaan.kode_obat = new.kode_obat;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `firstName` varchar(25) NOT NULL,
  `lastName` varchar(25) NOT NULL,
  `username` varchar(25) NOT NULL,
  `password` varchar(25) NOT NULL,
  `userType` enum('user','admin') NOT NULL,
  `balance` int(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`firstName`, `lastName`, `username`, `password`, `userType`, `balance`) VALUES
('admin', 'admin', 'admin', '123', 'admin', 100000000),
('Rainaldi', 'Satria', 'aldi', '123', 'user', 100000000);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`kodeObat`,`username`) USING BTREE,
  ADD KEY `username` (`username`);

--
-- Indexes for table `log_perubahan`
--
ALTER TABLE `log_perubahan`
  ADD PRIMARY KEY (`Log_Id`);

--
-- Indexes for table `tabel_obat`
--
ALTER TABLE `tabel_obat`
  ADD PRIMARY KEY (`Kode_Obat`);

--
-- Indexes for table `tabel_transaksi`
--
ALTER TABLE `tabel_transaksi`
  ADD PRIMARY KEY (`Kode_Obat`,`Tgl_Transaksi`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `log_perubahan`
--
ALTER TABLE `log_perubahan`
  MODIFY `Log_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`username`) REFERENCES `users` (`username`),
  ADD CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`kodeObat`) REFERENCES `tabel_obat` (`Kode_Obat`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
