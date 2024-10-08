import { useContext, useState } from "react";
import "./profileUpdatePage.scss";
import {useNavigate} from 'react-router-dom';
import { AuthContext } from "../../context/AuthContext";
import apiRequest from './../../lib/apiRequest'
import UploadWidget from "../../components/uplodeWidget/uplodeWidget";
function ProfileUpdatePage() {
  const {updateUser,currentUser} = useContext(AuthContext);
  const [error,setError] = useState("");
  const [isLoading,setIsLoading] = useState(false);
  const [avatar,setAvatar] = useState(currentUser.avatar);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const {username,email,password} = Object.fromEntries(formData);
  try {
  setIsLoading(true);
  const user = await apiRequest.put(`/users/${currentUser.id}`,{username,email,password,avatar})

  updateUser(user.data.user);
  navigate('/profile');
  } catch (err) {
  setError("something Went wrong");
  }
  finally{
    setIsLoading(false);
  }
  }

  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Update Profile</h1>
          <div className="item">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              defaultValue={currentUser.username}
            />
          </div>
          <div className="item">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={currentUser.email}
            />
          </div>
          <div className="item">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" />
          </div>
          {error && <span>{error}</span>}
          <button disabled={isLoading}>Update</button>
        </form>
      </div>
      <div className="sideContainer">
        <img src={avatar} alt="" className="avatar" />
        <UploadWidget uwConfig={{
    cloudName: "dwvvhxbgy",
    uploadPreset: "estate",
    multiple: false,
    maxImageFileSize: 2000000,
    folder: "avatar",
  }} setAvatar = {setAvatar}/>
      </div>
    </div>
  );
}

export default ProfileUpdatePage;
