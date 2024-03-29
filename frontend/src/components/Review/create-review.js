import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from "../../context/Modal";
import { createNewReviewThunk } from '../../store/reviews';
import { useHistory } from 'react-router-dom';


const CreateReviewForm = () => {
    const dispatch = useDispatch();


    const [review, setReview] = useState('');
    const [stars, setStars] = useState('');
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();
    const history = useHistory();

    const mySpotId = useSelector((state) => state.Spots.singleSpot.id);
    const currentUser = useSelector((state) => state.session.user);


    const updateReview = (e) => setReview(e.target.value);
    const updateStars = (e) => setStars(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        const newReview = {
            review,
            stars,
        };

        const reviewAddDetails = {
            User: currentUser,
            ReviewImages: [],
        }

        return dispatch(createNewReviewThunk(newReview, mySpotId, reviewAddDetails))
            //.then(()=> history.push(`/spots/${mySpotId}`))
            .then(closeModal)
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(Object.values(data.errors));
            });
    }


    return (
        <div>
            <div className='leave-review-div'>
                <div>
                    <ul className='errors-list'>
                        {errors.map((error) => (
                            <li key={error}>{error} </li>
                        ))}
                    </ul>
                </div>
                <div className='form-header' style={{display:'flex',alignItems:'flex-start'}}>
                    <h1>Leave a review</h1>
                    <button
                    type='submit'
                    onClick={closeModal}
                    style={{cursor:'pointer'}}
                > X </button>
                </div>
                <section className='form-body-container'>
                    <form  className='form-body' onSubmit={handleSubmit}>
                        <label className='form-label'>
                            <input className='form-input'
                                type="text"
                                placeholder="Leave review here"
                                required
                                value={review}
                                onChange={updateReview}
                            />
                        </label>
                        <label>
                            stars
                            <select value={stars} onChange={updateStars}>
                                <option value=''>Select</option>
                                <option value='1'>1</option>
                                <option value='2'>2</option>
                                <option value='3'>3</option>
                                <option value='4'>4</option>
                                <option value='5'>5</option>
                            </select>

                        </label>

                        <button className='button form-button' type='submit'>Leave a Review</button>

                    </form>
                </section>
            </div>
        </div>
    );
}


export default CreateReviewForm;
