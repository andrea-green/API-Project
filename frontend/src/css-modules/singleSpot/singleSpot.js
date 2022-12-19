import React from "react";


import { useSelector } from "react-redux";

function SingleSpotDetails() {
    // const { city,state,avgRating,price,previewImage } = useParams()
    // need to deconstruct so that i can just reference those things.

    const spot = useSelector((state) => state.Spots.singleSpot);

    // const spotPic = useSelector((state)=>state.SpotImages.url)
    const spotPic = spot.SpotImages.find(imgObj => imgObj.preview === true)
    const owner = useSelector((state) => state.Spots.singleSpot.Owner.firstName)


    return (
        <div>
            <div className='spot-listing-name'>
                <h1>{spot.name}</h1>
            </div>

            <div className='city-state-review-div'>
                <i class="fa-regular fa-star">{spot.avgStarRating}</i>
                <div>{spot.numReview}</div>
                <i class="fa-solid fa-trophy">Superhost</i>
                <div>{spot.city}</div>
                <div>{spot.state}</div>
                <div>{spot.country}</div>
            </div>

            <div className='spot-preview-image-div'>
                <img src={spotPic?.url} alt='spot-pic-url'></img>
            </div>

            <div className='share-and-like'>
                <i class="fa-solid fa-arrow-up-from-bracket">share</i>
                <i class="fa-solid fa-heart">Like</i>

            </div>
            <div className='hosted-by-header'>
                <h1>Entire rental unit hosted by {owner} </h1>
            </div>
            <div className='first-details-section'>
                <div>
                    <i class="fa-regular fa-user">Self check-in</i>
                    <div> Check yourself in with the smartlock</div>
                </div>
                <div>
                <i class="fa-solid fa-trophy">{owner} is a Superhost</i>
                <div>Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.</div>
                <i class="fa-solid fa-key">Great check-in experience</i>
                <div>92% of recent guests gave the check-in process a 5-star rating. </div>
                </div>
            </div>
            <div className='snow-cover-div'>
                <h1>Snow Cover</h1>
                <div>Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in.</div>
            </div>
            <div className='spot-description-div'>
                <h1>About</h1>
                <div>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eleifend lacus eget sem imperdiet, et gravida ligula lacinia. Quisque iaculis mi magna,
                ut volutpat neque accumsan in.Nam pulvinar porttitor ante, non suscipit felis auctor ac. Maecenas eget lacus ut nulla pharetra mollis quis a felis. Phasellus et tortor et.
                </div>

            </div>
        </div>
    )
}

export default SingleSpotDetails;
