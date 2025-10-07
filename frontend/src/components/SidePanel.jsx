import { useState } from "react";
import ListItem from "./ListItem";
import SubscriptionCreate from "./SubscriptionCreate";



export default function SidePanel({ earthquakes, onSelect, selectedId }) {
    const [currentView, setCurrentView] = useState('recent');


    return (
        <div className="side-panel">



            <div className="panel-content">
                
            <div>
                <h2>Recent Earthquakes</h2>
            </div>
                {currentView==='recent'&& (earthquakes.map(quake => (
                    <ListItem
                        quake={quake}
                        key={quake.id}
                        IsSelected={quake.id == selectedId}
                        onSelect={onSelect}
                    />)))
                    
                    }

                    {currentView==='create' && (
                        <SubscriptionCreate onCancel={()=>setActiveView('recent')}/>
                    )}
            </div>

                                        <div className="sub-create">
                        <button
                        className="sub-create-button"
                        onClick={()=> setCurrentView('create')}>

                            Clear alert
                        </button>
                    </div>


        </div>
    );
}