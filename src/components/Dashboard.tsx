// src/Dashboard.tsx
import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => { 
  const [favorites, setFavorites] = useState<any[]>([]);

  useEffect(() => {    
    const storedFavorites = localStorage.getItem('favorites');    
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
   
  }, []);
  return (
    <div>
      
      <h5>Favorites List </h5>
      <ul className='list-group'>
      {favorites.length===0 && <div>
        No Favorites
        </div>}
        {favorites.length>0 && favorites.map((item, index) => (
          <li key={index} className='list-group-item mt-2'>
            <div className='row'>
              <div className='col-md-6'>
              <img src={item.thumbnailUrl} alt={item.title} />
              </div>
              <div className='col-md-6'>          
              <label><strong>ID: </strong>  {item.id}</label><br/>
              <label><strong>Title:: </strong> {item.title}</label>
              </div>
            </div>
            
          </li>
          
        ))}
      </ul>
      <Link to="/list">Go to List</Link>
    </div>
  );
};

export default Dashboard;
