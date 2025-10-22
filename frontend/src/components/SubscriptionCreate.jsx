import { useCallback, useEffect, useState } from "react";

export default function SubscriptionCreate({ locationSelect }) {
    //states for the form
    const [mag, setMag] = useState(null);
    const [radius, setRadius] = useState(5);
    const [email, setEmail] = useState(null);
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    //code to handle the query and search bar

    // const checkLen = (arr) => {
    //     return arr.length;

    // }
    //debounces any function
    const debounce = (func, delay) => {
        let timeoutId;
        return (...args) => {
            if (timeoutId) clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func(...args)
            }, delay);
        }
    }


    const fetchSuggestion = useCallback(async (searchQuery) => {
        if (searchQuery.length < 2) {
            setSuggestions([]);
            return;
        }

        const url = `https://photon.komoot.io/api/?q=${searchQuery}&limit=5`;

        await fetch(url)
            .then(response => response.json())
            .then(data => {
                setSuggestions(data.features || [])
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);


    const getCoordinates = (place) => {
        console.log("This is the place:", place.geometry.coordinates);
        const c = place.geometry.coordinates
        const lat = c[1];
        const long = c[0]
        locationSelect([lat, long]);

    }

    const resetBar = () => {
        setSuggestions([])
    }

    const debounced = useCallback(
        // if(query.length<0) return;
        debounce(fetchSuggestion, 300), [fetchSuggestion]
    );

    const displayPlace = (place) => {

        return (
            <div>
                {place.properties.name}
            </div>)
    };


    useEffect(() => {
        debounced(query);

    }, [query, debounced]);
    return (
        <div className="create-panel">
            <div className="search-container">
                <input
                    type="text"
                    className="search-bar"
                    value={query}
                    onChange={(e) => { setQuery(e.target.value) }}
                    placeholder="e.g,  Italy"
                />
            

                <button className="search-button">
                    0=
                </button>
            </div>

                            {suggestions.length > 0 && (
                    <ul className="suggestion-list">
                        {suggestions.map((place) => (
                            <li
                                key={place.properties.osm_id}
                                onClick={() => {
                                    resetBar();
                                    getCoordinates(place);

                                }}> {/*set the input to the fullname of the place & clear the current suggestion list, get the coords of the place*/}

                                {/* //a function to display the list properly */}
                                {displayPlace(place)}
                                {/* {place.properties.name} */}

                            </li>
                        ))}
                    </ul>

                )}


            <button className="save-alert">
                Save Alert
            </button>


            <button className="cancel">
                Cancel
            </button>

            <input
                type="text"
                className="magnitude"
                placeholder="temp" />
            <input
                type="text"
                className="email"
                placeholder="john@example.com" />

        </div>
    );

}