import React from "react";
// import styles from './singleSpot.module.css';
import { useSelector } from "react-redux";

 function SingleSpotDetails() {
    // const { city,state,avgRating,price,previewImage } = useParams()
    // need to deconstruct so that i can just reference those things.

    const spot = useSelector((state)=>state.Spots.singleSpot);
    console.log('spot',spot);

    // const spotPic = useSelector((state)=>state.SpotImages.url)
    const spotPic = spot.SpotImages.find(imgObj => imgObj.preview===true)

    return (
        <div>
            <div className='spot-listing-name'>
                <h1>{spot.name}</h1>
            </div>

            <div className='city-state-review-div'>
                <div>{spot.address}</div>
                <div>{spot.city}</div>
                <div>{spot.state}</div>
                <div>{spot.country}</div>
            </div>

            <div className='spot-preview-image-div'>
                <img src={spotPic.url}></img>
            </div>
        </div>
    )
}

export default SingleSpotDetails;
