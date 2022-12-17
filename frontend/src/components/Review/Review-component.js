import './review.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory} from 'react-router-dom';


function Review() {
    const user = useSelector((state) => state.session.user);
    const mySpot = useSelector((state) => state.Spots.singleSpot);

    const dispatch = useDispatch();
    const { spotId } = useParams();
    const history = useHistory();
    const [validationErrors, setValidationErrors] = useState([]);

    
    return <div>
        <h1>herro</h1>
    </div>;
}

export default Review;
