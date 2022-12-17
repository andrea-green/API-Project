
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useModal } from "../../context/Modal";
import { useParams } from 'react-router-dom';
import { deleteSpotThunk } from '../../store/spots';



const DeleteSpotForm = () => {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const history = useHistory();


    // const user = useSelector((state) => state.session.user);
    const mySpot = useSelector((state) => state.Spots.singleSpot);

    const [boolean, setBoolean] = useState(false);
    // const [address, setAddress] = useState('');
    // const [city, setCity] = useState('');
    // const [state, setState] = useState('');
    // const [country, setCountry] = useState('');
    // const [description, setDescription] = useState('');
    // const [price, setPrice] = useState();

    const [errorValidations, setErrorValidations] = useState([]);

    const trueBoolean = (e) => setBoolean(true);
    const falseBoolean = (e) => setBoolean(false);
    // const updateCity = (e) => setCity(e.target.value);
    // const updateState = (e) => setState(e.target.value);
    // const updateCountry = (e) => setCountry(e.target.value);
    // const updateName = (e) => setName(e.target.value);
    // const updateDescription = (e) => setDescription(e.target.value);
    // const updatePrice = (e) => setPrice(e.target.value);


    // useEffect(() => {
    //     const errors = [];
    //     if (name.length === 0) errors.push("You must enter a name.");
    //     if (address.length === 0) errors.push("You must enter an address.");
    //     if (city.length === 0) errors.push("You must enter a city.");
    //     if (state.length === 0) errors.push("You must enter a valid state.");
    //     if (country.length === 0) errors.push("You must enter a valid country.");
    //     if (description.length === 0) errors.push("You must enter a valid description.");
    //     if (price <= 0) errors.push("You must enter a valid price.");

    //     setErrorValidations(errors);
    // }, [name, address, city, state, country, description, price]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(deleteSpotThunk(mySpot.id))
            .then(history.push(`/`))
            .then(closeModal)
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrorValidations(data.errors);
            });
    };

    return (
        <div>
            <h1>Are you sure you want to delete?</h1>
            <section className='delete-spot-form'>
                    <div className='delete-errors'>
                        <ul>{errorValidations.map((error) => (
                            <li key={error}>{error}</li>
                        ))}
                        </ul>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <label>
                            No
                            <input
                                type="radio"
                                required
                                checked={boolean ? false : true }
                                onChange={falseBoolean}
                            />
                        </label>
                        <label>
                            Yes
                            <input
                                type="radio"
                                required
                                checked={boolean}
                                onChange={trueBoolean}
                            />
                        </label>
                        <button
                        type="submit"
                        disabled={!boolean}
                        >Confirm</button>
                    </form>
            </section>


        </div>

    )
}

export default DeleteSpotForm;
