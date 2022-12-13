//constant variables specifying action types
const LOAD_SPOTS = "spots/LOAD_SPOTS";


//action creators
const getAllSpots = (spots) => {
    return {
        type: LOAD_SPOTS,
        spots
    }
}


//thunk
export const getSpots = () => async (dispatch) => {
    const response = await fetch('/api/spots');
    if(response.ok) {
        const spotsList = await response.json();
        dispatch(getAllSpots(spotsList))
        // console.log('1', spotsList);
        // console.log('2',spotsList);
        // console.log('3', spotsList);
    }
};

//reducer function.

export default function spotReducer (state = {}, action) {
    switch(action.type) {
        case LOAD_SPOTS:
            const allSpots = {...state};
            // console.log('action.spots', action.spots)
            // console.log('action.spots.Spots', action.spots.Spots)

            action.spots.Spots.forEach((spot)=>{
                allSpots[spot.id]=spot
            });
            return allSpots;

        default:
            return state;
    };
};
