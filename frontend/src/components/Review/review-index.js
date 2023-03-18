import React from 'react';
import AllReviews from './AllReviews-comp';
import { useSelector } from 'react-redux';
import OpenModalButton from '../OpenModalButton';
import CreateReviewForm from '../Review/create-review';
import DeleteReviewForm from './delete-review';
import '../../index.css';



function ReviewsComponent() {


    //checking if user = owner.
    const user = useSelector((state) => state.session.user);
    const owner = ""
    // const owner = useSelector((state) => state.Spots.singleSpot.ownerId);
    const ownerCheck = user && owner === user.id

    //checking if user already has a review on the spot.
    const spotReviews = useSelector((state) => state.Reviews.spot);
    const spotReviewsArr = Object.values(spotReviews);
    const reviewCheck = spotReviewsArr.find((review) => user && user.id === review.userId);

    const conditionals = () => {
        if (user) {
            if (ownerCheck) {
                return (<div></div>)
            } else if (!ownerCheck) {
                if (reviewCheck) {
                    return (

                        <OpenModalButton className='button new-button'
                            modalComponent={<DeleteReviewForm myReview={reviewCheck} />}
                            buttonText='Delete Review'
                        />

                    )
                } else if (!reviewCheck) {
                    return (
                        <OpenModalButton className='button new-button'
                            modalComponent={<CreateReviewForm myReview={reviewCheck} />}
                            buttonText='Leave a review'
                        />

                    )
                }
            }

        } else if (!user) return (<div>You must be logged in to leave a review.</div>)
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
