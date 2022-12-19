import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useModal } from "../../context/Modal";
import { updateSpotThunk } from '../../store/spots';




const EditSpotForm = () => {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const history = useHistory();



    const mySpot = useSelector((state) => state.Spots.singleSpot);

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(1);

    const [errorValidations, setErrorValidations] = useState([]);

    const updateAddress = (e) => setAddress(e.target.value);
    const updateCity = (e) => setCity(e.target.value);
    const updateState = (e) => setState(e.target.value);
    const updateCountry = (e) => setCountry(e.target.value);
    const updateName = (e) => setName(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);
    const updatePrice = (e) => setPrice(e.target.value);


    useEffect(() => {
        const errors = [];
        if (name.length === 0) errors.push("You must enter a name.");
        if (address.length === 0) errors.push("You must enter an address.");
        if (city.length === 0) errors.push("You must enter a city.");
        if (state.length === 0) errors.push("You must enter a valid state.");
        if (country.length === 0) errors.push("You must enter a valid country.");
        if (description.length === 0) errors.push("You must enter a valid description.");
        if (price <= 0) errors.push("You must enter a valid price.");

     setErrorValidations(errors);
    }, [name, address, city, state, country, description, price]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        const modifiedSpot = {
            name,
            address,
            city,
            state,
            country,
            description,
            price,
            lat: 90.0000,
            lng: 135.0000,
        }
        const {id, Owner,SpotImages,numReviews,avgStarRating} = mySpot

        const spotAddDetails = {
            id,
            Owner,
            numReviews,
            avgStarRating,
            SpotImages
        }

        await dispatch(updateSpotThunk(modifiedSpot,spotAddDetails))
            .then(history.push(`/spots/${id}`))
            .then(closeModal)
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrorValidations(data.errors);
            });
    };

    return (
        <>
            <h1>Edit your listing</h1>
            <section className='edit-spot-form'>
                <div className='owner-edit-form'>
                    <ul> {errorValidations.map((error) => (
                        <li key={error}>{error}</li>
                    ))}
                    </ul>
                </div>
                <form onSubmit={handleSubmit}>
                    <label>
                        name
                        <input
                            type="text"

                            required
                            value={name}
                            onChange={updateName}
                        />
                    </label>
                    <label>
                        address
                        <input
                            type="text"

                            required
                            value={address}
                            onChange={updateAddress}
                        />
                    </label>
                    <label>
                        city
                        <input
                            type="text"
                            required
                            value={city}
                            onChange={updateCity}
                        />
                    </label>
                    <label>
                        state
                        <input
                            type="text"

                            required
                            value={state}
                            onChange={updateState}
                        />
                    </label>
                    <label>
                        Country
                        <input
                            type="text"

                            required
                            value={country}
                            onChange={updateCountry}
                        />
                    </label>
                    <label>
                        Description
                        <input
                            type="text"

                            required
                            value={description}
                            onChange={updateDescription}
                        />
                    </label>
                    <label>
                        price
                        <input
                            type="number"
                            min='1'
                            max='1000'
                            required
                            value={price}
                            onChange={updatePrice}
                        />
                    </label>

                    <button className='button' type="submit">Save changes</button>
                </form>
            </section>

        </>
    )
}

export default EditSpotForm;
