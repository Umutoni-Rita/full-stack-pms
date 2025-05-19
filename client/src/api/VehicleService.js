import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/vehicle';

const getToken = () => localStorage.getItem('token');

export const fetchVehicles = async (page, limit) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}?page=${page}&limit=${limit}`,
      { headers: { Authorization: `Bearer ${getToken()}` } }
    );
    return {
      vehicles: response.data.vehicles,
      totalPages: response.data.totalPages,
    };
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    throw new Error('Failed to fetch vehicles');
  }
};

export const deleteVehicle = async (id) => {
  try {
    await axios.delete(`${API_BASE_URL}/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  } catch (error) {
    console.error('Error deleting vehicle:', error);
    throw new Error('Failed to delete vehicle');
  }
};

export const updateVehicle = async (id, data) => {
  try {
    await axios.put(`${API_BASE_URL}/${id}`, data, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  } catch (error) {
    console.error('Error updating vehicle:', error);
    throw new Error('Failed to update vehicle');
  }
};