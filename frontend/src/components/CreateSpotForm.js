import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createNewSpotThunk } from '../store/spots';

const CreateSpotForm = ({ hideForm }) => {

    //need use selector ??
    //?? lat,lng??  hardcode or still keep here.
    const dispatch = useDispatch();
    const history = useHistory();

    const [name,setName] = useState('');
    const [address,setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state,setState] = useState('');
    const [country,setCountry] = useState('');
    // const [lat,setLat] = useState(90.0000);
    // const [lng,setLng] = useState(135.0000);
    const [description,setDescription] = useState('');
    const [price,setPrice] = useState();


    const updateAddress = (e) => setAddress(e.target.value);
    const updateCity = (e) => setCity(e.target.value);
    const updateState = (e) => setState(e.target.value);
    const updateCountry = (e) => setCountry(e.target.value);
    // const updateLat = (e) => setLat(e.target.value);
    // const updateLng = (e) => setLng(e.target.value);
    const updateName = (e) => setName(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);
    const updatePrice = (e) => setPrice(e.target.value);

    const handleSubmit = async(e)=>{
        e.preventDefault();

        const myNewSpot = {
            name,
            address,
            city,
            state,
            country,
            lat:90.0000,
            lng:135.000,
            description,
            price,
        };

        let createdSpot = await dispatch(createNewSpotThunk(myNewSpot));
        if(createdSpot){
            history.push(`/spots/${createdSpot.id}`);
             hideForm();
        }
    };

    const handleCancelClick = (e) => {
        e.preventDefault();
        hideForm();
      };
    return (
        <section className='new-form-holder'>
            <form
                className='create-spot-form'
                onSubmit={handleSubmit}
            >
                <input
                    type="text"
                    placeholder="Property Name"
                    required
                    value={name}
                    onChange={updateName}
                />
                <input
                    type="text"
                    placeholder="Address"
                    required
                    value={address}
                    onChange={updateAddress}
                />
                 <input
                    type="text"
                    placeholder="City"
                    required
                    value={city}
                    onChange={updateCity}
                />
                 <input
                    type="text"
                    placeholder="State"
                    required
                    value={state}
                    onChange={updateState}
                />
                 <input
                    type="text"
                    placeholder="Country"
                    required
                    value={country}
                    onChange={updateCountry}
                />
                 <input
                    type="text"
                    placeholder="Country"
                    required
                    value={country}
                    onChange={updateCountry}
                />
                 <input
                    type="text"
                    placeholder="Description"
                    required
                    value={description}
                    onChange={updateDescription}
                />
                 <input
                    type="number"
                    placeholder="Price per night "
                    required
                    value={price}
                    onChange={updatePrice}
                />
                <button type="submit">Create new Spot</button>
                <button
                    type="button"
                    onClick={handleCancelClick}
                >
                    Cancel
                    </button>
            </form>
        </section>
    )
}

export default CreateSpotForm;