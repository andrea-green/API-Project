import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserBookingsThunk } from '../../store/bookings';
import OpenModalButton from '../OpenModalButton';
import DeleteBookingForm from './delete-booking';

export default function UserBookings() {


    const dispatch = useDispatch();

    const [setErrors] = useState([]);

    const bookings = useSelector(state => state.Bookings.user.allBookings);

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
            <div className='my-reviews-header-div'>
                <h1>My Bookings</h1>
            </div>
            <div className='my-reviews-modal-div'>
                {!!bookingsArr.length ? bookingsArr.map(booking => (
                    <div className='my-reviews-card-div'>
                        <div key={booking.id}>{booking.spotId}</div>
                        <div key={booking.startDate}>{booking.startDate} - {booking.endDate}</div>
                        <div className='button'>{<OpenModalButton
                            modalComponent={<DeleteBookingForm id={booking.id}/>}
                            buttonText='Delete booking' />}</div>
                    </div>
                )) : (
                    <div>You have no bookings.</div>
                )}
            </div>

        </div>
    );
}
