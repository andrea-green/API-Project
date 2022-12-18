import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import "./DemoUser.css";

function DemoUser() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("Demo-lition");
  const [password, setPassword] = useState("password");



  const handleSubmit = (e) => {
    e.preventDefault();
    return dispatch(sessionActions.login({ credential, password }))
  };

  return (
    <div className='clickable-div' onClick={handleSubmit}>
      DemoUserLogin
    </div>
  );
}

export default DemoUser;
