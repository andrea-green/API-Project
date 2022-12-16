import { csrfFetch } from "./csrf";

//constant variables specifying action types
const LOAD_SPOTS = "spots/LOAD_SPOTS";
const LOAD_SPOT= "spots/LOAD_SPOT";
const DELETE_SPOT = 'spots/DELETE_SPOT';
const UPDATE_SPOT = 'spots/UPDATE_SPOT';
const ADD_SPOT = 'spots/ADD_SPOT'



//action creators
const getAllSpotsAc = (spots) => ({
        type: LOAD_SPOTS,
        spots
});

const getSpotAc = (spot) => ({
        type:LOAD_SPOT,
        spot
});

const deleteSpotAc = (spot) => ({
    type:DELETE_SPOT,
    spot
});
const updateSpotAc = (spot) => ({
    type:UPDATE_SPOT,
    spot
});

const addSpotAc = (spot) => ({
    type: ADD_SPOT,
    spot,
});



//thunks
export const getSpotsThunk = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots');

    if(response.ok) {
        const data = await response.json();
        dispatch(getAllSpotsAc(data))
        return data;

    }
};

export const getMySpotThunk = (spotId) => async(dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`)
    if(response.ok){
        const data = await response.json();
        dispatch(getSpotAc(data));
        return data;

    }
};

export const deleteSpotThunk = (spotId) =>async(dispatch)=>{
    const response = await csrfFetch(`/api/spots/${spotId}`,{
        method:'DELETE'
    })
    if(response.ok){
        await response.json();
        dispatch(deleteSpotAc(spotId))
    }
};

export const createNewSpotThunk = (newSpot,url) => async(dispatch) =>{
    const spotResponse = await csrfFetch('/api/spots',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSpot),
    });
    if (spotResponse.ok) {
        const spotData = await spotResponse.json();
        // console.log('spotData', spotData)
        const spotImageResponse = await csrfFetch(`/api/spots/${spotData.id}/images`,{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({url,preview:true}),
        });
        if(spotImageResponse.ok) {
            const spotImgData = await spotImageResponse.json();
            spotData.previewImage = spotImgData.url;
            dispatch(addSpotAc(spotData));
        }
    }
    return spotResponse;
};

export const updateSpotThunk = (spotId) => async(dispatch) =>{
    const spotResponse = await csrfFetch(`/api/spots/${spotId}`,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(spotId),
    });
    if(spotResponse.ok) {
        const spotData = await spotResponse.json();
        dispatch(updateSpotAc(spotData));
        return spotData;
    }
}




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
            const newState = {};

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

        // case create new spot

        case ADD_SPOT:{
            const newState = {...state, allSpots:{...state.allSpots}}
            // const newState = {...state, allSpots:{...state,allSpots}};
            newState.allSpots[action.spot.id] = action.spot;
            return newState;
        };

        //delete spot
        case DELETE_SPOT: {
            const newState = {...state};
            delete newState.allSpots[action.spotId];
            delete newState.singleSpot;
            return newState;
        };

        //update spot
        case UPDATE_SPOT:{
            const newState = {...state, allSpots:{...state.allSpots}};
            newState.allSpots[action.spot.id] = action.spot
            return newState;
        }


        default:
            return state;
    };
};
