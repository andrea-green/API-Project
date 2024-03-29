import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useModal } from "../../context/Modal";
import { deleteReviewThunk } from '../../store/reviews';



const DeleteReviewForm = ({ myReview }) => {
    const { closeModal } = useModal();

    const mySingleSpot = useSelector((state) => state.Spots.singleSpot)
    const dispatch = useDispatch();
    const history = useHistory();
    const [boolean, setBoolean] = useState(false);
    const [errorValidations, setErrorValidations] = useState([]);
    const trueBoolean = (e) => setBoolean(true);
    const falseBoolean = (e) => setBoolean(false);



    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(deleteReviewThunk(myReview.id))
            .then(closeModal)
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrorValidations(data.errors);
            });
        history.push(`/spots/${mySingleSpot.id}`);
    };

    return (
        <div>
            <div className='form-header' style={{display:'flex',alignItems:'flex-start'}}>
                <h1>Are you sure you want to delete?</h1>
                <button
                    type='submit'
                    onClick={closeModal}
                    style={{cursor:'pointer'}}
                > X </button>
            </div>
            <section className='form-body-container'>
                <div className='delete-review-errors'>
                    <ul>{errorValidations.map((error) => (
                        <li key={error}>{error}</li>
                    ))}
                    </ul>
                </div>
                <form className='form-body' onSubmit={handleSubmit}>
                    <label className='form-label'>
                        No
                        <input
                            type="radio"
                            class='button'
                            required
                            checked={boolean ? false : true}
                            onChange={falseBoolean}
                        />
                    </label>
                    <label>
                        Yes
                        <input
                            type="radio"
                            class='button'
                            required
                            checked={boolean}
                            onChange={trueBoolean}
                        />
                    </label>
                    <button
                    className='button form-button'
                        type="submit"
                        disabled={!boolean}
                    >Confirm</button>
                </form>
            </section>


        </div>

    )
}

export default DeleteReviewForm;
