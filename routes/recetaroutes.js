const express = require('express');
const router = express.Router();
const RecetaController = require('../controllers/recetacontroller');
const { validatorRecetaCreate, validatorRecetaUpdate } = require('../validators/recetavalidator');
const { protect } = require('../middleware/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Recetas
 *   description: Gestión de recetas de cocina
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Receta:
 *       type: object
 *       required:
 *         - autor_id
 *         - titulo
 *         - slug
 *       properties:
 *         id:
 *           type: integer
 *           description: ID de la receta
 *         autor_id:
 *           type: integer
 *           description: ID del usuario autor de la receta
 *         titulo:
 *           type: string
 *           description: Título de la receta
 *         slug:
 *           type: string
 *           description: Slug único para la URL de la receta
 *         descripcion:
 *           type: string
 *           nullable: true
 *           description: Descripción detallada de la receta
 *         tiempo_preparacion_min:
 *           type: integer
 *           nullable: true
 *           description: Tiempo de preparación en minutos
 *         porciones:
 *           type: integer
 *           nullable: true
 *           description: Número de porciones
 *         visibilidad:
 *           type: string
 *           enum: [publica, privada, no_listada]
 *           description: Visibilidad de la receta
 *         precio_mxn:
 *           type: number
 *           format: float
 *           description: Precio de la receta en MXN
 *         publicado:
 *           type: integer
 *           format: int32
 *           description: Indica si la receta está publicada (1) o no (0)
 *       example:
 *         id: 1
 *         autor_id: 1
 *         titulo: "Pastel de Chocolate Clásico"
 *         slug: "pastel-chocolate-clasico"
 *         descripcion: "Un delicioso pastel de chocolate para cualquier ocasión."
 *         tiempo_preparacion_min: 60
 *         porciones: 8
 *         visibilidad: "publica"
 *         precio_mxn: 0.00
 *         publicado: 1
 */

/**
 * @swagger
 * /recetas:
 *   get:
 *     summary: Obtiene todas las recetas
 *     tags: [Recetas]
 *     responses:
 *       200:
 *         description: Lista de todas las recetas.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Receta'
 *       500:
 *         description: Error del servidor.
 *   post:
 *     summary: Crea una nueva receta
 *     tags: [Recetas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Receta'
 *     responses:
 *       201:
 *         description: Receta creada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Receta'
 *       400:
 *         description: Datos de entrada inválidos.
 *       401:
 *         description: No autorizado.
 *       500:
 *         description: Error del servidor.
 * /recetas/{id}:
 *   get:
 *     summary: Obtiene una receta por ID
 *     tags: [Recetas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la receta
 *     responses:
 *       200:
 *         description: Información de la receta.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Receta'
 *       404:
 *         description: Receta no encontrada.
 *       500:
 *         description: Error del servidor.
 *   put:
 *     summary: Actualiza una receta existente
 *     tags: [Recetas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la receta a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Receta'
 *     responses:
 *       200:
 *         description: Receta actualizada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Receta'
 *       400:
 *         description: Datos de entrada inválidos.
 *       401:
 *         description: No autorizado.
 *       403:
 *         description: Acción no autorizada.
 *       404:
 *         description: Receta no encontrada.
 *       500:
 *         description: Error del servidor.
 *   delete:
 *     summary: Elimina una receta
 *     tags: [Recetas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la receta a eliminar
 *     responses:
 *       204:
 *         description: Receta eliminada exitosamente.
 *       401:
 *         description: No autorizado.
 *       403:
 *         description: Acción no autorizada.
 *       404:
 *         description: Receta no encontrada.
 *       500:
 *         description: Error del servidor.
 */

router.get('/', RecetaController.get);
router.get('/:id', RecetaController.getById);
router.post('/', protect, validatorRecetaCreate, RecetaController.create);
router.put('/:id', protect, validatorRecetaUpdate, RecetaController.update);
router.delete('/:id', protect, RecetaController.destroy);

const pasoRoutes = require('./pasoroutes');

router.use('/:receta_id/pasos', pasoRoutes);

const visitaRoutes = require('./visitaroutes');

router.use('/:receta_id/visitas', visitaRoutes);

const valoracionRoutes = require('./valoracionroutes');

router.use('/:receta_id/valoraciones', valoracionRoutes);

const compraRecetaRoutes = require('./comprarecetaroutes');

router.use('/:receta_id/compras', compraRecetaRoutes);

module.exports = router;