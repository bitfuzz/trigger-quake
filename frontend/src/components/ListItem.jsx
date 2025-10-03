


export default function ListItem({ quake, IsSelected, onSelect }) {
    // console.log("Quake Mag:",quake);
    let felt = quake.felt;
    let magnitude = parseFloat(quake.magnitude).toFixed(1)
    let title = 'M ' + (magnitude) + quake.title.split('of')[1]
    let time = quake.time

    if (!felt) {
        felt = "None";
    }
    return (
        <div
            className={'list-item'}

        >
            {/* onClick={()=> onSelect(quake.id)} */}
            <button
                className={'list-item-header'}
                onClick={() => onSelect(quake.id)} >
                <span>{title}</span>
            </button>

            <div className={`list-panel ${IsSelected ? 'open' : ''}`}>
                <div className="accordion-content-inner">
                    {IsSelected && (
                        <div className="details"
                            onClick={(e) => e.stopPropagation()}>
                            <p>Time: {time}</p>
                            {/* <p>Time: {quake.time}</p> */}
                            <p>Depth: {quake.depth}</p>
                            <p>Coordinates: {quake.lat} {quake.long}</p>
                            <p>Felt: {felt}</p>
                            <p>Place: {quake.place}</p>


                        </div>)}
                </div>
            </div>



        </div>
    );
}