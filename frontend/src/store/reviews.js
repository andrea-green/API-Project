import {csrfFetch } from './csrf';

//const variables
const GET_REVIEWS = '/reviews/GET_REVIEWS';
const GET_USERREVIEWS = '/reviews/GET_USERREVIEWS';


//action creators

const getSpotReviewsAc = (reviews) => ({
    type:GET_REVIEWS,
    reviews
});

const getUserReviewsAc = (userReviews) => ({
    type: GET_USERREVIEWS,
    userReviews
});


//thunks

export const getSpotReviewsThunk = (spotId) =>async (dispatch) =>{
    const response= await csrfFetch(`/api/spots/${spotId}/reviews`);

    if (response.ok) {
        const data = await response.json();
        dispatch(getSpotReviewsAc(data.Reviews))
    }
};

export const getUserReviewsThunk = () =>async(dispatch)=>{
    const response = await csrfFetch(`/api/reviews/current`);
    if (response.ok) {
        const data = await response.json();
        dispatch(getUserReviewsAc(data.Reviews))
    }
    return response;
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

        //get all current user reviews.
        case GET_USERREVIEWS:{
            const newState = {...state, user:{}};
            action.userReviews.forEach(review =>{
                newState.user[review.id]= review
            });
            return newState
        }
        default:
            return state;
    };
};
