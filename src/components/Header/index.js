import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/auth';
import './header.css'
import avatar from '../../assets/avatar.png'
import { Link } from 'react-router-dom';
import { FiHome, FiSettings, FiUser } from "react-icons/fi";

export default function Header() {
  const {user} = useContext(AuthContext);
  return (
    <div className='sidebar'>
      <div>
        <img src={user.avatarUrl === null ? avatar : user.avatarUrl} alt='avatar'/>
      </div>
      <Link to="/dashboard">
        <FiHome color="#fff"fontSize={24}/>
        Chamados
      </Link>
      <Link to="/customers">
        <FiUser color="#fff"fontSize={24}/>
        Clients
      </Link>
      <Link to="/profile">
        <FiSettings color="#fff"fontSize={24}/>
        Settings
      </Link>
    </div>
  );
}
