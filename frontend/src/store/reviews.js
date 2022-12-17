import {csrfFetch } from './csrf';

//const variables
const GET_REVIEWS = '/reviews/GET_REVIEWS';


//action creators

const getSpotReviewsAc = (reviews) => ({
    type:GET_REVIEWS,
    reviews
})


//thunks

export const getSpotReviewsThunk = (spotId) =>async (dispatch) =>{
    const response= await csrfFetch(`/api/spots/${spotId}/reviews`);

    if (response.ok) {
        const data = await response.json();
        dispatch(getSpotReviewsAc(data.Reviews))
        return data;
    }
};



//initial states
const initialState = {
    spot:{},
    user:{}
};


//reducer function

export default function reviewReducer(state=initialState,action){
    switch(action.type){
        //get all reviews.
        case GET_REVIEWS:{
            const newState = {spot:{}, user:{}}
            action.reviews.forEach(review => {
                newState.spot[review.id] = review
            });
            return newState;
        };
        default:
            return state;
    };
};
