import { MapContainer, Marker, TileLayer, Circle } from 'react-leaflet';
import MapController from './MapComponent';





export default function QuakeMap({ earthquakes, onSelect, selectedId, fly_to, magRadius }) {

  const fillBlueOptions = { fillColor: 'blue' }

  return (
    <MapContainer
      center={[0, 0]}
      zoom={2}
      maxBounds={[[90, -Infinity], [-90, Infinity]]}
      maxBoundsViscosity={1}
      minZoom={1.5}
      worldCopyJump={true}
      style={{ height: '100%', width: '100%' }}
    >


      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {fly_to && fly_to.length > 0 && (
        <>
          <Marker
            key={'current-temp'}
            position={fly_to}
          />
          <Circle 
          center={fly_to} 
          pathOptions={fillBlueOptions} 
          radius={magRadius*1000}
           />

        </>
      )}


      {earthquakes.map(quake => {

        const lat = parseFloat(quake.lat);
        const lon = parseFloat(quake.long);
        const positions = [[lat, lon],
        [lat, lon + 360],
        [lat, lon - 360]]
        const markers = positions.map((pos, index) => (

          <>

            <Marker
              key={`${quake.id}-${index}`}
              position={pos}
              eventHandlers={{
                click: () => onSelect(quake.id)
              }} />

          </>
        ));

        return markers;
      })}
      <MapController
        selectedId={selectedId}
        earthquakes={earthquakes}
        fly_to={fly_to}
        magRadius={magRadius}
      />

    </MapContainer>


  );

}