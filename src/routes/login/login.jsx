import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import apiRequest from "../../lib/apiRequest";
import { AuthContext } from "../../context/AuthContext";

function Login() {
    const [error,setError] = useState("");
    const [isLoading,setIsLoading] = useState(false);
    const navigate = useNavigate();
    const {updateUser} = useContext(AuthContext);

    const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target);
    const username = formData.get('username');
    const password = formData.get('password');
    try{
    const res = await apiRequest.post("/auth/login",{
      username,
      password
    });
   
    updateUser(res.data.userInfo);
    navigate('/');
  }catch(err){ 
    setError("User not found");
  }
  finally{
    setIsLoading(false);
  }
    };
  return (
    <div className="login">
      <div className="formContainer" onSubmit={handleSubmit}>
        <form>
          <h1>Welcome back</h1>
          <input name="username" type="text" placeholder="Username" />
          <input name="password" type="password" required placeholder="Password" />
          <button disabled={isLoading}>Login</button>
          {error && <span>{error}</span>}
          <Link to="/register">{"Don't"} you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Login;
