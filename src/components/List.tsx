import React, { useEffect, useState,useRef } from 'react';
import { Link } from 'react-router-dom';

const List: React.FC = () => {
  const [elements, setElements] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loading, setLoading] = useState(false); 
  const ref:any = useRef(null);
 
  const [page, setPage] = useState(1);
  let limit:any = 10;

  useEffect(() => {    
    const storedFavorites = localStorage.getItem('favorites');    
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
    let lastLoaded:any = localStorage.getItem('lastLoaded')

    if(lastLoaded && parseInt(lastLoaded)>0){
      limit=parseInt(lastLoaded)*limit
    }
   
   
  }, []);

  useEffect(() => {   
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {     
    if (elements.length === 0) {
      let lastScrolled:any = localStorage.getItem('scrollPosition')
      if(lastScrolled && parseInt(lastScrolled)>0){
        console.log(lastScrolled)
        ref.current.scrollTop=lastScrolled
      }
      fetchElements();            
    }  

  }, []);

  const fetchElements = async () => {
    setLoading(true);   
    const response = await fetch(`https://jsonplaceholder.typicode.com/albums/1/photos?_page=${page}&_limit=${limit}`);
    const data = await response.json();
    setElements((prevElements) => [...prevElements, ...data]);
    setLoading(false);
    
  };

  const handleAddToFavorites = (element: any) => {
    const existingIndex = favorites.findIndex((fav) => fav.id === element.id);
    if (existingIndex === -1) {
      setFavorites([...favorites, element]);
    } else {
      const updatedFavorites = [...favorites];
      updatedFavorites.splice(existingIndex, 1);
      setFavorites(updatedFavorites);
    }
  };

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 20 && !loading) {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    if (page > 1) {
      localStorage.setItem('lastLoaded', page.toString());
      fetchElements();
    }
  }, [page]);

  useEffect(() => {   
    if (ref.current) {
      localStorage.setItem('scrollPosition', ref.current?.scrollHeight); 

    }
  }, [ref.current?.scrollHeight]);

  return (
    <div>
      <h2> Elements</h2>
 
      <ul className='list-group' onScroll={handleScroll} ref={ref} style={{ height: '500px', overflowY: 'scroll' }}>
        {elements.map((element) => (
          <li  key={element.id} className='list-group-item mt-2'>
            <div className='row'>
              <div className='col-md-6'>
              <img src={element.thumbnailUrl} alt={element.title} />
              </div>
              <div className='col-md-3'>          
              <label><strong>ID: </strong>  {element.id}</label><br/>
              <label><strong>Title:: </strong> {element.title}</label>
              </div>
              <div className='col-md-3'>          
              <button onClick={() => handleAddToFavorites(element)} type="button" className="btn btn-primary"> {favorites.some((fav) => fav.id === element.id) ? 'Remove Favorites' : 'Add Favorites'}</button>

         
              </div>
            </div>
            
          </li>
          
        ))}
      </ul>
      <button className='mt-2'>
        <Link to="/">Back to Dashboard</Link>
      </button>
    </div>
  );
};

export default List;
