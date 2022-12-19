import './allreviews.css';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSpotReviewsThunk } from '../../store/reviews';


function AllReviews() {

    const dispatch = useDispatch();

    const { spotId } = useParams();
    const spotReviews = useSelector((state) => state.Reviews.spot);
    const spotReviewsArr = Object.values(spotReviews);



    useEffect(() => {
        dispatch(getSpotReviewsThunk(spotId))
    }, [dispatch, spotId]);

    return (
        <div>
            <div className='all-reviews-outer-div'>
                <h1>Reviews</h1>
                <div>
                    {spotReviewsArr.map(({ id, review, stars, User }) => (
                        <div key={id} className='individual-review-div'>
                            <div className='review'>
                                <i class="fa-regular fa-face-smile">{User.firstName} {User.lastName}</i>
                                <div className='user-review-div'>{review}</div>
                                <i class="fa-solid fa-star">{stars}</i>
                            </div>
                        </div>


                    ))}
                </div>
            </div>
        </div>
    );
}

export default AllReviews;
