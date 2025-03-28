-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Már 10. 12:18
-- Kiszolgáló verziója: 10.4.27-MariaDB
-- PHP verzió: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `hypercharge`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `felhasznalok`
--

CREATE TABLE `felhasznalok` (
  `id` int(11) NOT NULL,
  `neve` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `telefonszam` varchar(20) DEFAULT NULL,
  `szuldatum` date DEFAULT NULL,
  `admin` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `felhasznalok`
--

INSERT INTO `felhasznalok` (`id`, `neve`, `email`, `telefonszam`, `szuldatum`, `admin`) VALUES
(1, 'Kovacs Adam', 'adam.kovacs@example.com', '123456789', '1985-05-20', 1),
(2, 'Szabo Eva', 'eva.szabo@example.com', '987654321', '1990-07-15', 0),
(3, 'Nagy Bela', 'bela.nagy@example.com', '456123789', '1982-03-12', 0),
(4, 'Toth Krisztina', 'krisztina.toth@example.com', '789321456', '1995-09-22', 0),
(5, 'Varga Peter', 'peter.varga@example.com', '321654987', '1988-01-05', 0),
(6, 'Kiss Anna', 'anna.kiss@example.com', '654789123', '1992-11-30', 0),
(7, 'Molnar Lajos', 'lajos.molnar@example.com', '741852963', '1980-06-18', 0),
(8, 'Horvath Zoltan', 'zoltan.horvath@example.com', '963258741', '1978-02-14', 0),
(9, 'Farkas Katalin', 'katalin.farkas@example.com', '159753486', '1987-04-25', 0),
(10, 'Balogh Csilla', 'csilla.balogh@example.com', '852741369', '1994-12-10', 0),
(11, 'Simon Andras', 'andras.simon@example.com', '753951456', '1986-10-01', 0),
(12, 'Papp Jozsef', 'jozsef.papp@example.com', '951753852', '1991-08-17', 0),
(13, 'Szilagyi Eszter', 'eszter.szilagyi@example.com', '147258369', '1984-12-05', 0),
(14, 'Veres Karoly', 'karoly.veres@example.com', '369258147', '1983-03-08', 0),
(15, 'Bodnar Erzsebet', 'erzsebet.bodnar@example.com', '258147369', '1996-07-20', 0);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `kosar`
--

CREATE TABLE `kosar` (
  `id` int(11) NOT NULL,
  `felhasznalo_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `kosar_termekek`
--

CREATE TABLE `kosar_termekek` (
  `felhasznalo_id` int(11) DEFAULT NULL,
  `termek_id` int(11) DEFAULT NULL,
  `mennyiseg` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `kosar_termekek`
--

INSERT INTO `kosar_termekek` (`felhasznalo_id`, `termek_id`, `mennyiseg`) VALUES
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
-- Tábla szerkezet ehhez a táblához `kuponkodok`
--

CREATE TABLE `kuponkodok` (
  `kod` varchar(50) NOT NULL,
  `ertek` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `login`
--

CREATE TABLE `login` (
  `felhasznalo_id` int(11) NOT NULL,
  `user` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `login`
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
-- Tábla szerkezet ehhez a táblához `rendelesek`
--

CREATE TABLE `rendelesek` (
  `id` int(11) NOT NULL,
  `felhasznalo_id` int(11) DEFAULT NULL,
  `cim` varchar(255) NOT NULL,
  `vasarlas_osszeg` int(11) NOT NULL,
  `rendeles_datum` datetime NOT NULL,
  `kezbesitett` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `rendelesek`
--

INSERT INTO `rendelesek` (`id`, `felhasznalo_id`, `cim`, `vasarlas_osszeg`, `rendeles_datum`, `kezbesitett`) VALUES
(1, 1, 'Budapest, Kossuth utca 12.', '250000', '2025-03-03 15:55:14', 0),
(2, 2, 'Debrecen, Fő tér 5.', '180000', '2025-03-03 15:55:14', 0),
(3, 2, 'Debrecen, Petőfi utca 8.', '120000', '2025-03-03 15:55:14', 0);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `rendeles_termekek`
--

CREATE TABLE `rendeles_termekek` (
  `rendeles_id` int(11) DEFAULT NULL,
  `termek_id` int(11) NOT NULL,
  `mennyiseg` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `rendeles_termekek`
--

INSERT INTO `rendeles_termekek` (`rendeles_id`, `termek_id`, `mennyiseg`) VALUES
(1, 1, 1),
(1, 5, 1),
(2, 3, 1),
(3, 2, 1),
(1, 5, 1),
(1, 5, 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `termekek`
--

CREATE TABLE `termekek` (
  `id` int(11) NOT NULL,
  `neve` varchar(255) NOT NULL,
  `ara` int(11) NOT NULL,
  `kat` varchar(100) DEFAULT NULL,
  `gyarto_beszallito` varchar(255) DEFAULT NULL,
  `kep` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `termekek`
--

INSERT INTO `termekek` (`id`, `neve`, `ara`, `kat`, `gyarto_beszallito`, `kep`) VALUES
(1, 'Laptop', '250000', 'Elektronika', 'Dell', 'laptop.jpg'),
(2, 'Telefon', '120000', 'Elektronika', 'Samsung', 'telefon.jpg'),
(3, 'Televízió', '180000', 'Elektronika', 'LG', 'televizio.jpg'),
(4, 'Hűtőszekrény', '200000', 'Háztartás', 'Bosch', 'huto.jpg'),
(5, 'Mosógép', '150000', 'Háztartás', 'Whirlpool', 'mosogep.jpg'),
(6, 'Porszívó', '80000', 'Háztartás', 'Dyson', 'porszivo.jpg'),
(7, 'Fülhallgató', '25000', 'Elektronika', 'Sony', 'fulhallgato.jpg'),
(8, 'Okosóra', '60000', 'Elektronika', 'Apple', 'okosora.jpg'),
(9, 'Tablet', '90000', 'Elektronika', 'Huawei', 'tablet.jpg'),
(10, 'Nyomtató', '50000', 'Elektronika', 'HP', 'nyomtató.jpg'),
(11, 'Szék', '20000', 'Bútor', 'IKEA', 'szek.jpg'),
(12, 'Asztal', '40000', 'Bútor', 'IKEA', 'asztal.jpg'),
(13, 'Szekrény', '60000', 'Bútor', 'JYSK', 'szekreny.jpg'),
(14, 'Könyvespolc', '30000', 'Bútor', 'IKEA', 'konyvespolc.jpg'),
(15, 'Ágy', '70000', 'Bútor', 'JYSK', 'agy.jpg'),
(16, 'Kanapé', '120000', 'Bútor', 'IKEA', 'kanape.jpg'),
(17, 'Fotel', '50000', 'Bútor', 'JYSK', 'fotel.jpg'),
(18, 'Tükör', '15000', 'Bútor', 'IKEA', 'tukor.jpg'),
(19, 'Lámpa', '20000', 'Bútor', 'Philips', 'lamp.jpg'),
(20, 'Szőnyeg', '30000', 'Bútor', 'IKEA', 'szonyeg.jpg');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `felhasznalok`
--
ALTER TABLE `felhasznalok`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- A tábla indexei `kosar`
--
ALTER TABLE `kosar`
  ADD PRIMARY KEY (`id`),
  ADD KEY `felhasznalo_id` (`felhasznalo_id`);

--
-- A tábla indexei `kosar_termekek`
--
ALTER TABLE `kosar_termekek`
  ADD KEY `felhasznalo_id` (`felhasznalo_id`),
  ADD KEY `termek_id` (`termek_id`);

--
-- A tábla indexei `kuponkodok`
--
ALTER TABLE `kuponkodok`
  ADD PRIMARY KEY (`kod`);

--
-- A tábla indexei `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`felhasznalo_id`,`user`);

--
-- A tábla indexei `rendelesek`
--
ALTER TABLE `rendelesek`
  ADD PRIMARY KEY (`id`),
  ADD KEY `felhasznalo_id` (`felhasznalo_id`);

--
-- A tábla indexei `rendeles_termekek`
--
ALTER TABLE `rendeles_termekek`
  ADD KEY `rendeles_id` (`rendeles_id`);

--
-- A tábla indexei `termekek`
--
ALTER TABLE `termekek`
  ADD PRIMARY KEY (`id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `felhasznalok`
--
ALTER TABLE `felhasznalok`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT a táblához `kosar`
--
ALTER TABLE `kosar`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `rendelesek`
--
ALTER TABLE `rendelesek`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT a táblához `termekek`
--
ALTER TABLE `termekek`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `kosar`
--
ALTER TABLE `kosar`
  ADD CONSTRAINT `kosar_ibfk_1` FOREIGN KEY (`felhasznalo_id`) REFERENCES `felhasznalok` (`id`);

--
-- Megkötések a táblához `kosar_termekek`
--
ALTER TABLE `kosar_termekek`
  ADD CONSTRAINT `kosar_termekek_ibfk_1` FOREIGN KEY (`felhasznalo_id`) REFERENCES `felhasznalok` (`id`),
  ADD CONSTRAINT `kosar_termekek_ibfk_2` FOREIGN KEY (`termek_id`) REFERENCES `termekek` (`id`);

--
-- Megkötések a táblához `login`
--
ALTER TABLE `login`
  ADD CONSTRAINT `login_ibfk_1` FOREIGN KEY (`felhasznalo_id`) REFERENCES `felhasznalok` (`id`);

--
-- Megkötések a táblához `rendelesek`
--
ALTER TABLE `rendelesek`
  ADD CONSTRAINT `rendelesek_ibfk_1` FOREIGN KEY (`felhasznalo_id`) REFERENCES `felhasznalok` (`id`);

--
-- Megkötések a táblához `rendeles_termekek`
--
ALTER TABLE `rendeles_termekek`
  ADD CONSTRAINT `rendeles_termekek_ibfk_1` FOREIGN KEY (`rendeles_id`) REFERENCES `rendelesek` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
