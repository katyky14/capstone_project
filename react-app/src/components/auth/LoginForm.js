import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { login } from '../../store/session';

import './loginForm.css'


const LoginForm = () => {

  const history = useHistory()

  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='form-container-main'>


      <div className='left-form'>
        <form onSubmit={onLogin}>
          <div>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <h2 className='login-h3'>Log in to Relp</h2>
          <p className='new-to-relp'>New to Relp?
            <button
            className='signup-button-login'
            onClick={() => history.push('/sign-up')}>Sign up
            </button></p>
          <div>
            {/* <label htmlFor='email'>Email</label> */}
            <input
              className='input-form'
              name='email'
              type='text'
              placeholder='Email'
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div>
            {/* <label htmlFor='password'>Password</label> */}
            <input
              className='input-form'
              name='password'
              type='password'
              placeholder='Password'
              value={password}
              onChange={updatePassword}
            />
            <div>
              <button className='button-style' type='submit'>Log In</button>
            </div>
            <div>
              <button
                className='button-style'
                type='submit'
                onClick={() => {
                  setEmail("demo@aa.io");
                  setPassword('password')
                }}>Demo User</button>
            </div>
          </div>
        </form>
      </div>


      <div className='right-form'>
        <img
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

export default LoginForm;
