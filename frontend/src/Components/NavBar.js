import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsFillMenuButtonFill } from 'react-icons/bs';
import { BsFillMenuButtonWideFill } from 'react-icons/bs';
import Logo from '../assets/images/Caregrid_logo.png';
import "../assets/styles/NavBar.css";
function NavBar() {

  let auth = localStorage.getItem('user');
  auth = JSON.parse(auth)
  useEffect(() => {
    auth = localStorage.getItem('user');
    auth = JSON.parse(auth)
  }, [])
  const [bool, setBool] = useState(false);
  const [authenticate, setAuthenticate] = useState(auth);
  function clicker() {
    setBool(!bool);
  }
  const navigate = useNavigate()
  function logout(){
    localStorage.clear();
    setAuthenticate(false)
  }

  return (
    <div>
      <div className={"nav-bar"}>
        <div className="title">
          <img src={Logo} alt="" className="nav_logo" />
          <span className="logo"><Link className="logo1" to="/">
            CareGrid
          </Link></span>
          {(bool) ? <BsFillMenuButtonFill className="icon" onClick={() => clicker()} /> : <BsFillMenuButtonWideFill className="icon" onClick={() => clicker()} />}
        </div>
        <div className={bool ? "show" : "list"}>
          <li>
            <Link className="anchor" to="/">
              Home
            </Link>
          </li>
          <li>
          {(authenticate)?
            <Link className="anchor" to={`https://caregrid-doctor.vercel.app/?data=${localStorage.getItem('user')}`}>
              Appointment
            </Link>
            :
            <Link className="anchor" to="/login">
              Appointment
            </Link>
          }
          </li>
          <li>
            <Link className="anchor" to="/aboutus">
              About us
            </Link>
          </li>
          <li>
            <Link className="anchor" to="/contactus">
              Contact us
            </Link>
          </li>
          <li>
          {(authenticate)?
            <Link className="nav_schedule" to="">
            Hey {auth.firstName}&#128075;
            </Link>
          :(
            <Link className="nav_schedule" to="/signup">
            SignUp
            </Link>
          )}
          </li>
          {(!authenticate) ?
            <li>
              <button className='nav_login_button' onClick={() => navigate('/login')}><span>Login</span></button>
            </li> :
            <li>
              <button className='nav_login_button' onClick={() => logout()}><span>Logout</span></button>
            </li>
          }
        </div>
      </div>
    </div>
  );
}
export default NavBar;
