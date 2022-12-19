import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import "./DemoUser.css";

function DemoUser() {
  const dispatch = useDispatch();
  const [credential] = useState("Demo-lition");
  const [password] = useState("password");



  const handleSubmit = (e) => {
    e.preventDefault();
    return dispatch(sessionActions.login({ credential, password }))
  };

  return (
    <div className='button'>
      <div className='clickable-div' onClick={handleSubmit}>
        DemoUserLogin
      </div>
    </div>
  );
}

export default DemoUser;
