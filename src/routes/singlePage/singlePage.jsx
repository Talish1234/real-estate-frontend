import "./singlePage.scss";
import Slider from "../../components/slider/Slider";
import Map from "../../components/map/Map";
import { singlePostData, userData} from "../../lib/dummydata";
import { useLoaderData, useNavigate } from "react-router-dom";
import DOMPurify from 'dompurify';
import {SocketContext} from './../../context/SocketContext';
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from './../../lib/apiRequest'

import {format} from 'timeago.js';
function SinglePage() {
    const post =  useLoaderData();
    const {currentUser} = useContext(AuthContext);
    const [isSaved,setIsSaved] = useState(post.isSaved);
    const [chat,setChat] = useState(null);

    const navigate = useNavigate();
    const { socket } = useContext(SocketContext);

    const messageEndRef = useRef();
    useEffect(() => {
      messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chat]);

    const handleSave = async () => {
      try{

       setIsSaved(prev => !prev);
       await apiRequest.post('/users/save',{postId: post.id});
       
      }catch(err){
        setIsSaved(prev => !prev);
      }
    }    

    const handleChat = async () => {
      const res = await apiRequest.get('/chats/find/'+post.user.id);
      if(!res.data.chat.length){
      const addchat = await apiRequest.post('/chats',{receiverId:post.user.id})
      
      const res = await apiRequest.get('/chats/'+addchat.data.newChat.id)
      setChat({ ...res.data})
      
      }
      else{
      const temp = await apiRequest.get('/chats/'+res.data.chat[0].id)
      setChat({ ...temp.data})
      }
    }

    
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const text = formData.get("text");

    if (!text) return;
    try {
      const res = await apiRequest.post("/message/" + chat.id, { text });
      setChat((prev) => ({ ...prev, messages: [...prev.messages, res.data] }));
      e.target.reset();
      socket.emit("sendMessage", {
        receiverId: chat.receiver.id,
        data: res.data,
      });
    } catch (err) {
    }
  };

  useEffect(() => {
    const read = async () => {
      try {
        await apiRequest.put("/chats/read/" + chat.id);
      } catch (err) {
      }
    };

    if (chat && socket) {
      socket.on("getMessage", (data) => {
        if (chat.id === data.chatId) {
          setChat((prev) => ({ ...prev, messages: [...prev.messages, data] }));
          read();
        }
      });
    }
    return () => {
      socket.off("getMessage");
    };
  }, [socket, chat]);
  return (
    <div className="singlePage">
      <div className="details remove">
        <div className="wrapper">
          <Slider images={post.img} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{post.title}</h1>
                <div className="address">
                  <img src="/pin.png" alt="" />
                  <span>{post.address}</span>
                </div>
                <div className="price">Rs {post.price}</div>
              </div>
              <div className="user">
                <img src={post.user.avatar} alt="" />
                <span>{post.user.username}</span>
              </div>
            </div>
            <div className="bottom" dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(post.postDetails.desc)
            }}></div>
          </div>
        </div>
      </div>

      <div className="features">
        <div className="wrapper" style={{display:!chat?"":"none"}}>
          <p className="title">General</p>
          <div className="listVertical">
            <div className="feature">
              <img src="/utility.png" alt="" />
              <div className="featureText">
                <span>Utilities</span>
                {post.postDetails.utilities === "owner"?<p>Owner is responsible</p>:<p>Renant is responsible</p>}
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featureText">
                <span>Pet Policy</span>
                {post.postDetails.pet == "allowed"?<p>Pet Allowed</p>:<p>Not Allowed</p>}
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Property Fees</span>
                <p>{post.postDetails.income}</p>
              </div>
            </div>
          </div>
          <p className="title">Sizes</p>
          <div className="sizes">
            <div className="size">
              <img src="/size.png" alt="" />
              <span>{post.postDetails.size} sqft</span>
            </div>
            <div className="size">
              <img src="/bed.png" alt="" />
              <span>{post.bedroom} beds</span>
            </div>
            <div className="size">
              <img src="/bath.png" alt="" />
              <span>{post.bathroom} bathroom</span>
            </div>
          </div>
          <p className="title">Nearby Places</p>
          <div className="listHorizontal">
            <div className="feature">
              <img src="/school.png" alt="" />
              <div className="featureText">
                <span>School</span>
                <p>{post.postDetails.school}m away</p>
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featureText">
                <span>Bus Stop</span>
                <p>{post.postDetails.bus}m away</p>
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Restaurant</span>
                <p>{post.postDetails.restaurant}m away</p>
              </div>
            </div>
          </div>
          <p className="title">Location</p>
          <div className="mapContainer">
            <Map items={[post]}/>
          </div>


          <div className="buttons">
            <button onClick={handleChat}>
              <img src="/chat.png" alt="" />
              Send a Message
            </button>
            <button onClick={handleSave} style={isSaved?{backgroundColor:"#fece51"}:{backgroundColor:"#fff"}}>
              <img src="/save.png" alt="" />
              {isSaved?"Place is Saved":"Save the Place"}
            </button>
          </div>

        </div>
        {chat &&  <div className="chatBox"  style={{display:chat?"block":"none"}}>
          <div className="top">
            <div className="user">
              <img src={post.user.avatar} alt="" />
              {post.user.username}
            </div>
            <span className="close" onClick={() => setChat(null)}>
              X
            </span>
          </div>
          <div className="center">
            {chat.messages.map((message) => (
              <div
                className="chatMessage"
                style={{
                  alignSelf:
                    message.userId === currentUser.id
                      ? "flex-end"
                      : "flex-start",
                  textAlign:
                    message.userId === currentUser.id ? "right" : "left",
                }}
                key={message.id}
              >
                <p>{message.text}</p>
                <span>{format(message.createdAt)}</span>
              </div>
            ))}
            <div ref={messageEndRef}></div>
          </div>
          <form onSubmit={handleSubmit} className="bottom">
            <textarea name="text"></textarea>
            <button>Send</button>
          </form>
        </div>
}
      </div>

    </div>
  );
}

export default SinglePage;
