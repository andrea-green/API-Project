import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useModal } from "../../context/Modal";
import { deleteSpotThunk } from '../../store/spots';



const DeleteSpotForm = () => {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const history = useHistory();



    const mySpot = useSelector((state) => state.Spots.singleSpot);

    const [boolean, setBoolean] = useState(false);

    const [errorValidations, setErrorValidations] = useState([]);

    const trueBoolean = (e) => setBoolean(true);
    const falseBoolean = (e) => setBoolean(false);



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
            <div className='form-header'>
                <h1>Are you sure you want to delete?</h1>
            </div>
            <section className='form-body-container'>
                <div className='delete-errors'>
                    <ul>{errorValidations.map((error) => (
                        <li key={error}>{error}</li>
                    ))}
                    </ul>
                </div>
                <form onSubmit={handleSubmit}>
                    <label>
                        No
                        <input className='button'
                            type="radio"
                            required
                            checked={boolean ? false : true}
                            onChange={falseBoolean}
                        />
                    </label>
                    <label>
                        Yes
                        <input className='button'
                            type="radio"
                            required
                            checked={boolean}
                            onChange={trueBoolean}
                        />
                    </label>
                    <button
                        className='button form-button'
                        type="submit"
                        disabled={!boolean}
                    >Confirm</button>
                </form>
            </section>


        </div>

    )
}

export default DeleteSpotForm;
