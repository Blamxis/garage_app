import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const ServiceSelector = ({ serviceType, onServiceSelect }) => {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/services/${serviceType}`);
        setServices(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des services', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, [serviceType]);

  return (
    <div>
      <select id="service" onChange={onServiceSelect} disabled={isLoading}>
        <option value="">Choisissez un service</option>
        {isLoading ? (
          <option>Chargement...</option>
        ) : (
          Array.isArray(services) && services.length > 0 ? (
            services.map(service => (
              <option key={service.ID_serv} value={service.ID_serv}>
                {service.Nom}
              </option>
            ))
          ) : (
            <option>Aucun service disponible</option>
          )
        )}
      </select>
    </div>
  );
};

ServiceSelector.propTypes = {
  serviceType: PropTypes.string.isRequired, 
  onServiceSelect: PropTypes.func.isRequired,
};

export default ServiceSelector;
