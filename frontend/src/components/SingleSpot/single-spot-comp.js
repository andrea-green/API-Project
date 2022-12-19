import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMySpotThunk } from '../../store/spots';
import { useParams, useHistory } from 'react-router-dom';
import SingleSpotDetails from '../../css-modules/singleSpot/singleSpot';
import OpenModalButton from '../OpenModalButton';

import EditSpotForm from '../EditSpotForm/EditSpotForm';
import DeleteSpotForm from '../DeleteSpotForm/delete-spot-form';

import '../../index.css';

function SingleSpot() {
    const user = useSelector((state) => state.session.user);
    const mySpot = useSelector((state) => state.Spots.singleSpot);

    const spotReviews = useSelector((state) => state.Reviews.spot);


    const dispatch = useDispatch();
    const { spotId } = useParams();
    const history = useHistory();
    const [validationErrors] = useState([]);

    useEffect(() => {
        dispatch(getMySpotThunk(spotId))
            .catch(() => history.push('/PageNotFound'))
    }, [dispatch, spotId, spotReviews, history]);


    if (!mySpot?.id) return null;
    return (
        <div>
            <div>
                <ul className='errors-list'>
                    {validationErrors.map((error) => (
                        <li key={error}>{error} </li>
                    ))}
                </ul>
            </div>
            <div className='spot-modal-and-details'>
                <div>
                    <SingleSpotDetails />
                </div>
                <div className='spot-modal-info'>
                    <div className='spot-modal-info-header'>
                        <div className='price-per-night'>
                            <h1>
                                {`$${mySpot.price} night`}

                            </h1>
                        </div>
                        <i class="fa-solid fa-star">{mySpot.avgRating}</i>
                        <div className='number-of-reviews'>
                            <div>
                                {`${mySpot.numReviews} Reviews`}
                            </div>
                        </div>
                        <div className='create-review'>
                        </div>
                        {user && user?.id === mySpot?.Owner?.id ? (
                            <div >
                                <div className='button'>{<OpenModalButton
                                    modalComponent={<EditSpotForm />}
                                    buttonText='Edit Spot' />}</div>
                                <div className='button'>{<OpenModalButton
                                    modalComponent={<DeleteSpotForm />}
                                    buttonText='Delete Spot ' />}</div>
                            </div>
                        ) : (
                            <div className='fees-div'>
                                <div>{`Cleaning fee = $${25}`}</div>
                                <div>{`Service fee = $${100}`}</div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>

    );
}

export default SingleSpot
