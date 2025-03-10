CREATE TABLE felhasznalok (
    id INT AUTO_INCREMENT PRIMARY KEY,
    neve VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    telefonszam VARCHAR(20),
    szuldatum DATE,
    admin BOOLEAN DEFAULT FALSE
);

CREATE TABLE termekek (
    id INT AUTO_INCREMENT PRIMARY KEY,
    neve VARCHAR(255) NOT NULL,
    ara DECIMAL(10, 2) NOT NULL,
    kat VARCHAR(100),
    gyarto_beszallito VARCHAR(255)
);

CREATE TABLE kosar_termekek (
    felhasznalo_id INT,
    termek_id INT,
    mennyiseg INT NOT NULL,
    FOREIGN KEY (felhasznalo_id) REFERENCES felhasznalok(id),
    FOREIGN KEY (termek_id) REFERENCES termekek(id)
);

CREATE TABLE kuponkodok (
    kod VARCHAR(50) PRIMARY KEY,
    ertek VARCHAR(255)
);

CREATE TABLE login (
    felhasznalo_id INT,
    user VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY (felhasznalo_id, user),
    FOREIGN KEY (felhasznalo_id) REFERENCES felhasznalok(id)
);

CREATE TABLE rendelesek (
    id INT AUTO_INCREMENT PRIMARY KEY,
    felhasznalo_id INT,
    cim VARCHAR(255) NOT NULL,
    vasarlas_osszeg DECIMAL(10, 2) NOT NULL,
    rendeles_datum DATETIME NOT NULL,
    FOREIGN KEY (felhasznalo_id) REFERENCES felhasznalok(id)
);

CREATE TABLE rendeles_termekek (
    rendeles_id INT,
    termek_id INT,
    mennyiseg INT NOT NULL,
    PRIMARY KEY (rendeles_id, termek_id),
    FOREIGN KEY (rendeles_id) REFERENCES rendelesek(id),
    FOREIGN KEY (termek_id) REFERENCES termekek(id)
);

INSERT INTO `felhasznalok` (`id`, `neve`, `email`, `telefonszam`, `szuldatum`, `admin`) VALUES
(1, 'Kovacs Adam', 'adam.kovacs@example.com', '123456789', '1985-05-20', TRUE),
(2, 'Szabo Eva', 'eva.szabo@example.com', '987654321', '1990-07-15', FALSE),
(3, 'Nagy Bela', 'bela.nagy@example.com', '456123789', '1982-03-12', FALSE),
(4, 'Toth Krisztina', 'krisztina.toth@example.com', '789321456', '1995-09-22', FALSE),
(5, 'Varga Peter', 'peter.varga@example.com', '321654987', '1988-01-05', FALSE),
(6, 'Kiss Anna', 'anna.kiss@example.com', '654789123', '1992-11-30', FALSE),
(7, 'Molnar Lajos', 'lajos.molnar@example.com', '741852963', '1980-06-18', FALSE),
(8, 'Horvath Zoltan', 'zoltan.horvath@example.com', '963258741', '1978-02-14', FALSE),
(9, 'Farkas Katalin', 'katalin.farkas@example.com', '159753486', '1987-04-25', FALSE),
(10, 'Balogh Csilla', 'csilla.balogh@example.com', '852741369', '1994-12-10', FALSE),
(11, 'Simon Andras', 'andras.simon@example.com', '753951456', '1986-10-01', FALSE),
(12, 'Papp Jozsef', 'jozsef.papp@example.com', '951753852', '1991-08-17', FALSE),
(13, 'Szilagyi Eszter', 'eszter.szilagyi@example.com', '147258369', '1984-12-05', FALSE),
(14, 'Veres Karoly', 'karoly.veres@example.com', '369258147', '1983-03-08', FALSE),
(15, 'Bodnar Erzsebet', 'erzsebet.bodnar@example.com', '258147369', '1996-07-20', FALSE);

INSERT INTO `kosar_termekek` (`felhasznalo_id`, `termek_id`, `mennyiseg`) VALUES
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

INSERT INTO `rendelesek` (`id`, `felhasznalo_id`, `cim`, `vasarlas_osszeg`, `rendeles_datum`) VALUES
(1, 1, 'Budapest, Kossuth utca 12.', '250000.00', '2025-03-03 15:55:14'),
(2, 2, 'Debrecen, Fő tér 5.', '180000.00', '2025-03-03 15:55:14'),
(3, 2, 'Debrecen, Petőfi utca 8.', '120000.00', '2025-03-03 15:55:14');

INSERT INTO `rendeles_termekek` (`rendeles_id`, `termek_id`, `mennyiseg`) VALUES
(1, 1, 1),
(1, 5, 1),
(2, 3, 1),
(3, 2, 1),
(1, 5, 1),
(1, 5, 1);

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