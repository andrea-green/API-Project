import React from "react";
import styles from './singleSpot.module.css';
import {useParams} from 'react-router-dom';

 function SingleSpotDetails() {
    const { city,state,avgRating,price,previewImage } = useParams()
    // need to deconstruct so that i can just reference those things. 
    return (
        <div>
            <div className='spot-listing-name'>
                <h1>Spot Listing name </h1>
            </div>

            <div className='city-state-review-div'>
                <div>{avgRating}</div>
                <div>{`${city},${state}`}</div>
                {/* //<div>{`${Reviews.length} Reviews`}</div> */}
            </div>

            <div className='spot-preview-image-div'>
                <img src={previewImage}></img>
            </div>


        </div>
    )
}

export default SingleSpotDetails;
