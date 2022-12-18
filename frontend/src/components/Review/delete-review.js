
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useModal } from "../../context/Modal";
import { deleteReviewThunk } from '../../store/reviews';



const DeleteReviewForm = ({ myReview }) => {
    const { closeModal } = useModal();
    // const { spotId } = useParams();
    const mySingleSpot = useSelector((state)=>state.Spots.singleSpot)
    const dispatch = useDispatch();
    const history = useHistory();
    const [boolean, setBoolean] = useState(false);
    const [errorValidations, setErrorValidations] = useState([]);
    const trueBoolean = (e) => setBoolean(true);
    const falseBoolean = (e) => setBoolean(false);
    // console.log('spotId',spotId);


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
            <h1>Are you sure you want to delete?</h1>
            <section className='delete-review-form'>
                <div className='delete-review-errors'>
                    <ul>{errorValidations.map((error) => (
                        <li key={error}>{error}</li>
                    ))}
                    </ul>
                </div>
                <form onSubmit={handleSubmit}>
                    <label>
                        No
                        <input
                            type="radio"
                            required
                            checked={boolean ? false : true}
                            onChange={falseBoolean}
                        />
                    </label>
                    <label>
                        Yes
                        <input
                            type="radio"
                            required
                            checked={boolean}
                            onChange={trueBoolean}
                        />
                    </label>
                    <button
                        type="submit"
                        disabled={!boolean}
                    >Confirm</button>
                </form>
            </section>


        </div>

    )
}

export default DeleteReviewForm;
