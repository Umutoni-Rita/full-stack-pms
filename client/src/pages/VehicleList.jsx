import { useEffect, useState } from 'react';
    import axios from 'axios';
    import colors from '../config/colors';
    import Button from '../components/Button';

    const VehicleList = ({ refresh }) => {
      const [vehicles, setVehicles] = useState([]);
      const [page, setPage] = useState(1);
      const [totalPages, setTotalPages] = useState(1);
      const limit = 5;

      const fetchVehicles = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get(
            `http://localhost:5000/api/vehicles?page=${page}&limit=${limit}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setVehicles(response.data.vehicles);
          setTotalPages(response.data.totalPages);
        } catch (error) {
          console.error('Error fetching vehicles:', error);
          alert('Failed to fetch vehicles');
        }
      };

      useEffect(() => {
        fetchVehicles();
      }, [page, refresh]);

      const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this vehicle?')) {
          try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5000/api/vehicles/${id}`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            fetchVehicles();
          } catch (error) {
            console.error('Error deleting vehicle:', error);
            alert('Failed to delete vehicle');
          }
        }
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
                  <td className="border p-2">{vehicle.plateNumber}</td>
                  <td className="border p-2">{vehicle.vehicleType}</td>
                  <td className="border p-2">{vehicle.size}</td>
                  <td className="border p-2 flex gap-2">
                    <Button text="Edit" onPress={() => alert('Edit not implemented')} />
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