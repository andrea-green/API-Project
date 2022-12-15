import React, { useState } from 'react';
import { useDispatch} from 'react-redux';
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import './CreateSpotForm.css';

const CreateSpotForm = ({ hideForm }) => {
    const dispatch = useDispatch();

    const [name,setName] = useState('');
    const [address,setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state,setState] = useState('');
    const [country,setCountry] = useState('');
    const [description,setDescription] = useState('');
    const [price,setPrice] = useState();
    const [errors,setErrors] = useState([]);
    const { closeModal } = useModal();

    const updateAddress = (e) => setAddress(e.target.value);
    const updateCity = (e) => setCity(e.target.value);
    const updateState = (e) => setState(e.target.value);
    const updateCountry = (e) => setCountry(e.target.value);
    const updateName = (e) => setName(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);
    const updatePrice = (e) => setPrice(e.target.value);

    //submit click
    const handleSubmit = async(e)=>{
        e.preventDefault();

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
    };

    //cancel click
    const handleCancelClick = (e) => {
        e.preventDefault();
        hideForm();
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
                    <button type="submit">Create new Spot</button>
                    <button
                        type="button"
                        onClick={handleCancelClick}
                    >
                        Cancel
                        </button>
                </form>
            </section>

        </>
    )
}

export default CreateSpotForm;
