-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 10-09-2020 a las 23:23:34
-- Versión del servidor: 10.4.11-MariaDB
-- Versión de PHP: 7.4.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `aseomatic`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cargos`
--

CREATE TABLE `cargos` (
  `id_cargo` int(11) NOT NULL,
  `nombre_cargo` varchar(25) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `cargos`
--

INSERT INTO `cargos` (`id_cargo`, `nombre_cargo`) VALUES
(1, 'Desarrollador');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `eps`
--

CREATE TABLE `eps` (
  `id_eps` int(11) NOT NULL,
  `nombre_eps` varchar(25) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `eps`
--

INSERT INTO `eps` (`id_eps`, `nombre_eps`) VALUES
(1, 'Sanitas'),
(2, 'COOSALUD'),
(3, 'COMFASUCRE'),
(4, 'SALUDVIDA'),
(5, 'CAFESALUD'),
(6, 'COOSALUD');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `eventos`
--

CREATE TABLE `eventos` (
  `id_evento` int(11) NOT NULL,
  `titulo_evento` varchar(45) DEFAULT NULL,
  `descripcion_evento` longtext DEFAULT NULL,
  `fecha_publicado` date DEFAULT NULL,
  `imagen_evento` longtext DEFAULT NULL,
  `fk_usuario` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fondos_pension`
--

