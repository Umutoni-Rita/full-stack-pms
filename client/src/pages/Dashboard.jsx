import { useState } from 'react';
    import VehicleList from './VehicleList';
    import VehicleForm from '../components/VehicleForm';
    import colors from '../config/colors';

    const Dashboard = () => {
      const [refresh, setRefresh] = useState(false);

      const handleAdd = () => {
        setRefresh(!refresh);
      };

      return (
        <div className={`flex flex-col items-center p-5 min-h-screen bg-[${colors.background}]`}>
          <h1 className={`font-bold text-2xl mb-4 text-[${colors.primary}]`}>
            Vehicle Management System
          </h1>
          <VehicleForm onAdd={handleAdd} />
          <VehicleList key={refresh} />
        </div>
      );
    };

    export default Dashboard;