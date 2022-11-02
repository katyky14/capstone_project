import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom';
import { signUp } from '../../store/session';

import './loginForm.css'

const SignUpForm = () => {

  const history = useHistory()

  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false)



  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    setHasSubmitted(true)

    if (errors.length > 0) {
      return alert("Cannot Submit")
    }

    // if (!email.includes('@')) {
    //   return setErrors(['Please provide a valid email'])
    // }

    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password, first_name, last_name));
      if (data) {
        //console.log('the data', data)
        setErrors(data)
      }
    //   return;
    }
    // return setErrors(['Password fields must match'])
  };


  useEffect(() => {
    const valErrors = [];

    if (username.length < 2 || username.length > 25) valErrors.push('Username must be between 2 and 25 characters');
    if (first_name.length < 2 || first_name.length > 25) valErrors.push('First Name must be between 2 and 25 characters');
    if(last_name.length < 2 || last_name.length > 25) valErrors.push("Last Name must be between 2 and 25 characters");
    if (!email.includes('@')) valErrors.push("Please provide a valid Email");
    if (password.length < 6 || password.length > 25) valErrors.push("Password must be between 6 and 25 characters");
    if (password !== repeatPassword) valErrors.push("Password fields doesn't match")


    setErrors(valErrors)

  }, [first_name, last_name, email, username, password, repeatPassword])



  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (

    <div className='form-container-main'>

      <div className='left-form left-signup'>

        <form onSubmit={onSignUp}>
          <h2 className='login-h3'>Sign Up for Relp </h2>
          <p className='new-to-relp'>Already in Relp? <button  className='signup-button-login' onClick={() => history.push('/login')}>Log In</button></p>
          <p className='new-to-relp'>Connect with great local businesses</p>
          <div>
            {hasSubmitted && errors.map((error, ind) => (
              <div key={ind} className='signup-errors'>{error}</div>
            ))}
          </div>
          <div>
            <label className='label-signup input-label-signup'>Username *</label>
            <input
              className='input-form'
              // placeholder='Username'
              type='text'
              name='username'
              onChange={updateUsername}
              value={username}
              required
            ></input>
          </div>

          <div>
            <label  className='label-signup'> First Name *</label>

            <input
              className='input-form'
              // placeholder='First Name'
              type='text'
              name='firstName'
              onChange={e => setFirstName(e.target.value)}
              value={first_name}
              required
            />
          </div>

          <div>
            <label  className='label-signup'>Last Name *</label>
            <input
              className='input-form'
              // placeholder='Last Name'
              type='text'
              name='lastName'
              onChange={e => setLastName(e.target.value)}
              value={last_name}
              required
            />
          </div>

          <div>
            <label  className='label-signup'>Email *</label>
            <input
              className='input-form'
              // placeholder='Email'
              type='text'
              name='email'
              onChange={updateEmail}
              value={email}
            ></input>
          </div>
          <div>
            <label  className='label-signup'>Password *</label>
            <input
              className='input-form'
              // placeholder='Password'
              type='password'
              name='password'
              onChange={updatePassword}
              value={password}
            ></input>
          </div>
          <div>
            <label  className='label-signup'>Repeat Password *</label>
            <input
              className='input-form'
              // placeholder='Confirm Password'
              type='password'
              name='repeat_password'
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
            ></input>
          </div>
          <button className='button-style' type='submit'>Sign Up</button>
        </form>
      </div>

      <div className='right-form signup-img'>
        <img
        className='signup-img'
          src='https://64.media.tumblr.com/034135208d1b91f579ee5582c19cd0be/tumblr_pw50rmClPW1ufm3tmo2_500.jpg' alt='login-img'
          style={{
            width: '300px',
            height: '300px',
            borderRadius: '170px'
          }}
        ></img>
      </div>

    </div>
  );
};

export default SignUpForm;
