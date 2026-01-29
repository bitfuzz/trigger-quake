


export default function ListItem({ quake, IsSelected, onSelect }) {
    // console.log("Quake Mag:",quake);
    let felt = quake.felt;
    let magnitude = parseFloat(quake.magnitude).toFixed(1)
    let title = quake.title.split('of')[1]
    let time1 = quake.time
    const target = new Date(time1);
    const now = new Date();
    const timeh = Math.round((now.getTime() - target.getTime()) / (60*60*1000));
    const timem = Math.round((now.getTime() - target.getTime()) / (60*1000));
    let mclassname = (magnitude) => {
        if (parseFloat(magnitude) < 3) {
            return 'item-low';
        } else if (parseFloat(magnitude) > 5) {
            return 'item-high';
        } else {
            return 'item-med';
        }
    }

    function diplayTime() {
        if (timeh === 0) {
            return timem + ' Minutes ago'
        } else {
            return timeh + ' Hours ago'
        }
    }


    if (!felt) {
        felt = "None";
    }
    return (
        <div
            className={`list-item ${IsSelected ? 'selected' : ''}`}
        >
            {/* onClick={()=> onSelect(quake.id)} */}
            <div
                className={'list-item-header'}
                onClick={() => onSelect(quake.id)} >

                <div className={`magnitude-text ${mclassname(magnitude)}`}>
                    {'M ' + (magnitude)}
                </div>
                <div className="earthquake-info">
                    <span className="earthquake-place">{title}</span>
                    <div className="earthquake-meta">
                        <span>{diplayTime()}</span>
                    </div>
                </div>

            </div>

            <div className={`list-panel ${IsSelected ? 'open' : ''}`}>
                <div className="accordion-content-inner">
                    {IsSelected && (
                        <div className="details"
                            onClick={(e) => e.stopPropagation()}>

                            <div className="detail-grid">
                                <div className="detail-item">
                                    <label>Depth</label>
                                    <span>{quake.depth} km</span>
                                </div>
                                <div className="detail-item">
                                    <label>Felt Reports</label>
                                    <span>{felt}</span>
                                </div>
                                <div className="detail-item">
                                    <label>Coordinates</label>
                                    <span>{parseFloat(quake.lat).toFixed(4)}, {parseFloat(quake.long).toFixed(4)}</span>
                                </div>
                                <div className="detail-item">
                                    <label>Time</label>
                                    <span>{new Date(time1).toLocaleString([], { dateStyle: 'short', timeStyle: 'medium' })}</span>
                                </div>
                            </div>
                            
                            <div className="detail-item" style={{ marginTop: '1.5rem' }}>
                                <label>Location</label>
                                <span>{quake.place}</span>
                            </div>

                        </div>)}
                </div>
            </div>



        </div>
    );
}