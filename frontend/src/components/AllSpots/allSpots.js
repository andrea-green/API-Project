import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpotsThunk } from '../../store/spots';
import { useHistory } from 'react-router-dom';
import '../../index.css';



function AllSpots() {
    const dispatch = useDispatch();
    const history = useHistory();
    const allSpots = useSelector((state) => state.Spots.allSpots);
    const allSpotsArr = Object.values(allSpots);


    useEffect(() => {
        dispatch(getSpotsThunk())
    }, [dispatch]);



    return (
        <section className='big-box-div'>
            <div className="all-spots-page">
                {allSpotsArr.map(({ id, city, state, avgRating, price, previewImage }) => (
                    <div key={id} className='all-spots-details' onClick={() => history.push(`/spots/${id}`)}>
                        <div className='spot-preview-image-div'>
                            <img src={previewImage} alt='preview-img'></img>
                        </div>
                        <div className='city-state-div'> {`${city},${state}`}</div>
                        <div className='price-div'>{`${price} night`}</div>
                        <div className="rating-div">{avgRating} </div>
                    </div>
                ))}
            </div>
        </section>
    );
};


export default AllSpots;
