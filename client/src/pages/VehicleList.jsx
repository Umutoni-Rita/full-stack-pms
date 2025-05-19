import { useEffect, useState } from 'react';
import colors from '../config/colors';
import Button from '../components/Button';
import { fetchVehicles, deleteVehicle, updateVehicle } from '../api/VehicleService';

const VehicleList = ({ refresh }) => {
  const [vehicles, setVehicles] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [editForm, setEditForm] = useState({ plateNumber: '', vehicleType: '', size: '' });
  const limit = 5;

  const loadVehicles = async () => {
    try {
      const { vehicles, totalPages } = await fetchVehicles(page, limit);
      setVehicles(vehicles);
      setTotalPages(totalPages);
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    loadVehicles();
  }, [page, refresh]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this vehicle?')) {
      try {
        await deleteVehicle(id);
        loadVehicles();
      } catch (error) {
        alert(error.message);
      }
    }
  };

  const handleEdit = (vehicle) => {
    setEditingVehicle(vehicle.id);
    setEditForm({
      plateNumber: vehicle.plateNumber,
      vehicleType: vehicle.vehicleType,
      size: vehicle.size,
    });
  };

  const handleUpdate = async (id) => {
    try {
      await updateVehicle(id, editForm);
      setEditingVehicle(null);
      loadVehicles();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={`p-4 bg-[${colors.background}] min-h-screen`}>
      <h2 className={`text-2xl font-bold mb-4 text-[${colors.primary}]`}>My Vehicles</h2>
      <table className={`w-full border border-[${colors.accent}]`}>
        <thead>
          <tr className={`bg-[${colors.accent}]`}>
            <th className={`border p-2 text-[${colors.primary}]`}>Plate Number</th>
            <th className={`border p-2 text-[${colors.primary}]`}>Type</th>
            <th className={`border p-2 text-[${colors.primary}]`}>Size</th>
            <th className={`border p-2 text-[${colors.primary}]`}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle) => (
            <tr key={vehicle.id} className={`border-b border-[${colors.accent}]`}>
              <td className="border p-2">
                {editingVehicle === vehicle.id ? (
                  <input
                    type="text"
                    name="plateNumber"
                    value={editForm.plateNumber}
                    onChange={handleChange}
                    className="border p-1"
                  />
                ) : (
                  vehicle.plateNumber
                )}
              </td>
              <td className="border p-2">
                {editingVehicle === vehicle.id ? (
                  <input
                    type="text"
                    name="vehicleType"
                    value={editForm.vehicleType}
                    onChange={handleChange}
                    className="border p-1"
                  />
                ) : (
                  vehicle.vehicleType
                )}
              </td>
              <td className="border p-2">
                {editingVehicle === vehicle.id ? (
                  <input
                    type="text"
                    name="size"
                    value={editForm.size}
                    onChange={handleChange}
                    className="border p-1"
                  />
                ) : (
                  vehicle.size
                )}
              </td>
              <td className="border p-2 flex gap-2">
                {editingVehicle === vehicle.id ? (
                  <Button text="Save" onPress={() => handleUpdate(vehicle.id)} />
                ) : (
                  <Button text="Edit" onPress={() => handleEdit(vehicle)} />
                )}
                <Button text="Delete" onPress={() => handleDelete(vehicle.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-center">
        <Button
          text="Previous"
          onPress={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        />
        <span className={`mx-4 text-[${colors.secondaryText}]`}>
          Page {page} of {totalPages}
        </span>
        <Button
          text="Next"
          onPress={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
        />
      </div>
    </div>
  );
};

export default VehicleList;