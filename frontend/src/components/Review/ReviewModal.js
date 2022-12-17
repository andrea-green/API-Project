import {useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getMySpotThunk,deleteSpotThunk } from '../../store/spots';
import {useParams,useHistory,NavLink} from 'react-router-dom';
import SingleSpotDetails from '../../css-modules/singleSpot/singleSpot';



function SingleSpot() {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const history = useHistory();
    const mySpot = useSelector((state)=>state.Spots.singleSpot)
    const sessionUser = useSelector((state)=>state.spots.singleSpot);
    const spotOwner = useSelector((state)=> state.spots.singleSpot.ownerId);
    const [validationErrors,setValidationErrors] = useState([]);

    const errors = [];

    const deleteSpot = async(e) => {
        e.preventDefault();


        if(!sessionUser){
            errors.push('You must be signed in to delete a spot.')
            setValidationErrors(errors);
        }
        else if(!sessionUser === spotOwner){
            errors.push('You must be the owner of this spot to delete it.')
            setValidationErrors(errors);
        }
        else {
            await dispatch(deleteSpotThunk(spotId))
            history.push('/')
        }

    }
    const validateUser = (e)=>{
        if(!sessionUser) {
         e.preventDefault();
         errors.push('You must be logged in to edit a spot');
            setValidationErrors(errors);
        }
    }

    //basically need to pull the info of the spot that has the same id number as spotId in my url route.
    //i think i also need to grab spot images and the owner info as well per the store state shape

        useEffect(()=> {
            dispatch(getMySpotThunk(spotId))
        },[dispatch,spotId]);

        return (
            <div>
                <div>
                    <SingleSpotDetails />
                </div>
                <div>
                    <ul className='errors-list'>
                        {validationErrors.map((error)=> (
                            <li key={error}>{error} </li>
                        ))}
                    </ul>
                </div>
                <div>
                    {mySpot}
                </div>
                <button onClick={deleteSpot}>Delete Spot</button>
                <div>
                    <NavLink onClick={validateUser}to={`/spots/${spotId}/edit`}>Edit Spot</NavLink>
                </div>
            </div>
        );
    }

export default SingleSpot
