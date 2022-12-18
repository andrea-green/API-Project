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
    const user = useSelector((state)=>state.session.user);
    const [validationErrors, setValidationErrors] = useState([]);

    useEffect(() => {
        dispatch(getSpotReviewsThunk(spotId))
    },[dispatch,spotId]);

    return (
        <div>
            <div>
                <h1>herrow reviews here</h1>

            </div>
        </div>
    );
}

export default AllReviews;
