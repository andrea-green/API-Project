import React from "react";
import { useSelector } from "react-redux";
import '../../index.css';

function SingleSpotDetails() {
    // const { city,state,avgRating,price,previewImage } = useParams()
    // need to deconstruct so that i can just reference those things.

    const spot = useSelector((state) => state.Spots.singleSpot);

    // const spotPic = useSelector((state)=>state.SpotImages.url)


    return (
        <div className='overal-single-spot'>
            <div className='spot-listing-name'>
                <h1>{spot.name}</h1>
            </div>

            <div className='city-state-review-div'>
                <div className='below-name-details'>
                    <div className='star-and-superhost-div'>
                        <i class="fa-regular fa-star">{spot.avgStarRating}stars</i>
                        <span>{spot.numReview}</span>
                        <i class="fa-solid fa-trophy">Superhost</i>
                    </div>
                    <span>{spot.city},{spot.state},{spot.country}</span>
                    {/* <div className='share-and-like-div'>
                        <i class="fa-solid fa-arrow-up-from-bracket">share</i>
                        <i class="fa-solid fa-heart">Like</i>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default SingleSpotDetails;
