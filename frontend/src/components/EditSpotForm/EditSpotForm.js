import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useModal } from "../../context/Modal";
import { updateSpotAc } from '../../store/spots';



const [errors,setErrors] = useState([]);
const { closeModal } = useModal();


const EditSpotForm = ({ hideForm }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [name,setName] = useState('');
    const [address,setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state,setState] = useState('');
    const [country,setCountry] = useState('');
    const [description,setDescription] = useState('');
    const [lat,setLat] = useState('90.0000');
    const [lng,setLng] = useState('135.0000');
    const [price,setPrice] = useState();
    const [avgRating, setAvgRating] = useState();
    const [numReviews, setNumReviews] = useState();
    const [errors,setErrors] = useState([]);

    const handleSubmit = async(e) =>{
        e.preventDefault();

        const modifiedSpot= {
            id: spotId,
            name,
            address,
            city,
            state,
            country,
            description,
            price,
            lat,
            lng,
            avgRating,
            numReviews,
            SpotImages:SpotImages,
            Owner:sessionUser
        }

        await dispatch(updateSpotAc(modifiedSpot))
            .then(closeModal)
            .catch(async (res) => {
                const data = await res.json();
                if(data && data.errors) setErrors(data.errors);
            });
    }

//submit click
// const handleSubmit = async(e)=>{

// }

 //cancel click
 const handleCancelClick = (e) => {
    e.preventDefault();
    hideForm();
  };

}
