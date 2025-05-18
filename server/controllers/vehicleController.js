const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createVehicle = async (req, res) => {
  //define fields
  const { plateNumber, vehicleType, size, attributes} = req.body;
  try {
    //add the fields to the DB
    const vehicle = await prisma.vehicle.create({
      data: {
        plateNumber,
        vehicleType,
        size,
        attributes,
        userId: req.user.id,
      },
    });
    //return success and the vehicle object
    res.status(201).json({ message: "Vehicle created", vehicle });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating vehicle", error: error.message });
  }
};

const getVehicles = async (req, res) => {
  try {
    const vehicles = await prisma.vehicle.findMany({
      where: { userId: req.user.id },
      orderBy: { updatedAt: "desc" },
    });
    res.status(200).json({vehicles});
  } catch (error) {
    res.status(500).json({ message: 'Error fetching vehicles', error: error.message });
  }
};

const getVehicleById = async(req, res) => {
    const id = parseInt(req.params.id);
    try {
        const vehicle = await prisma.vehicle.findUnique({
            where: {id: id}
        });
        if(!vehicle){
            return res.status(404).json({message: "Vehicle not found"});
        }
        return res.status(200).json(vehicle);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching vehicle', error: error.message });
    }
}

const updateVehicle = async (req, res) => {
      try {
        const vehicle = await prisma.vehicle.update({
          where: { id: parseInt(req.params.id) },
          data: req.body,
        });
        res.status(200).json(vehicle);
      } catch (error) {
        res.status(400).json({ message: 'Error updating vehicle', error: error.message });
      }
    };

    const deleteVehicle = async (req, res) => {
      try {
        await prisma.vehicle.delete({
          where: { id: parseInt(req.params.id) },
        });
        res.status(204).send();
      } catch (error) {
        res.status(400).json({ message: 'Error deleting vehicle', error: error.message });
      }
    };

module.exports = { createVehicle, getVehicles, getVehicleById, updateVehicle, deleteVehicle };
