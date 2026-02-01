import { use, useCallback, useEffect, useState } from "react";

import { cssTransition, toast, Slide, Bounce } from 'react-toastify';


export default function SubscriptionCreate({ locationSelect, onCancel, magRadiusSelect, location, magRadius }) {
    //states for the form
    const [mag, setMag] = useState('');
    const [email, setEmail] = useState('');
    const [query, setQuery] = useState('');
    const [error, setError] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [mError, setMError] = useState('');

    const [isSearchEmpty, setSearchEmpty] = useState(false);

const SlideRightAnimation = cssTransition({
  enter: 'slide-right-blur-enter',
  exit: 'slide-right-blur-exit',
  duration: 200 // Match this to the 0.3s in your CSS
});

    const notify = () => toast('Alert Saved', {
                    position: "bottom-right",
                    autoClose: 2100,
                    hideProgressBar: true,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: SlideRightAnimation,
                    });



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



    const handleSubmit = async(e)=>{
        e.preventDefault();
        const subscriptionData = {
            email: email, // You can hook this to your state later
            lat: location[0],               // Use the map's clicked location here if available
            lon: location[1],
            radius_km: magRadius,
            min_magnitude: mag
        }
        try {
            
            const response = await fetch('http://localhost:5001/api/subscription', 
                {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(subscriptionData),
                    }
            );

            if(response.ok){
                const data = await response.json();
                console.log("Success:", data);


                toast.success('Alert Saved', {
                    position: "bottom-right",
                    autoClose: 2100,
                    hideProgressBar: true,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: SlideRightAnimation,
                    });
                // alert("Subscription Saved! Check your Database.");
                //toast

                
                // toast("Subscription Saved !");
                // toast.success('Subscription Saved !', {
                //     position: "top-right",
                //     autoClose: 3000,
                //     hideProgressBar: false,
                //     closeOnClick: false,
                //     pauseOnHover: true,
                //     draggable: true,
                //     progress: undefined,
                //     theme: "light",
                //     transition: Slide,
                //     });
                

            }else{
                console.error("Server Error");
                toast('Server Error', {
                    position: "bottom-right",
                    autoClose: 2100,
                    hideProgressBar: true,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: SlideRightAnimation,
                    });
            }


        } catch (error) {
            console.log("Network Error: ", error);
            toast.error(`Network Error: ${error}`, {
                    position: "bottom-right",
                    autoClose: 2100,
                    hideProgressBar: true,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: false,
                    theme: "light",
                    transition: SlideRightAnimation,
                    });

        }

    };


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

        debounce(fetchSuggestion, 300), [fetchSuggestion]
    );



    const getCoordinates = (place) => {
        // console.log("This is the place:", place.geometry.coordinates);
        const c = place.geometry.coordinates
        const lat = c[1];
        const long = c[0]; //can add the zoom levels and radius for better 
        locationSelect([lat, long]);
        // isSearchEmpty = true;
        setSearchEmpty(true)

    }

    const displayPlace = (place) => {


        return [place.properties.city, place.properties.state, place.properties.country].filter(Boolean).join(', ')

    };

    const handleSearch = (query) => {
        debounced(query)

    }

    const checkEmail = useCallback(

        debounce((email) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            // console.log(email.target.value)
            if (emailRegex.test(email.target.value)) {

                setError(null)
            } else if (email.target.value === '') {
                setError('Email required!');
            }
            else {
                setError('Enter a valid email!');
            }
        }, 300, [])
    );

    const handleEmail = (e) => {
        setEmail(e.target.value)

        //don't forget to debounce this little shit

        checkEmail(e)

    }

    const handleMag = (e) => {
        const value = e.target.value;
        if (value >= 1 && value <= 10) {
            setMag(value);
            setMError('');
        }
        else if (value === '') {
            setMag('')
            setMError('Magnitude Required!');
        }
    }

    const saveData = ()=>{
        //email, radius, mag, location

    } // get the email, magnitude, radius and location and send all of that data to the internal backend api that will save that data to a table


    const handleCancel = () => {
        resetBar();
        locationSelect([]);
        magRadiusSelect(5);

        //reset all the feild, email, slider etc
        //--TODO add a popup for concel confirmation
        onCancel();
    }
    useEffect(() => {
        debounced(query);

    }, [query, debounced]);
    return (
        <div className="create-panel">
     
            <h2>Create Subscription</h2>
            <div className="search-container">
                <div className={`search-box-container`} >
                    <input
                        type="text"
                        className={`${suggestions.length === 0 ? 'static-' : ''}search-bar`}
                        value={query}
                        onChange={(e) => { setQuery(e.target.value) }}
                        placeholder="e.g,  Italy"
                    />


                    <button
                        className={`${suggestions.length === 0 && !query ? 'static-' : ''}search-button`}
                        onClick={() => { handleSearch(query) }}>
                        Search
                    </button>



                </div>
                {suggestions.length > 0 && (
                    <div className="suggestion-list">
                        {suggestions.map((place) => (
                            <div
                                key={place.properties.osm_id}
                                className="location-list"
                                onClick={() => {
                                    resetBar();
                                    getCoordinates(place);

                                }}>
                                {/*set the input to the fullname of the place & clear the current suggestion list, get the coords of the place*/}
                                {/* {console.log(place)} */}
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

            <label
                className=""
                htmlFor="radius"
            >
                Alert Radius: {magRadius+' km'} 
            </label>
            <input
                type="range"
                className="radius"
                id="radius"
                min="5"
                max="100"
                step="1"
                value={magRadius}
                disabled={!isSearchEmpty}
                onChange={e => magRadiusSelect(e.target.value)} required />



            <label
                htmlFor="magnitude">
                Magnitude
            </label>
            <input
                type="text"
                inputMode="decimal"
                className="magnitude"
                id="magnitude"
                placeholder="e.g 6.7"
                disabled={!isSearchEmpty}
                onChange={handleMag}
                value={mag}
                min={0}
                max={10}
                required />
            {mError && <label className="error-message-mag">{mError}</label>}



            <label
                htmlFor="email"
            >
                Email
            </label>
            <input
                type="email"
                className="email"
                disabled={!isSearchEmpty}
                placeholder="john@example.com" required
                value={email}
                onChange={handleEmail} />
            {error && <label className="error-message">{error}</label>}

            <div className="footer">

                <button
                    className="cancel"
                    onClick={handleCancel}>
                    Cancel
                </button>

                {/* <button
                    className="cancel1"
                    onClick={notify}
                >


                </button> */}


                <button
                    className="save-alert"
                    disabled={(!isSearchEmpty) || (mError) || (error) || (!email) || (!mag)}
                    onClick={handleSubmit}>
                    Save Alert
                </button>


            </div>


        


        </div>
    );

}