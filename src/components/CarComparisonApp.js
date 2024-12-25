import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet';
import './styles.css'

// Lazy loaded components
const ComparisonModal = lazy(() => import('./ComparisonModal'));

const CarComparisonApp = () => {
  const [cars, setCars] = useState([]);
  const [selectedCars, setSelectedCars] = useState([]);
  const [isComparing, setIsComparing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Simulated car data - in real app, this would come from an API
  const carData = [
    {
      id: 1,
      brand: 'Toyota',
      model: 'Camry',
      year: 2024,
      price: 25000,
      weight: '3,310 lbs',
      rating: 4.5,
      specs: {
        engine: '2.5L 4-cylinder',
        horsepower: 203,
        transmission: '6-speed automatic',
        fuelEconomy: '28 city / 39 highway'
      },
      image: 'https://cdn.pixabay.com/photo/2020/03/25/15/15/honda-4967605_1280.jpg'
    },
    {
      id: 2,
      brand: 'Honda',
      model: 'Accord',
      year: 2024,
      price: 26000,
      weight: '3,380 lbs',
      rating: 3.6,
      specs: {
        engine: '1.5L Turbo 4-cylinder',
        horsepower: 192,
        transmission: 'CVT',
        fuelEconomy: '20 city / 15 highway'
      },
      image: 'https://mda.spinny.com/sp-file-system/public/2024-10-08/a0c733d09fc94729953448e55475af53/file.JPG?q=85&w=360'
    },
    {
      id: 3,
      brand: 'Maruti Sizuki',
      model: 'Siaz S Petrol',
      year: 2024,
      price: 26000,
      weight: '3,380 lbs',
      rating: 4.6,
      specs: {
        engine: '1.5L Turbo 4-cylinder',
        horsepower: 192,
        transmission: '8-Speed Automatic',
        fuelEconomy: '30 city / 38 highway'
      },
      image: 'https://mda.spinny.com/sp-file-system/public/2024-12-04/d5740d375c3e4c6db2db4034cebe95b1/file.JPG?q=85&w=360'
    },
    // Add more cars as needed
  ];

  useEffect(() => {
    // Simulate API call
    setCars(carData);
  }, []);

  const handleCarSelect = (car) => {
    if (selectedCars.find(c => c.id === car.id)) {
      setSelectedCars(selectedCars.filter(c => c.id !== car.id));
    } else if (selectedCars.length < 3) {
      setSelectedCars([...selectedCars, car]);
    } else {
      alert('You can compare up to 3 cars at a time');
    }
  };

  const filteredCars = cars.filter(car =>
    car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    car.model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="car-comparison-app">
      <Helmet>
        <title>Car Comparison Tool - Compare Vehicle Specifications and Prices</title>
        <meta name="description" content="Compare different car models, prices, and specifications. Find the perfect vehicle for your needs." />
        <meta name="keywords" content="car comparison, vehicle specs, car prices, automotive comparison tool" />
      </Helmet>

      <header className="header">
        <h1>Car Comparison Tool</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search cars by brand or model..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </header>

      <main className="main-content">
        <div className="selected-cars">
          <h2>Selected Cars ({selectedCars.length}/3)</h2>
          {selectedCars.length > 1 && (
            <button
              onClick={() => setIsComparing(true)}
              className="compare-button"
            >
              Compare Selected Cars
            </button>
          )}
        </div>

        <div className="car-grid">
          {filteredCars.map(car => (
            <div key={car.id} className="car-card">
              <img
                src={car.image}
                alt={`${car.brand} ${car.model}`}
                loading="lazy"
                className="car-image"
              />
              <div className="car-info">
                <h3>{car.brand} {car.model}</h3>
                <p className="car-price">${car.price.toLocaleString()}</p>
                <p className="car-rating">Rating: {car.rating}/5</p>
                <p className="car-weight">Weight: {car.weight}</p>
                <button
                  onClick={() => handleCarSelect(car)}
                  className={`select-button ${selectedCars.find(c => c.id === car.id) ? 'selected' : ''}`}
                >
                  {selectedCars.find(c => c.id === car.id) ? 'Selected' : 'Select for Comparison'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {isComparing && (
          <Suspense fallback={<div>Loading comparison...</div>}>
            <ComparisonModal
              cars={selectedCars}
              onClose={() => setIsComparing(false)}
            />
          </Suspense>
        )}
      </main>
    </div>
  );
};

export default CarComparisonApp;