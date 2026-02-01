import { useState, useEffect } from 'react'
import SidePanel from './components/SidePanel';
// import fetch from 'axios';
import './App.css'
import 'leaflet/dist/leaflet.css'
import QuakeMap from './components/QuakeMap';

import { ToastContainer } from 'react-toastify';


function App() {
  const [earthquakes, setEarthquakes] = useState([]);
  const [selectedId, setSelectedId] = useState(null); //why???
  const [activeView, setActiveView] = useState('recent');
  const [location, setlocation] = useState([]);
  const [magRadius, setMagRadius] = useState(5);

  useEffect(()=>{
    async function fetchQuakes(){
      try {
        const response = await fetch('http://localhost:5001/api/recent');
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
        locationSelect={setlocation}
        location={location}
        magRadiusSelect={setMagRadius}
        magRadius={magRadius}
        
        />
    
        <QuakeMap
        earthquakes={earthquakes}
        onSelect={handleSelect}
        selectedId={selectedId}
        fly_to={location}
        magRadius={magRadius}

        />


      <ToastContainer
          className="toasty"
          position="top-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          />

    </div>
  )
}

export default App
