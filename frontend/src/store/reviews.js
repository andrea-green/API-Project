import { csrfFetch } from './csrf';

//const variables
const GET_REVIEWS = '/reviews/GET_REVIEWS';
const GET_USERREVIEWS = '/reviews/GET_USERREVIEWS';
const CREATE_REVIEW = '/reviews/CREATE_REVIEW';
const DELETE_REVIEW = '/reviews/DELETE_REVIEW';


//action creators

const getSpotReviewsAc = (reviews) => ({
    type: GET_REVIEWS,
    reviews
});

const getUserReviewsAc = (userReviews) => ({
    type: GET_USERREVIEWS,
    userReviews
});

const createReviewAc = (review) => ({
    type: CREATE_REVIEW,
    review
});

const deleteReviewAc = (reviewId) =>({
    type:DELETE_REVIEW,
    reviewId
})


//thunks

export const getSpotReviewsThunk = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);

    if (response.ok) {
        const data = await response.json();
        dispatch(getSpotReviewsAc(data.Reviews))
    }
};

export const getUserReviewsThunk = () => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/current`);
    if (response.ok) {
        const data = await response.json();
        dispatch(getUserReviewsAc(data.Reviews))
    }
    return response;
};

export const createNewReviewThunk = (newReview,spotId,reviewAddDetails) => async (dispatch) => {
    const reviewResponse = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReview),
    });
    if (reviewResponse.ok) {
        const reviewData = await reviewResponse.json();
        const finalReview={...reviewData,...reviewAddDetails};
        dispatch(createReviewAc(finalReview));
        return reviewData;
    }
    return reviewResponse;
}

export const deleteReviewThunk = (reviewId) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    })
    if (response.ok) {
        dispatch(deleteReviewAc(reviewId))
    }
    return response;
};



//initial states
const initialState = {
    spot: {},
    user: {}
};


//reducer function

export default function reviewReducer(state = initialState, action) {
    switch (action.type) {
        //get all reviews.
        case GET_REVIEWS: {
            const newState = { spot: {}, user: {} }
            action.reviews.forEach(review => {
                newState.spot[review.id] = review
            });
            return newState;
        };

        //get all current user reviews.
        case GET_USERREVIEWS: {
            const newState = { ...state, user: {} };
            action.userReviews.forEach(review => {
                newState.user[review.id] = review
            });
            return newState
        };

        //create new review
        case CREATE_REVIEW: {
            const newState = { spot:{...state.spot}, user:{} };
            newState.spot[action.review.id] = action.review;
            return newState;
        };

         //delete review
         case DELETE_REVIEW: {
            const newState = { spot:{...state.spot}, user: {} };
            delete newState.spot[action.reviewId];
            return newState;
        };

        default:
            return state;
    };
};
