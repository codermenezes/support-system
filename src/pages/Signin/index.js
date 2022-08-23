import React, { useContext, useState } from 'react' ;
import { Link } from 'react-router-dom'
import './signin.css';
import logo from '../../assets/logo.png';
import { AuthContext } from '../../contexts/auth';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassowrd] = useState('');
  const { signIn, loadingAuth  } = useContext(AuthContext);

  function handleSubmit(e) {
    e.preventDefault();
    if (email !== '' && password !== '') {
      signIn(email, password);
    }
  }

  return (
    <div className="container-center">
      <div className="login">
        <div className="login-area">
          <img src={logo} alt="Logo System"/>
        </div>
        <form onSubmit={handleSubmit}>
          <h1>Support System</h1>
          <input type="text" placeholder="email" value={email} onChange={(e) =>setEmail(e.target.value)}/>
          <input type="password" placeholder ="pass" value={password} onChange={ (e)=> setPassowrd(e.target.value)}/>
            <button type="submit">{loadingAuth ? 'Loading...' : 'Login'}</button>
        </form>
        <Link to="/register">New Account</Link>
      </div>
      </div>
    )
  }
export default SignIn;
