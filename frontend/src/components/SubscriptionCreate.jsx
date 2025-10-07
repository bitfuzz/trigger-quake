import { use, useCallback, useEffect, useState } from "react";



export default function SubscriptionCreate() {
    //states for the form
    const [mag, setMag] = useState(null);
    const [radius, setRadius] = useState(5);
    const [email, setEmail] = useState(null);
    const [query, setQuery] = useState();
    const [suggestions, setSuggestions] = useState();

    //code to handle the query and search bar


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
                setSuggestions(data || [])
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);



    const debounced = useCallback(debounce(fetchSuggestion, 300), [fetchSuggestion]);


    useEffect(() => {
        debounced(query);

    }, [query, debounced]);
    return (
        <div className="create-panel">
            <div className="create-input">
                <input
                    type="text"
                    className="search-bar"
                    value={query}
                    onChange={(e) => { setQuery(e.target.value) }}
                    placeholder="e.g,  Italy"
                />
                {suggestions.length > 0 && (
                    <ul className="suggestion-list">
                        {suggestions.map((place) => {
                            <li>
                                {/* //a function to display the list properly */}
                                {place}
                            </li>
                        })}
                    </ul>

                )}
            </div>


            <button className="save-alert">

            </button>
            <button className="cancel">

            </button>

            <input
                type="text"
                className="magnitude" />
            <input
                type="text"
                className="email" />

        </div>
    );

}