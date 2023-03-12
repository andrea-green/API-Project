import { csrfFetch } from './csrf';


const GET_BOOKINGS = 'bookings/GET_BOOKINGS';





const getSpotBookingsAc = (bookings) => ({
    type: GET_BOOKINGS,
    bookings
});



export const getSpotBookingsThunk = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/bookings`);

    if (response.ok) {
        const data = await response.json();
        dispatch(getSpotBookingsAc(data.Bookings))
    }
};


const initialState = {
    spot: {},
    user: {}
};



export default function bookingsReducer(state = initialState, action) {
    switch (action.type) {

        case GET_BOOKINGS: {
            const newState = { spot: {}, user: {} }
            action.bookings.forEach(booking => {
                newState.spot[booking.id] = booking
            });
            return newState;
        };
        default:
            return state;;
    }
}
