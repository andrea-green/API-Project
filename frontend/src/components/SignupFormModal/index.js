import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, firstName, lastName, password }))
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(Object.values(data.errors));
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <>
      <div className='form-header'>
        <h1>Sign Up</h1>
      </div>
      <section className='form-body-container'>
        <form className='form-body' onSubmit={handleSubmit}>
          <ul>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>
          <label className='form-label'>

            <input className='form-input'
              type="text"
              placeholder='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label className='form-label'>

            <input className='form-input'
            placeholder="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          <label className='form-label'>
            <input className='form-input'
              placeholder='First Name'
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </label>
          <label className='form-label'>
            <input className='form-input'
              placeholder="Last Name"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </label>
          <label className='form-label'>
            <input className='form-input'
              type="password"
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <label className='form-label'>

            <input className='form-input'
              placeholder='ConfirmPassword'
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>
          <button
            className='button form-button'
            type="submit">Sign Up</button>
        </form>
      </section>
    </>
  );
}

export default SignupFormModal;
