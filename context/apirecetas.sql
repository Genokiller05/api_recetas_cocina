/* ============================================================
  PROYECTO: API de Recetas (MySQL 8+)
  ENCODING: utf8mb4
  NOTAS:
  - Recetas públicas por defecto; algunas pueden tener precio (> 0).
  - Un usuario es propietario (autor) de la receta. Puede invitar colaboradores.
  - Valoraciones: 1..5 estrellas, 1 por usuario por receta.
  - Visitas: se registran (usuario opcional) para métricas.
  - Categorías y tags: muchos-a-muchos; categorías soportan jerarquía simple.
============================================================ */

-- (Opcional) Crea la base de datos
CREATE DATABASE IF NOT EXISTS recetas_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_0900_ai_ci;
USE recetas_db;

-- Ajustes recomendados
SET NAMES utf8mb4;
SET time_zone = '+00:00';

/* =========================
   TABLA: usuarios
   - Registro básico para autenticación y perfil.
   - email único.
========================= */
CREATE TABLE IF NOT EXISTS usuarios (
  id              BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  nombre          VARCHAR(100)        NOT NULL,
  username        VARCHAR(50)         NOT NULL,
  email           VARCHAR(255)        NOT NULL,
  hash_password   CHAR(60)            NOT NULL, -- BCrypt/Argon2 (ajusta longitud según tu hash)
  foto_url        VARCHAR(500)        NULL,
  bio             VARCHAR(280)        NULL,
  creado_en       DATETIME            NOT NULL DEFAULT CURRENT_TIMESTAMP,
  actualizado_en  DATETIME            NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uq_usuarios_email (email),
  UNIQUE KEY uq_usuarios_username (username)
) ENGINE=InnoDB;