CREATE TABLE `fondos_pension` (
  `id_fondo_pension` int(11) NOT NULL,
  `nombre_fondo_pension` varchar(25) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `fondos_pension`
--

INSERT INTO `fondos_pension` (`id_fondo_pension`, `nombre_fondo_pension`) VALUES
(1, 'Porvenir S.A.'),
(2, 'Protección S.A.'),
(3, 'Colfondos S.A.'),
(4, 'Colpensiones');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `logs_contactenos`
--

CREATE TABLE `logs_contactenos` (
  `id_log_contactenos` int(11) NOT NULL,
  `nombres_contactenos` varchar(50) DEFAULT NULL,
  `apellidos_contactenos` varchar(50) DEFAULT NULL,
  `genero_contactenos` varchar(10) DEFAULT NULL,
  `correo_contactenos` varchar(50) DEFAULT NULL,
  `asunto_contactenos` varchar(25) DEFAULT NULL,
  `mensaje_contactenos` longtext DEFAULT NULL,
  `fecha_envio` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `noticias`
--

CREATE TABLE `noticias` (
  `id_noticia` int(11) NOT NULL,
  `titulo_noticia` varchar(45) DEFAULT NULL,
  `descripcion_noticia` longtext DEFAULT NULL,
  `fecha_publicado` date DEFAULT NULL,
  `imagen_noticia` longtext DEFAULT NULL,
  `fk_usuario` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id_rol` int(11) NOT NULL,
  `nombre_rol` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id_rol`, `nombre_rol`) VALUES
(1, 'Administrador'),
(2, 'Empleado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipos_documentos`
--

CREATE TABLE `tipos_documentos` (
  `id_tipo_documento` int(11) NOT NULL,
  `tipo_documento` varchar(25) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tipos_documentos`
--

INSERT INTO `tipos_documentos` (`id_tipo_documento`, `tipo_documento`) VALUES
(1, 'Cedula de Ciudadania'),
(2, 'Tarjeta de Identidad');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `nombres` varchar(25) DEFAULT NULL,
  `apellidos` varchar(25) DEFAULT NULL,
  `correo` varchar(35) DEFAULT NULL,
  `clave` longtext DEFAULT NULL,
  `numero_documento` varchar(20) DEFAULT NULL,
  `fk_rol` int(11) DEFAULT NULL,
  `fk_fondo_pension` int(11) DEFAULT NULL,
  `fk_cargo` int(11) DEFAULT NULL,
  `fk_tipo_documento` int(11) DEFAULT NULL,
  `fk_eps` int(11) DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `nombres`, `apellidos`, `correo`, `clave`, `numero_documento`, `fk_rol`, `fk_fondo_pension`, `fk_cargo`, `fk_tipo_documento`, `fk_eps`, `created_at`, `updated_at`) VALUES
(1, 'Alexx', 'Ramos', 'alexx@mail.com', '827ccb0eea8a706c4c34a16891f84e7b', '1233890166', 1, 1, 1, 1, 1, '2020-07-29', '0000-00-00'),
(2, 'Alexx', 'Ramos', 'alexx16@mail.com', '827ccb0eea8a706c4c34a16891f84e7b', '1233890166', 2, 1, 1, 1, 1, '2020-07-29', '0000-00-00'),
(3, 'david', 'hernandez', 'david@mail.com', '1f32aa4c9a1d2ea010adcf2348166a04', '4848948484', 1, 1, 1, 1, 1, '2020-07-29', '2020-09-10'),
(7, 'vane', 'vega', 'vane@mail.com', 'fcea920f7412b5da7be0cf42b8c93759', '44564', 1, 1, 1, 1, 1, '2020-08-01', '2020-08-01'),
(8, 'Juan', 'david', 'juan@mail.com', '71b3b26aaa319e0cdf6fdb8429c112b0', '4564564', 2, 1, 1, 1, 1, '2020-08-01', '2020-08-01'),
(9, 'Felipe ', 'Hernandes', 'felipe@mail.com', 'c4ded2b85cc5be82fa1d2464eba9a7d3', '1233456', 2, 1, 1, 1, 1, '2020-08-01', '2020-08-01');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cargos`
--
ALTER TABLE `cargos`
  ADD PRIMARY KEY (`id_cargo`);

--
-- Indices de la tabla `eps`
--
ALTER TABLE `eps`
  ADD PRIMARY KEY (`id_eps`);

--
-- Indices de la tabla `eventos`
--
ALTER TABLE `eventos`
  ADD PRIMARY KEY (`id_evento`),
  ADD KEY `fk_usuario` (`fk_usuario`);

--
-- Indices de la tabla `fondos_pension`
--
ALTER TABLE `fondos_pension`
  ADD PRIMARY KEY (`id_fondo_pension`);

--
-- Indices de la tabla `logs_contactenos`
--
ALTER TABLE `logs_contactenos`
  ADD PRIMARY KEY (`id_log_contactenos`);

--
-- Indices de la tabla `noticias`
--
ALTER TABLE `noticias`
  ADD PRIMARY KEY (`id_noticia`),
  ADD KEY `fk_usuario` (`fk_usuario`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id_rol`);

--
-- Indices de la tabla `tipos_documentos`
--
ALTER TABLE `tipos_documentos`
  ADD PRIMARY KEY (`id_tipo_documento`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`),
  ADD KEY `fk_rol` (`fk_rol`),
  ADD KEY `fk_fondo_pension` (`fk_fondo_pension`),
  ADD KEY `fk_cargo` (`fk_cargo`),
  ADD KEY `fk_tipo_documento` (`fk_tipo_documento`),
  ADD KEY `fk_eps` (`fk_eps`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cargos`
--
ALTER TABLE `cargos`
  MODIFY `id_cargo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `eps`
--
ALTER TABLE `eps`
  MODIFY `id_eps` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `eventos`
--
ALTER TABLE `eventos`
  MODIFY `id_evento` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `fondos_pension`
--
ALTER TABLE `fondos_pension`
  MODIFY `id_fondo_pension` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `logs_contactenos`
--
ALTER TABLE `logs_contactenos`
  MODIFY `id_log_contactenos` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `noticias`
--
ALTER TABLE `noticias`
  MODIFY `id_noticia` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id_rol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `tipos_documentos`
--
ALTER TABLE `tipos_documentos`
  MODIFY `id_tipo_documento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `eventos`
--
ALTER TABLE `eventos`
  ADD CONSTRAINT `eventos_ibfk_1` FOREIGN KEY (`fk_usuario`) REFERENCES `usuarios` (`id_usuario`);

--
-- Filtros para la tabla `noticias`
--
ALTER TABLE `noticias`
  ADD CONSTRAINT `noticias_ibfk_1` FOREIGN KEY (`fk_usuario`) REFERENCES `usuarios` (`id_usuario`);

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`fk_rol`) REFERENCES `roles` (`id_rol`),
  ADD CONSTRAINT `usuarios_ibfk_2` FOREIGN KEY (`fk_fondo_pension`) REFERENCES `fondos_pension` (`id_fondo_pension`),
  ADD CONSTRAINT `usuarios_ibfk_3` FOREIGN KEY (`fk_cargo`) REFERENCES `cargos` (`id_cargo`),
  ADD CONSTRAINT `usuarios_ibfk_4` FOREIGN KEY (`fk_tipo_documento`) REFERENCES `tipos_documentos` (`id_tipo_documento`),
  ADD CONSTRAINT `usuarios_ibfk_5` FOREIGN KEY (`fk_eps`) REFERENCES `eps` (`id_eps`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
