import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch,Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import AllSpots from "./components/AllSpots/allSpots";
import SingleSpot from "./components/SingleSpot/single-spot-comp";

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
            <Route exact path ='/spots'>
              <AllSpots />
            </Route>
            <Route path='/spots/:spotId'>
              <SingleSpot />
            </Route>
          </Switch>
        )}
    </div>
  );
}

export default App;
