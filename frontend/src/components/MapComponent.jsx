import { use, useEffect } from "react";
import { useMap } from "react-leaflet";

export default function MapController({selectedId, earthquakes}){ //why curly braces in parameters
    const map = useMap();
    useEffect(()=>{
        if(selectedId){
            const selectedQuake = earthquakes.find(q => q.id === selectedId)
            if(selectedQuake){
                const lat = parseFloat(selectedQuake.lat);
                const long = parseFloat(selectedQuake.long);
                map.flyTo([lat, long],8, {
        animate: true,
        duration: 0.8
});
            }
        }

    }, [selectedId, earthquakes, map]); //dependencies

    return null
}