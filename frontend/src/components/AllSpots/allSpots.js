import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getSpotsThunk } from '../../store/spots';



function AllSpots() {
    const dispatch = useDispatch();

    // const allSpots = useSelector((state) => console.log('state.Spot',state.Spots));
    // console.log(allSpots);
    const allSpots = useSelector((state)=>state.Spots.allSpots);
    // console.log('state',state)

    // console.log('allSpots',allSpots);
    const allSpotsArr = Object.values(allSpots);
     //console.log('allSpotsArr',allSpotsArr);

     useEffect(() =>{
        // console.log('action working')
        //pass in thunk action creator
        dispatch(getSpotsThunk())
    },[dispatch]);


    return (
        //redo this part like sohini showed me to 
        <section className='big-box-div'>
            <div className="all-spots-page">
                {allSpotsArr.map(({id,city,state,avgRating,price,previewImage}) => (
                    <div key={id} className='all-spots-details'>
                        <div className='spot-preview-image-div'>
                            <img src={previewImage}></img>
                        </div>
                        <div className='city-state-div'> {`${city},${state}`}</div>
                        <div className='price-div'>{`${price} night`}</div>
                        <div className="rating-div">{avgRating} </div>
                    </div>
                    ))};
            </div>
        </section>
    );
};


export default AllSpots;
