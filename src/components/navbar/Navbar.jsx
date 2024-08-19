import { useContext, useState } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
function Navbar(){
  const [open,setOpen] = useState(false);
  const {currentUser} = useContext(AuthContext);
  return (
      <nav>
          <div className="left">
              <Link to='/' className='logo'>
               <img src='/logo.png'/>
               <span>PropertyPulse</span>
              </Link>
              <Link to='/'  className="links"><span>Home</span></Link>
              <Link to='/about' className="links"><span>About</span></Link>
              <Link to='/contact' className="links"><span>Contact</span></Link>
              <Link to='/list' className="links"><span>Explore</span></Link>
          </div>
          <div className="right">
            {currentUser?(<div className='user'>
               <img src={currentUser.avatar} alt=''/>
               <span>{currentUser.username}</span>
               <Link to="/profile" className='profile'>
                
                <span>Profile</span>
               </Link>
            </div>):(<div className="sign">
            <Link to='/login'><span>Sign in</span></Link>
            <Link to='/register' className="register"><span>Sign up</span></Link></div>)}
            
            <div className='menuIcon'>
              <img src='/menu.png' alt='' onClick={()=>setOpen(!open)}/>
            </div>
            <div className={open ?"menu active":"menu"}>

              <Link to='/'  className="links"><span>Home</span></Link>
              <Link to='/about' className="links"><span>About</span></Link>
              <Link to='/contact' className="links"><span>Contact</span></Link>
              <Link to='/list' className="links"><span>Explore</span></Link>
              { 
                currentUser?
              <Link to="/profile" className='links'>
              <span>Profile</span>
             </Link>
             :<>
              <Link to='/login' className="links"><span>Sign in</span></Link>
              <Link to='/register' className="links"><span>Sign up</span></Link>
              </>
              }
            </div>
          </div>
      </nav>
  );
}


export default Navbar;

