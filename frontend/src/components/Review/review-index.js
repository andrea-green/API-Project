
import AllReviews from './AllReviews-comp';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import OpenModalButton from '../OpenModalButton';
import CreateReviewForm from '../Review/create-review';
import SingleSpot from '../SingleSpot/single-spot-comp';
import DeleteReviewForm from './delete-review';



function ReviewsComponent() {

    const { spotId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    //checking if user = owner.
    const user = useSelector((state) => state.session.user);
    const owner = useSelector((state) => state.Spots.singleSpot?.ownerId);
    const ownerCheck = owner === user?.id;

    //checking if user already has a review on the spot.
    const spotReviews = useSelector((state) => state.Reviews.spot);
    const spotReviewsArr = Object.values(spotReviews);
    const reviewCheck = spotReviewsArr.find((review) => user?.id === review?.userId);

    const conditionals = () => {
        if (user) {
            if (ownerCheck) {
                return <div></div>
            } else if (!ownerCheck) {
                if (reviewCheck) {
                    return (
                        <div className='button'>{<OpenModalButton
                            modalComponent={<DeleteReviewForm myReview={reviewCheck} />}
                            buttonText='Delete Review' />}</div>
                    )
                } else if (!reviewCheck) {
                    return (
                        <div className='button'>{<OpenModalButton
                            modalComponent={<CreateReviewForm myReview={reviewCheck} />}
                            buttonText='Leave a review' />}</div>
                    )
                }
            }

        } else if (!user) return <div>You must be logged in to leave a review.</div>
    };

    return (
        <div>
            <AllReviews />
            <div className='review-ternary-check'>
                <div>
                    {conditionals()}
                </div>

            </div>
        </div>
    );
};

export default ReviewsComponent;
