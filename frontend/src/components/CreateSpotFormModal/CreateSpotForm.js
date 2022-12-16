import React, { useState } from 'react';
import { useDispatch} from 'react-redux';
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import './CreateSpotForm.css';
import { createNewSpotThunk } from '../../store/spots';
import { useHistory } from 'react-router-dom';


const CreateSpotForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [name,setName] = useState('');
    const [address,setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state,setState] = useState('');
    const [country,setCountry] = useState('');
    const [description,setDescription] = useState('');
    const [price,setPrice] = useState(1);
    const [url,setUrl] = useState('');
    const [errors,setErrors] = useState([]);
    const { closeModal } = useModal();

    const updateAddress = (e) => setAddress(e.target.value);
    const updateCity = (e) => setCity(e.target.value);
    const updateState = (e) => setState(e.target.value);
    const updateCountry = (e) => setCountry(e.target.value);
    const updateName = (e) => setName(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);
    const updatePrice = (e) => setPrice(e.target.value);
    const updateUrl = (e) => setUrl(e.target.value);

    //submit click
    const handleSubmit = async(e)=>{
        e.preventDefault();
        setErrors([]);
        const myNewSpot = {
            name,
            address,
            city,
            state,
            country,
            lat:90.0000,
            lng:135.0000,
            description,
            price,
        };
        return dispatch(createNewSpotThunk(myNewSpot,url))
            .then(history.push(`/api/spots`))
            .then(closeModal)
            .catch(async (res) => {
                const data = await res.json();
                if(data && data.errors) setErrors(data.errors);
            });
    };

    return (
        <>
            <h1>List your home</h1>
            <section className='create-spot-form'>
                <form onSubmit={handleSubmit}>
                    <label>
                        name
                        <input
                            type="text"
                            placeholder="Property Name"
                            required
                            value={name}
                            onChange={updateName}
                        />
                    </label>
                    <label>
                        address
                        <input
                            type="text"
                            placeholder="Address"
                            required
                            value={address}
                            onChange={updateAddress}
                        />
                    </label>
                    <label>
                        city
                        <input
                            type="text"
                            placeholder="City"
                            required
                            value={city}
                            onChange={updateCity}
                        />
                    </label>
                    <label>
                        state
                        <input
                            type="text"
                            placeholder="State"
                            required
                            value={state}
                            onChange={updateState}
                        />
                    </label>
                    <label>
                        Country
                        <input
                            type="text"
                            placeholder="Country"
                            required
                            value={country}
                            onChange={updateCountry}
                        />
                    </label>
                    <label>
                       Description
                        <input
                            type="text"
                            placeholder="Description"
                            required
                            value={description}
                            onChange={updateDescription}
                        />
                    </label>
                    <label>
                        price
                        <input
                            type="number"
                            placeholder="Price per night "
                            required
                            value={price}
                            onChange={updatePrice}
                        />
                    </label>
                    <label>
                        preview image link
                        <input
                            type="text"
                            placeholder="preview image link"
                            required
                            value={url}
                            onChange={updateUrl}
                        />
                    </label>
                    <button type="submit">Create new Spot</button>
                </form>
            </section>

        </>
    )
}

export default CreateSpotForm;
