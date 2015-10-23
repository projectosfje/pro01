-- phpMyAdmin SQL Dump
-- version 4.4.14
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Temps de generació: 23-10-2015 a les 12:34:44
-- Versió del servidor: 5.6.26
-- Versió de PHP: 5.6.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de dades: `bd_botiga_animals`
--
CREATE DATABASE IF NOT EXISTS `bd_botiga_animals` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
USE `bd_botiga_animals`;

-- --------------------------------------------------------

--
-- Estructura de la taula `tbl_anunci`
--

CREATE TABLE IF NOT EXISTS `tbl_anunci` (
  `anu_id` int(11) NOT NULL,
  `anu_contingut` varchar(255) NOT NULL,
  `anu_nom` varchar(25) NOT NULL,
  `anu_data` date NOT NULL,
  `anu_foto` varchar(50) NOT NULL,
  `raca_id` int(11) NOT NULL,
  `mun_id` int(11) NOT NULL,
  `contact_id` int(11) NOT NULL,
  `anu_tipus` varchar(10) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;

--
-- Bolcant dades de la taula `tbl_anunci`
--

INSERT INTO `tbl_anunci` (`anu_id`, `anu_contingut`, `anu_nom`, `anu_data`, `anu_foto`, `raca_id`, `mun_id`, `contact_id`, `anu_tipus`) VALUES
(1, 'Perdido perro de raza Beagle en la playa de El Prat de Llobregat (zona aeropuerto) el 11 de octubre por la mañana. Responde al nombre de Tacat.', 'Perdido beagle en El Prat', '2015-10-11', 'tacat.jpg', 14, 4, 2, 'Perdido'),
(2, 'Desaparecido gato con collar y placa con el nombre de Ratlletes. Es de tipo común, rayado de colores naranjas. Rambla Badal, Barcelona.', 'Gato perdido', '2015-10-15', 'gato1.jpg', 17, 1, 6, 'Perdido'),
(3, 'Perro encontrado en la calle, 20 de octubre', 'Perro encontrado', '2015-10-20', 'pastor.jpg', 9, 4, 4, 'Encontrado'),
(4, 'Periquito perdido en L''Hospitalet de Llobregat, colores blanco y azul celeste. Pequeña herida en una pata.', 'Periquito perdido', '2015-09-03', 'perico.jpg', 21, 5, 6, 'Perdido'),
(5, 'Se ha perdido un conejo en Rubi', 'Conejo Perdido', '2015-05-07', 'conejo.jpg', 23, 13, 4, 'Perdido'),
(6, 'Se ha encontrado un gato siames, si alguien lo a perdido que se comunique.', 'Gato siames encontrado', '2015-04-19', 'siames.jpg', 16, 3, 2, 'Encontrado'),
(7, 'Se ha encontrado un tejon en viladecans, si alguien la encuentra que lo comunique por favor.', 'Tejón encontrada', '2014-02-27', 'tejon.jpg', 25, 9, 7, 'Encontrado'),
(8, 'Se ha encontrado un canario de color rojo', 'Canario encontrado', '2014-05-27', 'canario.jpg', 20, 5, 1, 'Encontrado'),
(9, 'Se ha perdido un perro Husky en El Prat,si algien es su dueño lo acerque a la perrera local.', 'Husky encontrado', '2015-10-15', 'husky.jpg', 11, 4, 4, 'Encontrado'),
(10, 'Mi Hàmster se escapo de la jaula el otro dia y no lo encuentro por casa si algien lo encuentra que lo comunique.', 'Hàmster perdido', '2015-10-17', 'hamster.jpg', 24, 8, 3, 'Perdido'),
(11, 'Si algien ha perdido un gato Abisini que no dude en contactar con nosotros.', 'Abisini encontrado', '2015-09-20', 'abisini.jpg', 18, 9, 6, 'Perdido'),
(12, 'Gato Persa encontrado en a las afueras de la ciudad si has perdido uno y identificas este contacta con nosotros.', 'Gato Persa encontrado', '2015-09-10', 'persa.jpg', 15, 3, 2, 'Encontrado'),
(13, 'Canario perdido, si algien encuentra un canario de colores vistosos como el de la imagen que se ponga en contacto con nosotros.', 'Canario peridio', '2015-09-18', 'canario1.jpg', 20, 9, 3, 'Perdido'),
(14, 'Encontramos este fantastico perro cruzado o mestizo perdido en la calle,en su collar ponia Snoop', 'Perro mestizo encontrado', '2015-09-28', 'cruzado.jpg', 13, 7, 4, 'Encontrado'),
(15, 'Mi huron se escapo anoche persiquiendo una rata, si algien se lo encuentra lleva un collar de color rojo. ', 'Huron escapado', '2015-09-19', 'huron.jpg', 22, 6, 3, 'Perdido'),
(16, 'Se ha encontrado un pato vagando por las calles si es de algien que lo reclame', 'Pato encontrado', '2015-10-13', 'pato.jpg', 26, 9, 3, 'Encontrado'),
(17, 'Mi perico se escapo de la jaula cuando trataba de darle de comer, fue anoche y no volvio.', 'Periquito perdido', '2015-10-05', 'perico2.jpg', 21, 4, 1, 'Perdido'),
(18, 'Golden retriever encontrado en un callejon, lleva un collar con Tobi como nombre', 'Golden retriever ', '2015-10-12', 'retriever.jpg', 10, 5, 3, 'Encontrado'),
(19, 'Hemos encontrado un gato persa negro en la calle, contacta si cres que es tuyo', 'Gato persa perdido', '2015-09-22', 'persa2.jpg', 15, 8, 4, 'Perdido'),
(20, 'Hemos encontrado una cria de Beagle perdida en la calle, si nadie responde nos lo quedaremos en adopción.', 'Pequeño Beagle ', '2015-10-12', 'beagle1.jpg', 14, 15, 4, 'Encontrado'),
(21, 'Mi hamster huyo anoche al abrir la jaula para alimentarlo.', 'Hamster perdido', '2015-10-13', 'ham1.jpg', 24, 9, 4, 'Perdido'),
(22, 'Encontrado gato común de color blanco a las afueras de la ciudad.', 'Gato blanco ', '2015-10-19', 'gato3.jpg', 17, 4, 4, 'Encontrado'),
(23, 'Gato negro bobtail perido en Sant Feliu', 'Gato negro', '2015-09-20', 'bobtail.jpg', 19, 2, 2, 'Perdido'),
(24, 'Mi querido perro se ha perdio, si algien lo reconoce porfavor contactanos.', 'Mestizo perdido', '2015-09-20', 'mest1.jpg', 13, 6, 3, 'Perdido'),
(25, 'Este conejo se escapo de su jaula y no se ha vuelto a saber de el si algien ve a uno parecido que no dude en contactar', 'Conejo Perdido', '2015-09-18', 'conej1.jpg', 23, 9, 3, 'Perdido'),
(26, 'Hemos encontrado un cruze de doberman por la calle con collar de nombre Sparke', 'Perro cruzado ', '2015-09-13', 'cruz1.jpg', 13, 12, 3, 'Encontrado'),
(27, 'Tenemos un gato que trajo un hombre asegurando que se habia perdido.', 'Gato encontrado', '2015-10-15', 'gato2.jpg', 17, 14, 1, 'Encontrado'),
(28, 'Hemos encontrado un perico de estos colores, si lo reconoces contacta con nosotros.', 'Perico encontrado', '2015-10-12', 'peri.jpg', 21, 11, 3, 'Encontrado'),
(29, 'Se me ha escapado el huron tenia el pelaje de color marron intenso', 'Huron perdido', '2015-10-13', 'huro.jpg', 22, 13, 4, 'Perdido'),
(30, 'Se me escapo cuando estaba por el campo y no volvio,si algien sabe algo que diga algo.', 'Boxer perdido', '2015-09-18', 'boxer1.jpg', 8, 7, 3, 'Perdido');

-- --------------------------------------------------------

--
-- Estructura de la taula `tbl_contacte`
--

CREATE TABLE IF NOT EXISTS `tbl_contacte` (
  `contact_id` int(11) NOT NULL,
  `contact_nom` varchar(25) NOT NULL,
  `contact_telf` varchar(9) NOT NULL,
  `contact_adre` varchar(50) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

--
-- Bolcant dades de la taula `tbl_contacte`
--

INSERT INTO `tbl_contacte` (`contact_id`, `contact_nom`, `contact_telf`, `contact_adre`) VALUES
(1, 'Carles Martín', '934534236', ''),
(2, 'Antonio Gámez', '667542343', 'Carrer del Mig, 76 3r 1a'),
(3, 'Carlos Martínez', '654583454', ''),
(4, 'Isabel Vázquez', '698722284', ''),
(5, 'Pedro Santiesteban', '656989931', 'Avinguda Carrilet, 54 3r'),
(6, 'Sònia Gómez', '688341009', 'Gran Via de les Corts Catalanes, 12 Esc. A 3r 2a'),
(7, 'Patricia Martín', '932124654', '');

-- --------------------------------------------------------

--
-- Estructura de la taula `tbl_municipi`
--

CREATE TABLE IF NOT EXISTS `tbl_municipi` (
  `municipi_id` int(11) NOT NULL,
  `municipi_nom` varchar(25) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

--
-- Bolcant dades de la taula `tbl_municipi`
--

INSERT INTO `tbl_municipi` (`municipi_id`, `municipi_nom`) VALUES
(1, 'Barcelona'),
(2, 'Sant Feliu de Llobregat'),
(3, 'Sant Joan d''Espí'),
(4, 'El Prat de Llobregat'),
(5, 'L''Hospitalet de Llobregat'),
(6, 'Martorell'),
(7, 'Cornellà de Llobregat'),
(8, 'Castelldefels'),
(9, 'Viladecans'),
(10, 'Begues'),
(11, 'Castellbisbal'),
(12, 'Sant Sadurní d''Anoia'),
(13, 'Rubí'),
(14, 'Sant Cugat del Vallès'),
(15, 'Sitges'),
(16, 'Selecciona Municipio');

-- --------------------------------------------------------

--
-- Estructura de la taula `tbl_raca`
--

CREATE TABLE IF NOT EXISTS `tbl_raca` (
  `raca_id` int(11) NOT NULL,
  `raca_nom` varchar(25) NOT NULL,
  `tipus_anim_id` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;

--
-- Bolcant dades de la taula `tbl_raca`
--

INSERT INTO `tbl_raca` (`raca_id`, `raca_nom`, `tipus_anim_id`) VALUES
(8, 'Bòxer', 1),
(9, 'Pastor alemany', 1),
(10, 'Golden retriever', 1),
(11, 'Husky', 1),
(12, 'Border collie', 1),
(13, 'Creuat', 1),
(14, 'Beagle', 1),
(15, 'Persa', 2),
(16, 'Siamés', 2),
(17, 'Comú', 2),
(18, 'Abisini', 2),
(19, 'Bobtail', 2),
(20, 'Canari', 3),
(21, 'Periquito', 3),
(22, 'Fura', 4),
(23, 'Conill', 4),
(24, 'Hàmster', 4),
(25, 'Teixó', 4),
(26, 'Ànec', 4);

-- --------------------------------------------------------

--
-- Estructura de la taula `tbl_tipus_animal`
--

CREATE TABLE IF NOT EXISTS `tbl_tipus_animal` (
  `tipus_anim_id` int(11) NOT NULL,
  `tipus_anim_nom` varchar(25) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Bolcant dades de la taula `tbl_tipus_animal`
--

INSERT INTO `tbl_tipus_animal` (`tipus_anim_id`, `tipus_anim_nom`) VALUES
(1, 'Perro'),
(2, 'Gato'),
(3, 'Pajaro'),
(4, 'Otros');

--
-- Indexos per taules bolcades
--

--
-- Index de la taula `tbl_anunci`
--
ALTER TABLE `tbl_anunci`
  ADD PRIMARY KEY (`anu_id`),
  ADD KEY `FK_ANU_RACA` (`raca_id`),
  ADD KEY `FK_MUN_ANU` (`mun_id`),
  ADD KEY `FK_CONTACT_ANU` (`contact_id`);

--
-- Index de la taula `tbl_contacte`
--
ALTER TABLE `tbl_contacte`
  ADD PRIMARY KEY (`contact_id`);

--
-- Index de la taula `tbl_municipi`
--
ALTER TABLE `tbl_municipi`
  ADD PRIMARY KEY (`municipi_id`);

--
-- Index de la taula `tbl_raca`
--
ALTER TABLE `tbl_raca`
  ADD PRIMARY KEY (`raca_id`),
  ADD KEY `FK_RACA_TIPUS_A` (`tipus_anim_id`);

--
-- Index de la taula `tbl_tipus_animal`
--
ALTER TABLE `tbl_tipus_animal`
  ADD PRIMARY KEY (`tipus_anim_id`);

--
-- AUTO_INCREMENT per les taules bolcades
--

--
-- AUTO_INCREMENT per la taula `tbl_anunci`
--
ALTER TABLE `tbl_anunci`
  MODIFY `anu_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=31;
--
-- AUTO_INCREMENT per la taula `tbl_contacte`
--
ALTER TABLE `tbl_contacte`
  MODIFY `contact_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT per la taula `tbl_municipi`
--
ALTER TABLE `tbl_municipi`
  MODIFY `municipi_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=17;
--
-- AUTO_INCREMENT per la taula `tbl_raca`
--
ALTER TABLE `tbl_raca`
  MODIFY `raca_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=27;
--
-- AUTO_INCREMENT per la taula `tbl_tipus_animal`
--
ALTER TABLE `tbl_tipus_animal`
  MODIFY `tipus_anim_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- Restriccions per taules bolcades
--

--
-- Restriccions per la taula `tbl_anunci`
--
ALTER TABLE `tbl_anunci`
  ADD CONSTRAINT `RELACIO_ANU_CONTACT` FOREIGN KEY (`contact_id`) REFERENCES `tbl_contacte` (`contact_id`),
  ADD CONSTRAINT `RELACIO_ANU_MUN` FOREIGN KEY (`mun_id`) REFERENCES `tbl_municipi` (`municipi_id`),
  ADD CONSTRAINT `RELACIO_ANU_RACA` FOREIGN KEY (`raca_id`) REFERENCES `tbl_raca` (`raca_id`);

--
-- Restriccions per la taula `tbl_raca`
--
ALTER TABLE `tbl_raca`
  ADD CONSTRAINT `tbl_raca_ibfk_1` FOREIGN KEY (`tipus_anim_id`) REFERENCES `tbl_tipus_animal` (`tipus_anim_id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
