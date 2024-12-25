import React from 'react';
import './styles.css';

const ComparisonModal = ({ cars, onClose }) => {
  // Simplified specs list
  const specs = [
    { key: 'price', label: 'Price' },
    { key: 'specs.engine', label: 'Engine' },
    { key: 'specs.horsepower', label: 'Horsepower' },
    { key: 'specs.transmission', label: 'Transmission' }
  ];

  // Get nested values (e.g., specs.engine)
  const getValue = (car, key) => {
    return key.split('.').reduce((obj, k) => obj?.[k], car);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>Compare Cars</h2>

        <div className="comparison">
          {/* Car Headers */}
          <div className="cars-header">
            {cars.map(car => (
              <div key={car.id} className="car-column">
                <img
                  src={car.image}
                  alt={`${car.brand} ${car.model}`}
                  className="car-img"
                />
                <h3>{car.brand} {car.model}</h3>
              </div>
            ))}
          </div>

          {/* Specifications */}
          {specs.map(({ key, label }) => (
            <div key={key} className="spec-row">
              <div className="spec-label">{label}</div>
              {cars.map(car => (
                <div key={car.id} className="spec-value">
                  {key === 'price' 
                    ? `$${getValue(car, key).toLocaleString()}`
                    : getValue(car, key)}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ComparisonModal;