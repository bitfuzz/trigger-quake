import { useCallback, useEffect, useState } from "react";

export default function SubscriptionCreate({ locationSelect, onCancel, magRadiusSelect, magRadius }) {
    //states for the form
    const [mag, setMag] = useState(0);
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




    const resetBar = () => {
        setSuggestions([])
    }

    const debounced = useCallback(
        // if(query.length<0) return;
        debounce(fetchSuggestion, 300), [fetchSuggestion]
    );



    const getCoordinates = (place) => {
        console.log("This is the place:", place.geometry.coordinates);
        const c = place.geometry.coordinates
        const lat = c[1];
        const long = c[0]; //can add the zoom levels and radius for better 
        locationSelect([lat, long]);

    }

    const displayPlace = (place) => {


        return [place.properties.city, place.properties.state, place.properties.country].filter(Boolean).join(', ')

    };

    const handleSearch = (query) => {
        debounced(query)

    }
    useEffect(() => {
        debounced(query);

    }, [query, debounced]);
    return (
        <div className="create-panel">
            <p>Create Subscription</p>
            <div className="search-container">
                <div className={`search-box-container`} >
                    <input
                        type="text"
                        className={`${suggestions.length===0?'static-':''}search-bar`}
                        value={query}
                        onChange={(e) => { setQuery(e.target.value) }}
                        placeholder="e.g,  Italy"
                    />


                    <button 
                    className={`${suggestions.length===0?'static-':''}search-button`}
                    onClick={() => { handleSearch(query) }}>
                        Search
                    </button>



                </div>
                {suggestions.length > 0 && (
                    <div className="suggestion-list">
                        {suggestions.map((place) => (
                            <div
                                key={place.properties.osm_id}
                                onClick={() => {
                                    resetBar();
                                    getCoordinates(place);

                                }}>
                                {/*set the input to the fullname of the place & clear the current suggestion list, get the coords of the place*/}
                                {console.log(place)}
                                {/* //a function to display the list properly */}
                                <div className="main-location">

                                    {place.properties.name}
                                    <div className="sub-location">
                                        {displayPlace(place)}
                                    </div>
                                </div>
                                {/* {place.properties.name} */}

                            </div>
                        ))}
                    </div>

                )}
            </div>


            <input
                type="range"
                className="radius"
                min="5"
                max="100"
                value={magRadius}
                onChange={e => magRadiusSelect(e.target.value)} />
            <div className="range-bubble">
                {magRadius}
            </div>

            <input
                type="number"
                className="magnitude"
            />

            <input
                type="text"
                className="email"
                placeholder="john@example.com" />

            <div className="footer">
                <button className="save-alert">
                    Save Alert
                </button>


                <button
                    className="cancel"
                    onClick={onCancel}>
                    Cancel
                </button>
            </div>



        </div>
    );

}