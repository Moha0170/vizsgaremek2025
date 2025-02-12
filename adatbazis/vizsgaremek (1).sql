-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 22, 2025 at 01:22 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vizsgaremek`
--

-- --------------------------------------------------------

--
-- Table structure for table `felhasznalok`
--

CREATE TABLE `felhasznalok` (
  `id` int(11) NOT NULL,
  `neve` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `telefonszam` varchar(20) DEFAULT NULL,
  `szuldatum` date DEFAULT NULL,
  `husegpont` int(11) DEFAULT 0,
  `admin` BOOLEAN NOT NULL DEFAULT FALSE

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `felhasznalok`
--

INSERT INTO `felhasznalok` (`id`, `neve`, `email`, `telefonszam`, `szuldatum`, `husegpont`, `admin`) VALUES
(1, 'Kovacs Adam', 'adam.kovacs@example.com', '123456789', '1985-05-20', 10, TRUE),
(2, 'Szabo Eva', 'eva.szabo@example.com', '987654321', '1990-07-15', 20, FALSE),
(3, 'Nagy Bela', 'bela.nagy@example.com', '456123789', '1982-03-12', 15, FALSE),
(4, 'Toth Krisztina', 'krisztina.toth@example.com', '789321456', '1995-09-22', 30, FALSE),
(5, 'Varga Peter', 'peter.varga@example.com', '321654987', '1988-01-05', 25, FALSE),
(6, 'Kiss Anna', 'anna.kiss@example.com', '654789123', '1992-11-30', 5, FALSE),
(7, 'Molnar Lajos', 'lajos.molnar@example.com', '741852963', '1980-06-18', 40, FALSE),
(8, 'Horvath Zoltan', 'zoltan.horvath@example.com', '963258741', '1978-02-14', 50, FALSE),
(9, 'Farkas Katalin', 'katalin.farkas@example.com', '159753486', '1987-04-25', 35, FALSE),
(10, 'Balogh Csilla', 'csilla.balogh@example.com', '852741369', '1994-12-10', 20, FALSE),
(11, 'Simon Andras', 'andras.simon@example.com', '753951456', '1986-10-01', 15, FALSE),
(12, 'Papp Jozsef', 'jozsef.papp@example.com', '951753852', '1991-08-17', 25, FALSE),
(13, 'Szilagyi Eszter', 'eszter.szilagyi@example.com', '147258369', '1984-12-05', 10, FALSE),
(14, 'Veres Karoly', 'karoly.veres@example.com', '369258147', '1983-03-08', 5, FALSE),
(15, 'Bodnar Erzsebet', 'erzsebet.bodnar@example.com', '258147369', '1996-07-20', 30, FALSE);

-- --------------------------------------------------------

--
-- Table structure for table `kosar`
--

CREATE TABLE `kosar` (
  `id` int(11) NOT NULL,
  `felhasznalo_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `kosar`
--

INSERT INTO `kosar` (`id`, `felhasznalo_id`) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(6, 6),
(7, 7),
(8, 8),
(9, 9),
(10, 10),
(11, 11),
(12, 12),
(13, 13),
(14, 14),
(15, 15);

-- --------------------------------------------------------

--
-- Table structure for table `kosar_termekek`
--

