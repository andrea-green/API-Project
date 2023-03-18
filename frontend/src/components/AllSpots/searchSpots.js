import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpotsThunk } from '../../store/spots';
import { useHistory, useParams } from 'react-router-dom';
import '../../index.css';
import Footer from '../../css-modules/singleSpot/footer/footer';



function SearchSpots() {
    const { city } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const allSpots = useSelector((state) => state.Spots.allSpots);
    const allSpotsArr = Object.values(allSpots);
    const filteredSpots = allSpotsArr.filter((spot) => spot.city === city)


    return (

        <div className='big-box-div'>
            <div className="all-spots-page">
                {filteredSpots.map(({ id, city, state, avgRating, price, previewImage }) => (
                    <div key={id} className='all-spots-details' onClick={() => history.push(`/spots/${id}`)}>
                        <div>
                            <div className='button front-page-image'>
                                <img className='spot-preview-image' src={previewImage} alt='preview-img'></img>
                            </div>
                            <div className='spot-info'>
                                <div className='flex-column'>
                                    <div className='city-state-div'> {`${city},${state}`}</div>
                                    <div className='price-div'>{`$${price} night`}</div>
                                </div>
                                <div className='flex-column'>
                                    <div className='spot-rating'>
                                        <i className="fas fa-star">{avgRating}</i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>


    );
};


export default SearchSpots;
