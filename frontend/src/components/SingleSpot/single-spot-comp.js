import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getMySpotThunk } from '../../store/spots';
import {useParams} from 'react-router-dom';
import SingleSpotDetails from '../../css-modules/singleSpot/singleSpot';
import { deleteSpotThunk } from '../../store/spots';

function SingleSpot() {
    const dispatch = useDispatch();
    const { spotId } = useParams();

    const deleteSpot = async(e) => {
        e.preventDefault();
        dispatch(deleteSpotThunk(spotId))
        history.push('/')
    };

    const mySpot = useSelector((state)=>state.Spots.singleSpot)
    //basically need to pull the info of the spot that has the same id number as spotId in my url route.
    //i think i also need to grab spot images and the owner info as well per the store state shape

    useEffect(()=> {
        dispatch(getMySpotThunk(spotId))
    },[dispatch,spotId]);

    return (
        <div>
            <SingleSpotDetails />
        </div>
    );
}

export default SingleSpot;
