import React, {useEffect,useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getSpotsThunk } from '../../store/spots';
import {Route} from 'react-router-dom';
import SingleSpot from '../SingleSpot/single-spot-comp';



function AllSpots() {
    const dispatch = useDispatch();
    const [showForm, setShowForm] = useState(false);

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
        <div>
            {allSpotsArr.map(({city,state,avgRating,price,previewImage}) => (
                <div>
                    <div className='spot-preview-image-div'>
                         <img src={previewImage}></img>
                    </div>
                    <div className='city-state-review-div'>
                        <div>{`${city},${state}`}</div>
                        <div>{avgRating}</div>
                    </div>
                    <div className='price-div'>
                        <li>{`$${price} night`}</li>
                    </div>
                </div>
                ))};
        </div>
    );
};


export default AllSpots;
