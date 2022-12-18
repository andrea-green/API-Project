import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMySpotThunk } from '../../store/spots';
import { useParams, useHistory } from 'react-router-dom';
import SingleSpotDetails from '../../css-modules/singleSpot/singleSpot';
import OpenModalButton from '../OpenModalButton';

import EditSpotForm from '../EditSpotForm/EditSpotForm';
import DeleteSpotForm from '../DeleteSpotForm/delete-spot-form';


function SingleSpot() {
    const user = useSelector((state) => state.session.user);
    const mySpot = useSelector((state) => state.Spots.singleSpot);

    const spotReviews = useSelector((state) => state.Reviews.spot);
    const spotReviewsArr = Object.values(spotReviews);


    const dispatch = useDispatch();
    const { spotId } = useParams();
    const history = useHistory();
    const [validationErrors, setValidationErrors] = useState([]);

    useEffect(() => {
        dispatch(getMySpotThunk(spotId))
            .catch(() => history.push('/PageNotFound'))
    }, [dispatch, spotId,spotReviews]);


    if (!mySpot?.id) return null;
    return (
        <div>
            <div>
                <SingleSpotDetails />
            </div>
            <div>
                <ul className='errors-list'>
                    {validationErrors.map((error) => (
                        <li key={error}>{error} </li>
                    ))}
                </ul>
            </div>

            <div className='spot-modal-info'>
                <div className='spot-modal-info-header'>
                    <div className='price-per-night'>
                        <h1>
                            {`$${mySpot.price} night`}

                        </h1>
                    </div>
                    <div className='average-spot-rating'>
                        <div>{mySpot.avgRating}</div>
                    </div>
                    <div className='number-of-reviews'>
                        <div>
                            {`${mySpot.numReviews} Reviews`}
                        </div>
                    </div>
                    <div className='create-review'>
                    </div>
                    {user && user?.id === mySpot?.Owner?.id ? (
                        <div>
                            <div>{<OpenModalButton
                                modalComponent={<EditSpotForm />}
                                buttonText='Edit Spot' />}</div>
                            <div>{<OpenModalButton
                                modalComponent={<DeleteSpotForm />}
                                buttonText='Delete Spot ' />}</div>
                        </div>
                    ) : (
                        <div className='fees-div'>
                            <div>{`cleaning fee = $${25}`}</div>
                            <div>{`Service fee = $${100}`}</div>
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
}

export default SingleSpot
