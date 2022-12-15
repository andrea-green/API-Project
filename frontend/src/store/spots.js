import { csrfFetch } from "./csrf";
//constant variables specifying action types
const LOAD_SPOTS = "spots/LOAD_SPOTS";
const LOAD_SPOT= "spots/LOAD_SPOT";



//action creators
export const getAllSpotsAc = (spots) => ({
        type: LOAD_SPOTS,
        spots
});

export const getSpotAc = (spot) => ({
        type:LOAD_SPOT,
        spot
});


//thunks
export const getSpotsThunk = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots');
    // console.log('response',response)
    if(response.ok) {
        const data = await response.json();
        dispatch(getAllSpotsAc(data))
        return data;
        // console.log('1', spotsList);
        // console.log('2',spotsList);
        // console.log('3', spotsList);
    }
};

export const getMySpotThunk = (spotId) => async(dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`)
    if(response.ok){
        const data = await response.json();
        dispatch(getSpotAc(data));
        return data;
        // console.log('mySpotDetails',mySpotDetails)
    }
};


//initial states
const initialState = {
    allSpots:{},
    singleSpot:{}
};

//reducer function.

export default function spotReducer (state = initialState, action) {
    switch(action.type) {
        //get all spots
        case LOAD_SPOTS: {
            //const newState = {...state}
            const newState = {};
            // console.log('allSpots')
            // console.log('action.spots', action.spots)
            // console.log('action.spots.Spots', action.spots.Spots)
            action.spots.Spots.forEach((spot)=>{
                newState[spot.id]=spot
            });
            return {
                ...state,
                allSpots:newState,
                // allSpots:newState
            }};
        //single spot
        case LOAD_SPOT: {
            const newState = {...state, singleSpot:{}};
            newState.singleSpot = action.spot;
            //want to display all the details of my specific spot with the spotId.
            return newState;
        };

        // case create song
        /*
        case CREATE_SONG:{
            const newState = {...state,allSpots:{...state,allSpots}}
            newStatae.allSpots[action.paylod from my action creator] = action.payload from my action creator
        } */
        default:
            return state;
    };
};
