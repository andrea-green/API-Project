import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { createNewBookingThunk } from "../../store/bookings";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function Booking() {

    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const mySpotId = useSelector((state) => state.Spots.singleSpot.id);
    const mySpot = useSelector((state) => state.Spots.singleSpot);

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [errors, setErrors] = useState([]);


    const createStart = (date) => setStartDate(date);
    const createEnd = (date) => setEndDate(date);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        const payload = {
            startDate,
            endDate,
        }


        return dispatch(createNewBookingThunk(payload, mySpotId))
            .then(closeModal)
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(Object.values(data.errors));
            });
    };

    return (

        <div>
            <div className='create-booking-main'>
                <div>
                    <ul className='errors-list'>
                        {errors.map((error) => (
                            <li key={error}>{error} </li>
                        ))}
                    </ul>
                </div>
                <div className='form-header' style={{display:'flex',alignItems:'flex-start'}}>
                    <h1>Book your stay</h1>
                    <button
                    type='submit'
                    onClick={closeModal}
                    style={{cursor:'pointer'}}
                > X </button>
                </div>
                <section className='form-body-container'>
                    <form className='form-body' onSubmit={handleSubmit}>
                        <label className='form-label'>
                            Start date:
                            <DatePicker
                                selected={startDate}
                                onChange={createStart}
                                selectsStart
                                startDate={startDate}
                                endDate={endDate}
                            />
                        </label>
                        <label className='form-label'>
                            End date:
                            <DatePicker
                                selected={endDate}
                                onChange={createEnd}
                                selectsEnd
                                startDate={startDate}
                                endDate={endDate}
                                minDate={startDate}
                            />
                        </label>
                        <button className='button form-button' type='submit'>Confirm your stay</button>
                    </form>
                </section>
            </div>
        </div>

    )
}
