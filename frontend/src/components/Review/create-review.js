import React, { useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
// import './CreateSpotForm.css';
import { createNewReviewThunk } from '../../store/reviews';
import { useHistory } from 'react-router-dom';

const CreateReviewForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();


    const [review, setReview] = useState('');
    const [stars, setStars] = useState('');
    const [errors, setErrors] = useState([]);
    const [validationErrors, setValidationErrors] = useState([]);
    const { closeModal } = useModal();

    const mySpotId = useSelector((state)=>state.Spots.singleSpot.id);

    const updateReview = (e) => setReview(e.target.value);
    const updateStars = (e) => setStars(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        const newReview = {
            review,
            stars,
        };

        return dispatch(createNewReviewThunk(newReview,mySpotId))
            .then(closeModal)
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
    }


    return (
        <div>
            <div className='leave-review-div'>
                <div>
                    <ul className='errors-list'>
                        {validationErrors.map((error) => (
                            <li key={error}>{error} </li>
                        ))}
                    </ul>
                </div>
                <h1>Leave a review</h1>
                <section className='create-review-form'>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Write a review here
                            <input
                                type="text"
                                placeholder="Leave review here"
                                required
                                value={review}
                                onChange={updateReview}
                            />
                        </label>
                        <label>
                            stars
                            <input
                                type="number"
                                placeholder="stars"
                                required
                                value={stars}
                                min='1'
                                max='5'
                                onChange={updateStars}
                            />
                        </label>
                        <button type='submit'>Leave a Review</button>
                    </form>
                </section>
            </div>
        </div>
    );
}


export default CreateReviewForm;