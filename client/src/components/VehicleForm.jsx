import { useState } from 'react';
    import axios from 'axios';
    import Input from './Input';
    import Button from './Button';
    import colors from '../config/colors';

    const VehicleForm = ({ onAdd }) => {
      const [formData, setFormData] = useState({
        plateNumber: '',
        vehicleType: '',
        size: '',
        attributes: '',
      });

      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const token = localStorage.getItem('token');
          const data = {
            ...formData,
            attributes: formData.attributes ? JSON.parse(formData.attributes) : null,
          };
          await axios.post('http://localhost:5000/api/vehicles', data, {
            headers: { Authorization: `Bearer ${token}` },
          });
          alert('Vehicle added successfully');
          setFormData({ plateNumber: '', vehicleType: '', size: '', attributes: '' });
          if (onAdd) onAdd();
        } catch (error) {
          console.error('Error adding vehicle:', error);
          alert('Failed to add vehicle: ' + error.response?.data?.message);
        }
      };

      return (
        <form onSubmit={handleSubmit} className={`p-4 bg-[${colors.accent}] rounded-md shadow-md`}>
          <h2 className={`text-xl font-bold mb-4 text-[${colors.primary}]`}>Add Vehicle</h2>
          <Input
            placeholder="Plate Number (e.g., ABC123)"
            name="plateNumber"
            type="text"
            onChange={handleChange}
            value={formData.plateNumber}
          />
          <Input
            placeholder="Vehicle Type (e.g., Car)"
            name="vehicleType"
            type="text"
            onChange={handleChange}
            value={formData.vehicleType}
          />
          <Input
            placeholder="Size (e.g., Medium)"
            name="size"
            type="text"
            onChange={handleChange}
            value={formData.size}
          />
          <Input
            placeholder="Attributes (JSON, optional)"
            name="attributes"
            type="text"
            onChange={handleChange}
            value={formData.attributes}
          />
          <Button text="Add Vehicle" />
        </form>
      );
    };

    export default VehicleForm;