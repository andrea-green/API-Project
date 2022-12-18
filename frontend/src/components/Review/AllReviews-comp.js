import './allreviews.css';
import React, { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory,useParams } from 'react-router-dom';
import { getSpotReviewsThunk } from '../../store/reviews';


function AllReviews() {

    const dispatch = useDispatch();
    const history = useHistory();
    const { spotId } = useParams();
    const spotReviews = useSelector((state)=>state.Reviews.spot);
    const spotReviewsArr=Object.values(spotReviews);
    const user = useSelector((state)=>state.session.user);
    const [validationErrors, setValidationErrors] = useState([]);

    useEffect(() => {
        dispatch(getSpotReviewsThunk(spotId))
    },[dispatch,spotId]);

    return (
        <div>
            <div className='all-reviews-outer-div'>
                <h1>Reviews</h1>
                <div>
                    {spotReviewsArr.map(({id,review,stars})=>(
                        <div key={id} className='individual-review-div'>
                            <div>
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
