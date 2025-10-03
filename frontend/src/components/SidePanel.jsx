import ListItem from "./ListItem";



export default function SidePanel({earthquakes, onSelect, selectedId}){


    return(
        <div className="side-panel">
            <h2>Recent Earthquakes</h2>
            {earthquakes.map(quake => (
                <ListItem 
                quake={quake}
                key={quake.id}
                IsSelected={quake.id==selectedId}
                onSelect={onSelect}

                />
            ))}
        </div>
    );
}