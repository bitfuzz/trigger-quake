


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
    let mclassname = (magnitude) =>{ 
        if(parseFloat(magnitude)<3){
            return 'magniutude-class-green'
        }else if(parseFloat(magnitude)>5){
            return 'magniutude-class-red'
        }else{
            return 'magniutude-class-yellow'
        }

    }

    function diplayTime (){
                if (timeh===0){
            return timem + ' Minutes ago'
        }else{
            return timeh + ' Hours ago'
        }


    }




    if (!felt) {
        felt = "None";
    }
    return (
        <div
            className={'list-item'}
        >
            {/* onClick={()=> onSelect(quake.id)} */}
            <div
                className={'list-item-header'}
                onClick={() => onSelect(quake.id)} >

                <div className={mclassname(magnitude)}>
                    {'M ' + (magnitude)}

                </div>
                <div className="earthquake-details">
                    {title}
                    <div className="earthquake-time">
                        {diplayTime()}
                    </div>
                </div>

            </div>

            <div className={`list-panel ${IsSelected ? 'open' : ''}`}>
                <div className="accordion-content-inner">
                    {IsSelected && (
                        <div className="details"
                            onClick={(e) => e.stopPropagation()}>
                            <p>Time: {time1}</p>
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