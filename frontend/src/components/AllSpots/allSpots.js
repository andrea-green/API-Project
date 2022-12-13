import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getSpots } from '../../store/spots';


function AllSpots() {
    const dispatch = useDispatch();

    // const allSpots = useSelector((state) => console.log('state.Spot',state.Spots));
    // console.log(allSpots);
    const allSpots = useSelector((state)=>{
        Object.values(state.Spots)
    });

    console.log(allSpots); 

    useEffect(() =>{
        //pass in thunk action creator
        dispatch(getSpots())
    },[dispatch]);


    return (
        <div>
            <li>
                {/* {allSpots.map(({id,name,city,state,avgRating,price}) => {
                    < AllSpots
                    key={id}
                    name={name}
                    city={city}
                    state={state}
                    avgRating={avgRating}
                    price={price}
                    />
                })}; */}
            </li>
        </div>
    );
};


export default AllSpots;
