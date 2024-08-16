import { Await, Link, useLoaderData, useNavigate } from "react-router-dom";
import Chat from "../../components/chat/Chat";
import List from "../../components/list/List";
import apiRequest from "../../lib/apiRequest";
import "./profilePage.scss";
import { Suspense, useContext, useState} from "react";
import { AuthContext } from "../../context/AuthContext";

function ProfilePage() {
  const {response,chatResponse} = useLoaderData();
  const navigate = useNavigate();
  const {updateUser,currentUser} = useContext(AuthContext);
  const handleLogout = async (e) => {
    e.preventDefault();
    try{ 
    await apiRequest.post('auth/logout');
    updateUser(null);
    navigate('/');
    }catch(err){
    }
  }
  
  const [active,setActive] = useState('List');
  const handleClick1 = () => {
    setActive('List');
  }
  const handleClick2 = () => {
    setActive('Save');
  }
  return (<div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <Link to='/profile/update'>
            <button>Update Profile</button>
            </Link>
          </div>
          <div className="info">
            <span>
              Avatar:
              <img
                src={currentUser.avatar}
                alt=""
              />
            </span>
            <span>
              Username: <b>{currentUser.username}</b>
            </span>
            <span>
              E-mail: <b>{currentUser.email}</b>
            </span>
            <button onClick={handleLogout}>Logout</button>
          </div>
          <div className="title">
            <div className="selection">
            <h1 className={active == 'List'?"active":""} onClick={handleClick1}>My List</h1>
            <h1 className={active == 'Save'?"active":""} onClick={handleClick2}>Save List</h1>
            </div>
            <button><Link to='/add'>Create New Post</Link></button>
          </div>
          {
          active == 'List' && <Suspense fallback={<p>Loading ...</p>}>
        <Await resolve={response}>
         
          {(items) => (<List items={items.data.userPosts}/>)}
        </Await>
      </Suspense>
        }
        {
          active == 'Save' && <Suspense fallback={<p>loading data ...</p>}>
           <Await resolve={response}>
            
             {(items) => (<List items={items.data.savePost}/>)}
           </Await>
         </Suspense>
        }
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
        <Suspense fallback={<p>loading data ...</p>}>
           <Await resolve={chatResponse}>
            
             {(items) => (<Chat chats={items.data}/>)}
           </Await>
         </Suspense>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
