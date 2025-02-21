import React from 'react';
import './LoadingSpinner.css';

function LoadingSpinner() {
  return (
    <div className="loading-spinner">
      <div className="spinner"></div>
      <p className="loading-text">Загрузка репозиториев...</p>
    </div>
  );
}

export default LoadingSpinner;