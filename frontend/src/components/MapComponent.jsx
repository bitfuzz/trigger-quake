import { useEffect } from "react";
import { useMap } from "react-leaflet";
import {  Marker } from 'react-leaflet';


export default function MapController({ selectedId, earthquakes, fly_to }) { //why curly braces in parameters
    const map = useMap();
    useEffect(() => {
        if (selectedId) {
            const selectedQuake = earthquakes.find(q => q.id === selectedId)
            if (selectedQuake) {
                const lat = parseFloat(selectedQuake.lat);
                const long = parseFloat(selectedQuake.long);
                map.flyTo([lat, long], 8, {
                    animate: true,
                    duration: 0.8
                });
            }
        }


    }, [selectedId, earthquakes, map]);//dependencies


    useEffect(() => {
        if (fly_to.length > 0) {
            console.log(fly_to)
            // Fly(fly_to);
            const lat1 = fly_to[0];
            const long1 = fly_to[1];
            // const position = [lat, long]
            // const map = useMap();

            map.flyTo([lat1, long1], 8, {
                animate: true,
                duration: 0.8
            });



        }

    }, [fly_to])
    return (null)
        // <Marker
        //     key={`current-temp`}
        //     position={fly_to}
        // />)
}

