import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMySpotThunk } from '../../store/spots';
import { useParams, useHistory } from 'react-router-dom';
import SingleSpotDetails from '../../css-modules/singleSpot/singleSpot';
import OpenModalButton from '../OpenModalButton';

import EditSpotForm from '../EditSpotForm/EditSpotForm';
import DeleteSpotForm from '../DeleteSpotForm/delete-spot-form';
import Booking from './booking';

import '../../index.css';

function SingleSpot() {
    const user = useSelector((state) => state.session.user);
    const mySpot = useSelector((state) => state.Spots.singleSpot);
    const owner = useSelector((state) => state.Spots.singleSpot.Owner?.firstName)
    const spotPics = mySpot.SpotImages
    const mySpotPic = spotPics?.find(imgObj => imgObj.preview === true)



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
            <div className='main-single-spot-div'>
                <div>
                    <SingleSpotDetails />
                </div>
                <div className='spot-preview-image-div'>
                    <img className='preview-image-div' src={mySpotPic?.url} alt='spot-pic-url'></img>
                </div>
                <div className='spot-modal-and-details'>
                    <div className='property-information'>

                        <h1 className='hosted-by-header'>Entire rental unit hosted by {owner} </h1>

                        <div className='first-details-section'>
                            <div>
                                <i class="fa-regular fa-user">Self check-in</i>
                                <div className='check-in-description'> Check yourself in with the smartlock</div>
                            </div>
                            <div>
                                <i class="fa-solid fa-trophy">{owner} is a Superhost</i>
                                <div className='superhost-description'>Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.</div>
                                <i class="fa-solid fa-key">Great check-in experience</i>
                                <div className='check-in-process'>92% of recent guests gave the check-in process a 5-star rating. </div>
                            </div>
                        </div>
                        <div className='snow-cover-div'>
                            <h1 className='snow-cover-header'>Snow Cover</h1>
                            <div>Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in.</div>
                        </div>
                        <div className='spot-description-div'>
                            <h1>About</h1>
                            <div>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eleifend lacus eget sem imperdiet, et gravida ligula lacinia. Quisque iaculis mi magna,
                                ut volutpat neque accumsan in.Nam pulvinar porttitor ante, non suscipit felis auctor ac. Maecenas eget lacus ut nulla pharetra mollis quis a felis. Phasellus et tortor et.
                            </div>

                        </div>

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
                                    <div className='button'>{<OpenModalButton
                                        modalComponent={<Booking />}
                                        buttonText='Reserve' />}</div>
                                </div>
                            ) : (
                                <div>
                                    <div className='fees-div'>
                                        <div>{`Cleaning fee = $${25}`}</div>
                                        <div>{`Service fee = $${100}`}</div>
                                        <div style={{fontStyle:'italic',color:'grey'}}>Sign In or Login to book your stay. </div>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default SingleSpot
