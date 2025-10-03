import { useState, useEffect } from 'react'
import SidePanel from './components/SidePanel';
// import fetch from 'axios';
import './App.css'
import 'leaflet/dist/leaflet.css'
import QuakeMap from './components/QuakeMap';


function App() {
  const [earthquakes, setEarthquakes] = useState([]);
  const [selectedId, setSelectedId] = useState(null); //why???

  useEffect(()=>{
    async function fetchQuakes(){
      try {
        const response = await fetch('http://localhost:8080/api/recent');
        const data = await response.json();
        setEarthquakes(data);
      } catch (error) {
        console.error("failed", error);
      }
      
    }
  fetchQuakes();
}, []);


  const handleSelect = (quakeId) =>{
    if(selectedId==quakeId){
      setSelectedId(null);
    }else{
      setSelectedId(quakeId);
    }
  };

  return (
    <div className='app-container'>
      <SidePanel
        earthquakes={earthquakes}
        selectedId={selectedId}
        onSelect={handleSelect}
        
        />
    
        <QuakeMap
        earthquakes={earthquakes}
        onSelect={handleSelect}
        selectedId={selectedId}

        />


    </div>
  )
}

export default App
