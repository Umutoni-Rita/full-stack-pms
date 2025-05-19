const express = require('express')
const router = express.Router();
const {authenticate} = require('../middleware/auth')
const {createVehicle, getVehicles, getVehicleById, updateVehicle, deleteVehicle} = require('../controllers/vehicleController')

router.use(authenticate);

/**
 * @swagger
 * /api/vehicle:
 *   post:
 *     summary: Create a vehicle
 *     tags: [Vehicles]
 * security:
 * - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - plateNumber
 *               - vehicleType
 *               - size
 *             properties:
 *               plateNumber:
 *                 type: string
 *               vehicleType:
 *                 type: string
 *               size:
 *                 type: string
 *     responses:
 *       200:
 *         description: Vehicle added 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Error creating vehicles
 */
router.post('/', createVehicle);

router.get('/', getVehicles);
router.get('/:id', getVehicleById);
router.put('/:id', updateVehicle);
router.delete('/:id', deleteVehicle);

module.exports = router;