import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getUserReviewsThunk } from '../../store/reviews';
import { useModal } from "../../context/Modal";

function UserReviewsModal() {

    const user = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();
    const [errors, setErrors] = useState([]);

    const reviewData = useSelector(state => state.Reviews.user);
    // console.log('herrow')
    const reviewArr = Object.values(reviewData)

    useEffect(() => {
        dispatch(getUserReviewsThunk())
            .catch(
                async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                }
            );
    }, [dispatch]);



    return (
        <div className='My-Reviews'>
            <div className='my-reviews-header-div'>
                <h1>My Reviews</h1>
            </div>
            <div className='my-reviews-modal-div'>
                {!!reviewArr.length ? reviewArr.map(review => (
                    <div className='my-reviews-card-div'>
                        <div key={review.id}>{review.review}</div>
                        <div key={review.stars}>{review.stars}</div>
                    </div>
                )) : (
                    <div>You have no reviews.</div>
                )}
            </div>

        </div>
    );
}

export default UserReviewsModal;
