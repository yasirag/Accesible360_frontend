import { useState, useEffect } from 'react';
import './loading.css';

function Loading() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
   
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return 95;
        return prev + Math.random() * 30;
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading">
      <div className="loading-container">
        <h2>Escaneando tu sitio...</h2>
        
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        <p className="progress-text">{Math.round(progress)}%</p>
        
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
        
        <p className="loading-hint">Esto tomará menos de 30 segundos</p>
      </div>
    </div>
  );
}

export default Loading;