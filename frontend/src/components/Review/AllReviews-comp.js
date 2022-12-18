import './allreviews.css';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSpotReviewsThunk } from '../../store/reviews';


function AllReviews() {

    const dispatch = useDispatch();

    const { spotId } = useParams();
    const spotReviews = useSelector((state)=>state.Reviews.spot);
    const spotReviewsArr=Object.values(spotReviews);


    useEffect(() => {
        dispatch(getSpotReviewsThunk(spotId))
    },[dispatch,spotId]);

    return (
        <div>
            <div className='all-reviews-outer-div'>
                <h1>Reviews</h1>
                <div>
                    {spotReviewsArr.map(({id,review,stars,User})=>(
                        <div key={id} className='individual-review-div'>
                            <div>
                                <div>{User.firstName} {User.lastName}</div>
                                <div className='user-review-div'>{review}</div>
                                <div className='user-star-rating-div'>{stars}</div>
                            </div>
                        </div>


                    ))}
                </div>
            </div>
        </div>
    );
}

export default AllReviews;
