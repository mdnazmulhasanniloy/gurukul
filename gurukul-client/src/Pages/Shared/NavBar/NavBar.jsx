import React, {useContext} from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthProvider';
import { toast } from 'react-hot-toast';

const NavBar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const Navigate = useNavigate()




  //sign out account
  const HandelToLogout = () => {
    signOutUser()
    .then(() => {
      localStorage.removeItem('accessToken')
      Navigate('/')
    })
    .catch(error => toast.error(error));
    
  }
  
  
  
  const menu = <React.Fragment>
                    <li>
                        <NavLink to='/home'>Home</NavLink>
                    </li>
                    
                    <li>
                        {
                          user?.email?
                          <Link onClick={HandelToLogout} >Logout </Link> : 
                          <NavLink to='/login'>Login</NavLink>
                        }
                    </li>
                </React.Fragment>
    return (
        <div className="navbar bg-base-100">
  <div className="navbar-start">
    <div className="dropdown">
      <label tabIndex={0} className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </label>
      <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
        {
            menu
        }
      </ul>
    </div>
    <a className="btn btn-ghost upper-case text-xl">Geeks of Gurukul</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      {
        menu
      }
    </ul>
  </div>
  <div className="navbar-end">
    <a className="btn">Get started</a>
  </div>
</div>
    );
};

export default NavBar;