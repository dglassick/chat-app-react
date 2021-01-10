import React from 'react';
import { Button } from '@material-ui/core';
import './Login.css';
import { auth, provider } from '../../firebase';
import { useStateValue } from '../../utils/StateProvider';
import { actionTypes } from '../../utils/reducer';

function Login() {
  const [{}, dispatch] = useStateValue();
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then(result =>
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user
        })
      )
      .catch(error => alert(error.message));
  };
  return (
    <div className='login'>
      <div className='login__container'>
        <img src='https://www.freelogodesign.org/file/app/client/thumb/73511c80-ae27-4cf9-b9d0-2a1cd9a92a62_200x200.png?1610312290948' alt='' />
        <div className='login__text'>
          <h1>Sign in to Chat App</h1>
        </div>
        <Button type='submit' onClick={signIn}>
          Sign In with Google
        </Button>
      </div>
    </div>
  );
}

export default Login;
