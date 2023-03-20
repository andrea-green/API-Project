import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserBookingsThunk } from '../../store/bookings';
import OpenModalButton from '../OpenModalButton';
import DeleteBookingForm from './delete-booking';
import { useModal } from '../../context/Modal';

export default function UserBookings() {


    const dispatch = useDispatch();
    const {closeModal} = useModal();

    const [setErrors] = useState([]);

    const bookings = useSelector(state => state.Bookings.user);

    const bookingsArr = Object.values(bookings)



    useEffect(() => {
        dispatch(getUserBookingsThunk())
            .catch(
                async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                }
            );
    }, [dispatch, setErrors]);



    return (
        <div className='My-Reviews'>
            <div className='my-reviews-header-div' style={{display:'flex',alignItems:'flex-start'}}>
                <h1>My Bookings</h1>
                <button
                    type='submit'
                    onClick={closeModal}
                    style={{cursor:'pointer'}}
                >X</button>
            </div>
            <div className='my-reviews-modal-div'>
                {!!bookingsArr.length ? bookingsArr.map(booking => (
                    <div className='my-reviews-card-div'>
                        <div key={booking.id} style={{fontWeight:'bolder'}}>{booking.Spot.name}</div>
                        <div key={booking.startDate}>{booking.startDate} - {booking.endDate}</div>
                        <div className='button'>{<OpenModalButton
                            modalComponent={<DeleteBookingForm id={booking.id}/>}
                            buttonText='Cancel booking' />}</div>
                    </div>
                )) : (
                    <div>You have no bookings.</div>
                )}
            </div>

        </div>
    );
}
