import { csrfFetch } from './csrf';


const GET_BOOKINGS = 'bookings/GET_BOOKINGS';
const GET_USER_BOOKINGS = 'bookings/GET_USER_BOOKINGS';





const getSpotBookingsAc = (bookings) => ({
    type: GET_BOOKINGS,
    bookings
});

const getUserBookingsAc = (userBookings) => ({
    type:GET_USER_BOOKINGS,
    userBookings
});



export const getSpotBookingsThunk = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/bookings`);

    if (response.ok) {
        const data = await response.json();
        dispatch(getSpotBookingsAc(data.Bookings))
    }
};

export const getUserBookingsThunk = () => async (dispatch) => {
    const response = await csrfFetch(`/api/bookings/current`);
    if (response.ok){
        const data = await response.json();
        dispatch(getUserBookingsAc(data.Bookings))
    }
    return response;
}


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

        case GET_USER_BOOKINGS: {
            const newState = {...state, user:{}};
            action.userBookings.forEach(booking => {
                newState.user[booking.id] = review
            });
            return newState; 
        }
        default:
            return state;;
    }
}
