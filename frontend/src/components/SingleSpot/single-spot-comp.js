import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMySpotThunk, deleteSpotThunk } from '../../store/spots';
import { useParams, useHistory, NavLink } from 'react-router-dom';
import SingleSpotDetails from '../../css-modules/singleSpot/singleSpot';
import OpenModalButton from '../OpenModalButton';

import EditSpotForm from '../EditSpotForm/EditSpotForm';
import DeleteSpotForm from '../DeleteSpotForm/delete-spot-form';



function SingleSpot() {
    const user = useSelector((state) => state.session.user);
    const mySpot = useSelector((state) => state.Spots.singleSpot);
    // console.log('mySpot', mySpot)//
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const history = useHistory();
    const [validationErrors, setValidationErrors] = useState([]);

    useEffect(() => {
        dispatch(getMySpotThunk(spotId))
    }, [dispatch, spotId]);

    const errors = [];

    const handleDelete = async (e) => {
        e.preventDefault();


        // if(!sessionUser){
        //     errors.push('You must be signed in to delete a spot.')
        //     setValidationErrors(errors);
        // }
        // else if(!sessionUser === spotOwner){
        //     errors.push('You must be the owner of this spot to delete it.')
        //     setValidationErrors(errors);
        // }
        // else {
        //     await dispatch(deleteSpotThunk(spotId))
        //     history.push('/')
        // }

    }

    // const validateUser = (e)=>{
    //     if(!sessionUser) {
    //      e.preventDefault();
    //      errors.push('You must be logged in to edit a spot');
    //         setValidationErrors(errors);
    //     }
    // }


    //basically need to pull the info of the spot that has the same id number as spotId in my url route.
    //i think i also need to grab spot images and the owner info as well per the store state shape
    if (!mySpot) return null;
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
                        <div>
                            {`$${mySpot.price} night`}

                        </div>
                    </div>
                    <div className='average-spot-rating'>
                        <div>{mySpot.avgRating}</div>
                    </div>
                    <div className='number-of-reviews'>
                        <div>
                           {`${mySpot.numReviews} Reviews`}
                        </div>
                    </div>
                </div>

                {user && user?.id === mySpot?.Owner?.id ? (
                <div>
                    <div>{<OpenModalButton
                    modalComponent={<EditSpotForm/>}
                    buttonText='Edit Spot'/>}</div>
                    <div>{<OpenModalButton
                    modalComponent={<DeleteSpotForm/>}
                    buttonText='Delete Spot '/>}</div>
                </div>
                ): (<div>Hello</div>) }
            </div>
        </div>

    );
}

export default SingleSpot
