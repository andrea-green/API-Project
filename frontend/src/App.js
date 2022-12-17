import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch,Route,Link } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import AllSpots from "./components/AllSpots/allSpots";
import SingleSpot from "./components/SingleSpot/single-spot-comp";
import EditSpotForm from "./components/EditSpotForm/EditSpotForm";
import CreateSpotForm from "./components/CreateSpotFormModal/CreateSpotForm";
import Review from "./components/Review/Review-component";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div>
      <Navigation isLoaded={isLoaded} />
        {isLoaded && (
          <Switch>
            <Route exact path ='/'>
              <AllSpots />
            </Route>
            <Route path='/spots/:spotId'>
              <SingleSpot />
            </Route>
            <Route exact path ='/spots/:spotId'>
              < EditSpotForm />
              <Review />
            </Route>
            <Route exact path ='/'>
              < CreateSpotForm />
            </Route>
            <Route path ='/'>
              <div className='404Error'>
                <h1>404 Page Not Found</h1>
                <Link to={'/'}>Return home</Link>
              </div>
            </Route>

          </Switch>
        )}
    </div>
  );
}

export default App;
