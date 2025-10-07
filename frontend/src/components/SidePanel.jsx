import ListItem from "./ListItem";
import SubscriptionCreate from "./SubscriptionCreate";


export default function SidePanel({ earthquakes, onSelect, selectedId }) {


    return (
        <div className="side-panel">


            <div>
                <h2>Recent Earthquakes</h2>
            </div>

            <div className="panel-content">
                {currentView==='revent'&& (earthquakes.map(quake => (
                    <ListItem
                        quake={quake}
                        key={quake.id}
                        IsSelected={quake.id == selectedId}
                        onSelect={onSelect}
                    />)))}

                    {currentView==='create' && (
                        <SubscriptionCreate onCancel={()=>setActiveView('recent')}/>
                    )}
            </div>
                    <div className="sub-create">
                        <button
                        className="sub-create-button"
                        onClick={()=> setActiveView('create')}>

                            
                        </button>
                    </div>


        </div>
    );
}