import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './style/Navbar.module.css';



export default function Navbar() {
  const [token, setToken] = useState('');

  useEffect(() => {
   
    const storedToken = JSON.parse(sessionStorage.getItem('token'));
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);


  const handleLogout = () => {
  
    sessionStorage.clear();
    setToken('');
    navigate("/");
  };


  const navigate = useNavigate();
 
  return (
    <div className={styles.navbar}>
      <Link to="/message">
      Message Dashboard
      </Link>
      {token ? (
        <h4  onClick={handleLogout}>
          Logout
        </h4>
      ) : (
        <h4 >
          <Link to="/" >
            Login/Signup
          </Link>
        </h4>
      )}
       <div>
  
    </div>
    </div>
  );
}
