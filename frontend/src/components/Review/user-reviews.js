import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserReviewsThunk } from '../../store/reviews';
import { useModal } from '../../context/Modal';


function UserReviewsModal() {


    const dispatch = useDispatch();

    const [setErrors] = useState([]);
    const {closeModal} = useModal();

    const reviewData = useSelector(state => state.Reviews.user);

    const reviewArr = Object.values(reviewData)

    useEffect(() => {
        dispatch(getUserReviewsThunk())
            .catch(
                async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                }
            );
    }, [dispatch,setErrors]);



    return (
        <div className='My-Reviews'>
            <div className='my-reviews-header-div' style={{display:'flex',alignItems:'flex-start'}}>
                <h1>My Reviews</h1>
                <button
                    type='submit'
                    onClick={closeModal}
                    style={{cursor:'pointer'}}
                > X </button>
            </div>
            <div className='my-reviews-modal-div'>
                {!!reviewArr.length ? reviewArr.map(review => (
                    <div className='my-reviews-card-div'>
                        <div key={review.spotId}></div>
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
