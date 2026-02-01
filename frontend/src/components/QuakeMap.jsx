import { MapContainer, Marker, TileLayer, Circle } from 'react-leaflet';
import MapController from './MapComponent';
import L from 'leaflet';
import '../App.css'; // Ensure you import your CSS file here

// Updated helper: Uses CSS classes instead of inline styles
const createCustomDivIcon = (magnitudeClass) => L.divIcon({
  className: `geo-marker ${magnitudeClass}`, // Combine base class + color class
  html: '', // No inner HTML needed, CSS handles the shape
  iconSize: [16, 16], // Match CSS size
  iconAnchor: [8, 8], // Center it (half of 16)
  popupAnchor: [0, -10]
});


const subMarker =  L.divIcon({
        className: 'sub-marker',
        html: "<div' class='marker-pin'></div><i class='material-icons'></i>",
        iconSize: [20, 42],
        iconAnchor: [10, 42]
    });

// Helper to determine class based on magnitude
const getMarkerClass = (mag) => {
  const m = parseFloat(mag);
  if (m >= 4.5) return 'marker-high';
  if (m >= 2.5) return 'marker-med';
  return 'marker-low';
};

export default function QuakeMap({ earthquakes, onSelect, selectedId, fly_to, magRadius }) {

  const fillBlueOptions = { fillColor: 'black' , color: 'black'}

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
      {/* PRO TIP: Switch this TileLayer to a "Light" or "Positron" style 
         to match your cream UI better than the default OSM.
      */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {fly_to && fly_to.length > 0 && (
        <>
          <Marker
            key={'current-temp'}
            position={fly_to}
            icon={subMarker}
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
        
        // Handle world wrapping manually (as per your original code)
        const positions = [
          [lat, lon],
          [lat, lon + 360],
          [lat, lon - 360]
        ];

        // Determine which CSS class to use for this quake
        const markerClass = getMarkerClass(quake.magnitude);

        return positions.map((pos, index) => (
          <Marker
            key={`${quake.id}-${index}`}
            position={pos}
            // Pass the calculated CSS class to the icon creator
            icon={createCustomDivIcon(markerClass)}
            eventHandlers={{
              click: () => onSelect(quake.id)
            }} 
          />
        ));
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