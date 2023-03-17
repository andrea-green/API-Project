import { csrfFetch } from './csrf';


const GET_BOOKINGS = 'bookings/GET_BOOKINGS';
const GET_USER_BOOKINGS = 'bookings/GET_USER_BOOKINGS';
const CREATE_BOOKING = '/bookings/CREATE_BOOKING';
const DELETE_BOOKING = '/bookings/DELETE_BOOKING';





const getSpotBookingsAc = (bookings) => ({
    type: GET_BOOKINGS,
    bookings
});

const getUserBookingsAc = (userBookings) => ({
    type: GET_USER_BOOKINGS,
    userBookings
});

const createBookingAc = (booking) => ({
    type: CREATE_BOOKING,
    booking
});

const deleteBookingAc = (bookingId)=>({
    type: DELETE_BOOKING,
    bookingId
})



export const getSpotBookingsThunk = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/bookings`);

    if (response.ok) {
        const data = await response.json();
        dispatch(getSpotBookingsAc(data.Bookings))
    }
};

export const getUserBookingsThunk = () => async (dispatch) => {
    const response = await csrfFetch(`/api/bookings/current`);
    if (response.ok) {
        const data = await response.json();
        dispatch(getUserBookingsAc(data.Bookings))
    }
    return response;
}

export const createNewBookingThunk = (newBooking, spotId, bookingDetails) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBooking),
    });
    if (response.ok) {
        const data = await response.json();
        const booking = { ...data, ...bookingDetails };
        dispatch(createBookingAc(booking))
        return data;
    }
    return response;
}

export const deleteBookingThunk = (bookingId) => async (dispatch) => {
    const response = await csrfFetch(`/api/bookings/${bookingId}`,{
        method: 'DELETE'
    })
    if (response.ok) {
        dispatch(deleteBookingAc(bookingId))
    }
    return response;
}


const initialState = {
    spot:{
        allBookings:{},
        singleBooking:{}
    },
    user: {
        allBookings:{},
        singleBooking:{}
    }
};



export default function bookingsReducer(state = initialState, action) {
    switch (action.type) {

        case GET_BOOKINGS: {
            const newState = {...state,  spot:{
                allBookings:{},
                singleBooking:{}
            } }
            action.bookings.forEach(booking => {
                newState.spot.allBookings[booking.id] = booking
            });
            return newState;
        };

        case GET_USER_BOOKINGS: {
            const newState = { ...state, user: {
                allBookings:{},
                singleBooking:{}
            } };
            action.userBookings.forEach(booking => {
                newState.user.allBookings[booking.id] = booking
            });
            return newState;
        };
        case CREATE_BOOKING:{
            const newState = {spot:{
                allBookings:{...state.spot.allBookings},
                singleBooking:{}
            },user:{
                allBookings:{},
                singleBooking:{}
            }};
            newState.spot.allBookings[action.booking.id] = action.booking;
            newState.spot.singleBooking = action.booking
            return newState;
        };

        case DELETE_BOOKING:{
            const newState = {spot:{
                allBookings:{...state.spot.allBookings},
                singleBooking:{}
            }, user:{
                allBookings:{},
                singleBooking:{}
            }};
            delete newState.spot.allBookings[action.bookingId];
            return newState;
        };

        default:
            return state;;
    }
}