CREATE TABLE `kosar_termekek` (
  `kosar_id` int(11) NOT NULL,
  `termek_id` int(11) NOT NULL,
  `mennyiseg` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `kosar_termekek`
--

INSERT INTO `kosar_termekek` (`kosar_id`, `termek_id`, `mennyiseg`) VALUES
(1, 1, 1),
(2, 2, 2),
(3, 3, 1),
(4, 4, 1),
(5, 5, 1),
(6, 6, 1),
(7, 7, 3),
(8, 8, 1),
(9, 9, 1),
(10, 10, 1),
(11, 11, 1),
(12, 12, 2),
(13, 13, 1),
(14, 14, 1),
(15, 15, 1);

-- --------------------------------------------------------

--
-- Table structure for table `kuponkodok`
--

CREATE TABLE `kuponkodok` (
  `id` int(11) NOT NULL,
  `neve` varchar(255) NOT NULL,
  `kedvezmeny_szazalek` int(11) NOT NULL,
  `minimum_vasarlas` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `kuponkodok`
--

INSERT INTO `kuponkodok` (`id`, `neve`, `kedvezmeny_szazalek`, `minimum_vasarlas`) VALUES
(1, 'KUPON10', 10, '10000.00'),
(2, 'KUPON20', 20, '20000.00'),
(3, 'KUPON30', 30, '30000.00'),
(4, 'KUPON40', 40, '40000.00'),
(5, 'KUPON50', 50, '50000.00'),
(6, 'KUPON60', 60, '60000.00'),
(7, 'KUPON70', 70, '70000.00'),
(8, 'KUPON80', 80, '80000.00'),
(9, 'KUPON90', 90, '90000.00'),
(10, 'KUPON100', 100, '100000.00'),
(11, 'KUPON15', 15, '15000.00'),
(12, 'KUPON25', 25, '25000.00'),
(13, 'KUPON35', 35, '35000.00'),
(14, 'KUPON45', 45, '45000.00'),
(15, 'KUPON55', 55, '55000.00');

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

CREATE TABLE `login` (
  `felhasznalo_id` int(11) NOT NULL,
  `user` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `login`
--

INSERT INTO `login` (`felhasznalo_id`, `user`, `password`) VALUES
(1, 'adamkovacs', '$argon2id$v=19$m=16,t=2,p=1$TUZZM3Y1OFlIUm0yY2NWMQ$qGQDyOu54Ws4RI9KnR12xQ'),
(2, 'evaszabo', '$argon2id$v=19$m=16,t=2,p=1$Tll5Zm9qMTJyS2VmQUhkbQ$VXmMTa9ZjB6ZHmPtp/BgFA'),
(3, 'belanagy', '$argon2id$v=19$m=16,t=2,p=1$UnlKTkdIc1FMWXhFOFM5Tg$9kz+2FRn8EBubKnjPpQPdA'),
(4, 'krisztinatoth', '$argon2id$v=19$m=16,t=2,p=1$b0JuMkVNekEzZmJacngxYQ$T2pxGgCDqhs+3boa5cieiQ'),
(5, 'petervarga', '$argon2id$v=19$m=16,t=2,p=1$VXQ4MEFBUzZHTENMREN5dA$43l20TvsqrKCowEV+2EEBA'),
(6, 'annakiss', '$argon2id$v=19$m=16,t=2,p=1$cEVNaWRlcDJ5V294RWhDeQ$CaudKCU517TK46ngUC+gpQ'),
(7, 'lajosmolnar', '$argon2id$v=19$m=16,t=2,p=1$enhKdXNoWTFMR0tOa1NFTw$OQIRuIesbhoypsUCNyg+Nw'),
(8, 'zoltanhorvath', '$argon2id$v=19$m=16,t=2,p=1$bnViMDRjdEMwVzQxWmVERQ$XTnVGutzOjB9iI0JQgI2Vw'),
(9, 'katalinfarkas', '$argon2id$v=19$m=16,t=2,p=1$WHpNVjZiUm5CWDZqT3FIRQ$798xqdbqcx8F9grtN3Uogg'),
(10, 'csillabalogh', '$argon2id$v=19$m=16,t=2,p=1$YTh2M0NMaHhzTnVXU2pERA$2Ed+qyvJ06LY3X8WjLOJiQ'),
(11, 'andrassimons', '$argon2id$v=19$m=16,t=2,p=1$bFBzOWZCMklyUFptUE9iRA$7mxGHBe9iEsVUtQUl8ZWHQ'),
(12, 'jozsefpapp', '$argon2id$v=19$m=16,t=2,p=1$UHpaRWtIM05COTlQV2N5ag$D1uu37vb3xzHG/P5RK4Zmg'),
(13, 'eszterszilagyi', '$argon2id$v=19$m=16,t=2,p=1$UHpaRWtIM05COTlQV2N5ag$D1uu37vb3xzHG/P5RK4Zmg'),
(14, 'karolyveres', '$argon2id$v=19$m=16,t=2,p=1$c05FVmZ5cnhOZjNRajZPbQ$HxFUttQWbRHcBkXv9INmLA'),
(15, 'erzsebetbodnar', '$argon2id$v=19$m=16,t=2,p=1$aHI0MTFhN05aSUZya1J0Wg$yPgtPtWtc8qff5yOgquLYw');

-- --------------------------------------------------------

--
-- Table structure for table `termekek`
--

CREATE TABLE `termekek` (
  `id` int(11) NOT NULL,
  `neve` varchar(255) NOT NULL,
  `ara` decimal(10,2) NOT NULL,
  `kat` varchar(255) NOT NULL,
  `gyarto_beszallito` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `termekek`
--

INSERT INTO `termekek` (`id`, `neve`, `ara`, `kat`, `gyarto_beszallito`) VALUES
(1, 'Laptop', '250000.00', 'Elektronika', 'Dell'),
(2, 'Telefon', '120000.00', 'Elektronika', 'Samsung'),
(3, 'Televízió', '180000.00', 'Elektronika', 'LG'),
(4, 'Hűtőszekrény', '200000.00', 'Háztartás', 'Bosch'),
(5, 'Mosógép', '150000.00', 'Háztartás', 'Whirlpool'),
(6, 'Porszívó', '80000.00', 'Háztartás', 'Dyson'),
(7, 'Fülhallgató', '25000.00', 'Elektronika', 'Sony'),
(8, 'Okosóra', '60000.00', 'Elektronika', 'Apple'),
(9, 'Tablet', '90000.00', 'Elektronika', 'Huawei'),
(10, 'Nyomtató', '50000.00', 'Elektronika', 'HP'),
(11, 'Szék', '20000.00', 'Bútor', 'IKEA'),
(12, 'Asztal', '40000.00', 'Bútor', 'IKEA'),
(13, 'Szekrény', '60000.00', 'Bútor', 'JYSK'),
(14, 'Könyvespolc', '30000.00', 'Bútor', 'IKEA'),
(15, 'Ágy', '70000.00', 'Bútor', 'JYSK');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `felhasznalok`
--
ALTER TABLE `felhasznalok`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);


--
-- Indexes for table `kosar`
--
ALTER TABLE `kosar`
  ADD PRIMARY KEY (`id`),
  ADD KEY `felhasznalo_id` (`felhasznalo_id`);

--
-- Indexes for table `kosar_termekek`
--
ALTER TABLE `kosar_termekek`
  ADD PRIMARY KEY (`kosar_id`,`termek_id`),
  ADD KEY `termek_id` (`termek_id`);

--
-- Indexes for table `kuponkodok`
--
ALTER TABLE `kuponkodok`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`felhasznalo_id`),
  ADD UNIQUE KEY `user` (`user`);

--
-- Indexes for table `termekek`
--
ALTER TABLE `termekek`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `felhasznalok`
--
ALTER TABLE `felhasznalok`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `kosar`
--
ALTER TABLE `kosar`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `kuponkodok`
--
ALTER TABLE `kuponkodok`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `termekek`
--
ALTER TABLE `termekek`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `kosar`
--
ALTER TABLE `kosar`
  ADD CONSTRAINT `kosar_ibfk_1` FOREIGN KEY (`felhasznalo_id`) REFERENCES `felhasznalok` (`id`);

--
-- Constraints for table `kosar_termekek`
--
ALTER TABLE `kosar_termekek`
  ADD CONSTRAINT `kosar_termekek_ibfk_1` FOREIGN KEY (`kosar_id`) REFERENCES `kosar` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `kosar_termekek_ibfk_2` FOREIGN KEY (`termek_id`) REFERENCES `termekek` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `login`
--
ALTER TABLE `login`
  ADD CONSTRAINT `login_ibfk_1` FOREIGN KEY (`felhasznalo_id`) REFERENCES `felhasznalok` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
