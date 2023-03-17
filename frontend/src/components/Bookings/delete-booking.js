
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useModal } from "../../context/Modal";
import { deleteBookingThunk } from '../../store/bookings';



const DeleteBookingForm = ({ id }) => {
    const { closeModal } = useModal();

    const myBooking = useSelector((state) => state.Bookings.user)
    const dispatch = useDispatch();
    const history = useHistory();
    const [boolean, setBoolean] = useState(false);
    const [errorValidations, setErrorValidations] = useState([]);
    const trueBoolean = (e) => setBoolean(true);
    const falseBoolean = (e) => setBoolean(false);
    console.log('myBooking', myBooking)



    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(deleteBookingThunk(id))
            .then(closeModal)
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrorValidations(data.errors);
            });
        // history.push(`/spots/${mySingleSpot.id}`)
    };

    return (
        <div>
            <div className='form-header'>
                <h1>Are you sure you want to cancel this booking?</h1>
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

export default DeleteBookingForm;
