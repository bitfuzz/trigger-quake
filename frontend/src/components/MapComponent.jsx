import { useEffect } from "react";
import { useMap } from "react-leaflet";
import {  Marker } from 'react-leaflet';


export default function MapController({ selectedId, earthquakes, fly_to, magRadius }) { //why curly braces in parameters
    const map = useMap();
    // const zoom = ;
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

            const lat1 = fly_to[0];
            const long1 = fly_to[1];


            map.flyTo([lat1, long1], ( -1.502 * Math.log(magRadius) + 15.218 ), { //when 100 -> 9, when 5 ->13.5 
                animate: true,
                duration: 0.4
            });



        }

    }, [fly_to, magRadius])
    return (null)
        // <Marker
        //     key={`current-temp`}
        //     position={fly_to}
        // />)
}

