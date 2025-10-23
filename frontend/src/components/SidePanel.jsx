import { useState } from "react";
import ListItem from "./ListItem";
import SubscriptionCreate from "./SubscriptionCreate";



export default function SidePanel({ earthquakes, onSelect, selectedId, locationSelect, magRadiusSelect, magRadius }) {
    const [currentView, setCurrentView] = useState('recent');


    return (
        <div className="side-panel">



            <div className="panel-content">

                {currentView === 'recent' &&
                    <div>
                        <h2>Recent Earthquakes</h2>
                    </div>



                }
                {currentView === 'recent' && (earthquakes.map(quake => (


                    <ListItem
                        quake={quake}
                        key={quake.id}
                        IsSelected={quake.id == selectedId}
                        onSelect={onSelect}
                    />)))

                }

                {currentView === 'create' && (
                    <SubscriptionCreate
                        onCancel={() => setCurrentView('recent')}
                        locationSelect={locationSelect}
                        magRadiusSelect={magRadiusSelect}
                        magRadius={magRadius}
                         />
                )}
            </div>
            {currentView === 'recent' && (
                <div className="sub-create">
                    <button
                        className="sub-create-button"
                        onClick={() => setCurrentView('create')}>

                        Clear alert
                    </button>
                </div>)}


        </div>
    );
}