/* =========================
   TABLA: recetas
   - Una receta pertenece a UN (1) autor (propietario).
   - visibility: pública/privada/no-listada.
   - price: si > 0 => receta de pago (premium).
========================= */
CREATE TABLE IF NOT EXISTS recetas (
  id               BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  autor_id         BIGINT UNSIGNED   NOT NULL,
  titulo           VARCHAR(200)      NOT NULL,
  slug             VARCHAR(220)      NOT NULL,  -- útil para URLs
  descripcion      TEXT              NULL,
  tiempo_preparacion_min SMALLINT UNSIGNED NULL, -- minutos totales estimados
  porciones        SMALLINT UNSIGNED NULL,
  visibilidad      ENUM('publica','privada','no_listada') NOT NULL DEFAULT 'publica',
  precio_mxn       DECIMAL(10,2)     NOT NULL DEFAULT 0.00, -- 0 = gratuita
  publicado        TINYINT(1)        NOT NULL DEFAULT 1,    -- 1=visible según visibilidad
  creado_en        DATETIME          NOT NULL DEFAULT CURRENT_TIMESTAMP,
  actualizado_en   DATETIME          NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FULLTEXT KEY ft_recetas (titulo, descripcion),
  UNIQUE KEY uq_recetas_slug (slug),
  KEY idx_recetas_autor (autor_id),
  CONSTRAINT fk_recetas_autor
    FOREIGN KEY (autor_id) REFERENCES usuarios(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB;

/* =========================
   TABLA: colaboradores_receta
   - Autor puede invitar a otras personas a editar.
   - accepted_at NULL => pendiente; NOT NULL => aceptado.
   - role: 'editor' (MVP).
========================= */
CREATE TABLE IF NOT EXISTS colaboradores_receta (
  receta_id      BIGINT UNSIGNED NOT NULL,
  usuario_id     BIGINT UNSIGNED NOT NULL,
  rol            ENUM('editor')  NOT NULL DEFAULT 'editor',
  invitado_en    DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  aceptado_en    DATETIME        NULL,
  PRIMARY KEY (receta_id, usuario_id),
  KEY idx_colab_user (usuario_id),
  CONSTRAINT fk_colab_receta
    FOREIGN KEY (receta_id) REFERENCES recetas(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT fk_colab_usuario
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB;

/* =========================
   TABLA: ingredientes
   - Catálogo de ingredientes (normalización ligera).
   - nombre único.
========================= */
CREATE TABLE IF NOT EXISTS ingredientes (
  id             BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  nombre         VARCHAR(120)    NOT NULL,
  unidad_base    VARCHAR(30)     NULL, -- opcional, p.ej. 'g', 'ml', 'pieza'
  UNIQUE KEY uq_ingredientes_nombre (nombre)
) ENGINE=InnoDB;

/* =========================
   TABLA: recetas_ingredientes (N:M)
   - Relaciona receta con ingrediente + cantidad/unidad.
   - step_hint: opcional para indicar en qué paso se usa primero.
========================= */
CREATE TABLE IF NOT EXISTS recetas_ingredientes (
  receta_id      BIGINT UNSIGNED NOT NULL,
  ingrediente_id BIGINT UNSIGNED NOT NULL,
  cantidad       DECIMAL(10,3)   NULL,   -- 0 o NULL si “al gusto”
  unidad         VARCHAR(30)     NULL,   -- puede diferir de unidad_base
  step_hint      SMALLINT UNSIGNED NULL, -- sugerencia de paso de uso
  notas          VARCHAR(200)    NULL,
  PRIMARY KEY (receta_id, ingrediente_id),
  KEY idx_ri_ing (ingrediente_id),
  CONSTRAINT fk_ri_receta
    FOREIGN KEY (receta_id) REFERENCES recetas(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT fk_ri_ingrediente
    FOREIGN KEY (ingrediente_id) REFERENCES ingredientes(id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
) ENGINE=InnoDB;

/* =========================
   TABLA: pasos
   - Pasos de preparación ordenados.
========================= */
CREATE TABLE IF NOT EXISTS pasos (
  id            BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  receta_id     BIGINT UNSIGNED NOT NULL,
  numero_orden  SMALLINT UNSIGNED NOT NULL, -- 1..n
  instruccion   TEXT             NOT NULL,
  duracion_min  SMALLINT UNSIGNED NULL,     -- duración estimada del paso
  creado_en     DATETIME         NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_pasos_receta_orden (receta_id, numero_orden),
  KEY idx_pasos_receta (receta_id),
  CONSTRAINT fk_pasos_receta
    FOREIGN KEY (receta_id) REFERENCES recetas(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB;

/* =========================
   TABLAS: categorías y puente
   - Categorías jerárquicas simples (parent_id).
   - Una receta puede pertenecer a varias categorías.
========================= */
CREATE TABLE IF NOT EXISTS categorias (
  id           BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  nombre       VARCHAR(100)   NOT NULL,
  slug         VARCHAR(120)   NOT NULL,
  parent_id    BIGINT UNSIGNED NULL,
  UNIQUE KEY uq_categorias_slug (slug),
  UNIQUE KEY uq_categorias_nombre (nombre),
  KEY idx_cat_parent (parent_id),
  CONSTRAINT fk_cat_parent
    FOREIGN KEY (parent_id) REFERENCES categorias(id)
    ON DELETE SET NULL
    ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS recetas_categorias (
  receta_id     BIGINT UNSIGNED NOT NULL,
  categoria_id  BIGINT UNSIGNED NOT NULL,
  PRIMARY KEY (receta_id, categoria_id),
  KEY idx_rc_cat (categoria_id),
  CONSTRAINT fk_rc_receta
    FOREIGN KEY (receta_id) REFERENCES recetas(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT fk_rc_categoria
    FOREIGN KEY (categoria_id) REFERENCES categorias(id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
) ENGINE=InnoDB;

/* =========================
   TABLAS: tags y puente
   - Etiquetas libres para búsqueda/filtrado.
========================= */
CREATE TABLE IF NOT EXISTS tags (
  id      BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  nombre  VARCHAR(60)  NOT NULL,
  slug    VARCHAR(80)  NOT NULL,
  UNIQUE KEY uq_tags_slug (slug),
  UNIQUE KEY uq_tags_nombre (nombre)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS recetas_tags (
  receta_id  BIGINT UNSIGNED NOT NULL,
  tag_id     BIGINT UNSIGNED NOT NULL,
  PRIMARY KEY (receta_id, tag_id),
  KEY idx_rt_tag (tag_id),
  CONSTRAINT fk_rt_receta
    FOREIGN KEY (receta_id) REFERENCES recetas(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT fk_rt_tag
    FOREIGN KEY (tag_id) REFERENCES tags(id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
) ENGINE=InnoDB;

/* =========================
   TABLA: visitas
   - Registro de visitas para analytics.
   - usuario_id NULL => visitante anónimo.
========================= */
CREATE TABLE IF NOT EXISTS visitas (
  id           BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  receta_id    BIGINT UNSIGNED NOT NULL,
  usuario_id   BIGINT UNSIGNED NULL,
  ip_hash      CHAR(64)        NULL,  -- hash de IP para privacidad básica
  user_agent   VARCHAR(255)    NULL,
  visitado_en  DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY idx_visitas_receta (receta_id),
  KEY idx_visitas_usuario (usuario_id),
  CONSTRAINT fk_visitas_receta
    FOREIGN KEY (receta_id) REFERENCES recetas(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT fk_visitas_usuario
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
    ON DELETE SET NULL
    ON UPDATE CASCADE
) ENGINE=InnoDB;

/* =========================
   TABLA: valoraciones
   - 1 valoración por usuario por receta (única).
   - rating: 1..5
========================= */
CREATE TABLE IF NOT EXISTS valoraciones (
  id           BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  receta_id    BIGINT UNSIGNED NOT NULL,
  usuario_id   BIGINT UNSIGNED NOT NULL,
  rating       TINYINT UNSIGNED NOT NULL, -- 1..5
  comentario   VARCHAR(500)     NULL,
  creado_en    DATETIME         NOT NULL DEFAULT CURRENT_TIMESTAMP,
  actualizado_en DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uq_valoracion (receta_id, usuario_id),
  KEY idx_val_receta (receta_id),
  KEY idx_val_usuario (usuario_id),
  CONSTRAINT chk_rating CHECK (rating BETWEEN 1 AND 5),
  CONSTRAINT fk_val_receta
    FOREIGN KEY (receta_id) REFERENCES recetas(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT fk_val_usuario
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB;

/* =========================
   TABLA: compras_receta
   - Registro de compras de recetas con precio > 0.
   - amount_captured: monto cobrado (congelado al momento de compra).
   - status: flujo simple MVP.
========================= */
CREATE TABLE IF NOT EXISTS compras_receta (
  id               BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  receta_id        BIGINT UNSIGNED NOT NULL,
  comprador_id     BIGINT UNSIGNED NOT NULL,
  amount_mxn       DECIMAL(10,2)   NOT NULL, -- precio en el momento de compra
  status           ENUM('pendiente','pagado','fallido','reembolsado') NOT NULL DEFAULT 'pendiente',
  referencia_pago  VARCHAR(120)    NULL,     -- id transacción pasarela
  creado_en        DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  actualizado_en   DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uq_compra_unica (receta_id, comprador_id), -- una compra por usuario por receta
  KEY idx_cr_receta (receta_id),
  KEY idx_cr_comprador (comprador_id),
  CONSTRAINT fk_cr_receta
    FOREIGN KEY (receta_id) REFERENCES recetas(id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT fk_cr_comprador
    FOREIGN KEY (comprador_id) REFERENCES usuarios(id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
) ENGINE=InnoDB;

/* =========================
   DISPARADORES (opcionales, útiles)
   - Evita compras de recetas gratuitas (precio=0).
   - Mantén slug único/limpio si no lo envías desde backend.
========================= */

-- Previene insertar compra si la receta es gratuita
DROP TRIGGER IF EXISTS trg_compra_receta_no_gratis;
DELIMITER $$
CREATE TRIGGER trg_compra_receta_no_gratis
BEFORE INSERT ON compras_receta
FOR EACH ROW
BEGIN
  DECLARE v_precio DECIMAL(10,2);
  SELECT precio_mxn INTO v_precio FROM recetas WHERE id = NEW.receta_id;
  IF v_precio IS NULL OR v_precio <= 0 THEN
    SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'No se puede comprar una receta gratuita.';
  END IF;
  -- Conservar el precio al momento de compra
  SET NEW.amount_mxn = v_precio;
END$$
DELIMITER ;

-- (Opcional) Generar slug si viene vacío (simplificado)
DROP TRIGGER IF EXISTS trg_recetas_slug_default;
DELIMITER $$
CREATE TRIGGER trg_recetas_slug_default
BEFORE INSERT ON recetas
FOR EACH ROW
BEGIN
  IF NEW.slug IS NULL OR CHAR_LENGTH(TRIM(NEW.slug)) = 0 THEN
    SET NEW.slug = CONCAT(
      LOWER(REPLACE(REPLACE(REPLACE(NEW.titulo, ' ', '-'), '_', '-'), '--','-')),
      '-', LPAD(FLOOR(RAND()*1000000), 6, '0')
    );
  END IF;
END$$
DELIMITER ;

/* =========================
   VISTAS (opcionales, útil para API)
========================= */

-- Vista simple: resumen público de recetas (oculta privadas)
CREATE OR REPLACE VIEW vw_recetas_publicas AS
SELECT
  r.id,
  r.titulo,
  r.slug,
  r.descripcion,
  r.tiempo_preparacion_min,
  r.porciones,
  r.precio_mxn,
  r.visibilidad,
  r.publicado,
  r.creado_en,
  u.id   AS autor_id,
  u.nombre AS autor_nombre
FROM recetas r
JOIN usuarios u ON u.id = r.autor_id
WHERE r.publicado = 1 AND r.visibilidad = 'publica';

-- Vista: promedio de rating por receta
CREATE OR REPLACE VIEW vw_rating_recetas AS
SELECT
  r.id AS receta_id,
  r.titulo,
  AVG(v.rating) AS rating_promedio,
  COUNT(v.id)   AS total_valoraciones
FROM recetas r
LEFT JOIN valoraciones v ON v.receta_id = r.id
GROUP BY r.id, r.titulo;

/* =========================
   ÍNDICES adicionales sugeridos
========================= */
CREATE INDEX idx_recetas_visibilidad ON recetas (visibilidad, publicado);
CREATE INDEX idx_recetas_precio ON recetas (precio_mxn);