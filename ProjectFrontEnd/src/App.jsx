import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


function App() {
 return (
    <div className="welcome-container">
      <h1 className="welcome-title">Welcome to the Second Activity Exercise</h1>
      <div className="row justify-content-center">
        <div className="icon-card fade-in">
          <img
            src="src\assets\image1.png"
            alt="Icono de usuario"
            className="imagen1 img-fluid animated-icon"
          />
        </div>
      </div>
      <h3 className='welcome-subtitle'>Users and Tasks Functionality</h3>
    </div>
  );

}

export default App
