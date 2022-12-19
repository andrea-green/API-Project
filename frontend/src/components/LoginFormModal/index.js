import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
// import "./LoginForm.css";
// import '../../index.css';

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(
        async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        }
      );
  };

  return (
    <>
      <div className='form-header'>
        <h1>Log In</h1>
      </div>
      <section className='form-body-container'>
        <form className='form-body' onSubmit={handleSubmit}>
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <label className='form-label'>
            Username or Email
            <input className='form-input'
              placeholder='username or email'
              type="text"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              required
            />
          </label>
          <label className='form-label'>
            Password
            <input className='form-input'
              type="password"
              placeholder='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required

            />
          </label>
          <button
            className='button form-button'
            type="submit">Log In</button>
        </form>

      </section>
    </>
  );
}

export default LoginFormModal;
