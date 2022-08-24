import React, { useState, useContext } from 'react' ;
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import logo from '../../assets/logo.png';
import { AuthContext }  from '../../contexts/auth';

function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassowrd] = useState('');
  const { signUp, loadingAuth } = useContext(AuthContext);

  function handleSubmit(e) {
    e.preventDefault();
    if (name !== '' && email !== '' && password !== '') {
      signUp(email, password, name)
    } else {
      toast.error('Ops, somethint whent wrong! Please check your data.')
    }
  }

  return (
    <div className="container-center">
      <div className="login">
        <div className="login-area">
          <img src={logo} alt="Logo System"/>
        </div>
        <form onSubmit={handleSubmit}>
          <h1>Sign Up</h1>
          <input type="text" placeholder="Name" value={name} onChange={(e)=> setName(e.target.value)}/>
          <input type="text" placeholder="email" value={email} onChange={(e) =>setEmail(e.target.value)}/>
          <input type="password" placeholder="pass" value={password} onChange={ (e)=> setPassowrd(e.target.value)}/>
          <button type="submit">{loadingAuth ? 'Loading...' : 'Sign Up'}</button>
        </form>
        <Link to="/">Sign In</Link>
      </div>
      </div>
    )
  }
export default SignUp;
