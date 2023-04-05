import React from 'react';
import bg_img from '../../assets/top_bg.jpg'
import { useNavigate } from 'react-router-dom';
import './App.css';

function App() {
  const navigate = useNavigate();

  const handleCustomer = () => {
    navigate('/customer')
  }

  const handleMaker = () => {
    navigate('/maker')
  }

  return (
    <div className="App">
      <div className='bg'>
        <button className='customer' onClick={handleCustomer}>
          I'm a customer
        </button>

        <button className='maker' onClick={handleMaker}>
          I'm a maker
        </button>
      </div>
    </div>
  );
}

export default App;
