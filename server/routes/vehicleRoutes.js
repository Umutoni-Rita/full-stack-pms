const express = require('express')
const router = express.Router();
const {authenticate} = require('../middleware/auth')
const {createVehicle, getVehicles, getVehicleById, updateVehicle, deleteVehicle} = require('../controllers/vehicleController')

router.use(authenticate);
router.post('/', createVehicle);
router.get('/', getVehicles);
router.get('/:id', getVehicleById);
router.put('/:id', updateVehicle);
router.delete('/:id', deleteVehicle);

module.exports = router;