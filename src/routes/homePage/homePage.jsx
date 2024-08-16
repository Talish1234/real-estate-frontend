import { useContext } from "react";
import SearchBar from "../../components/searchBar/SearchBar";
import "./homePage.scss";
import { AuthContext } from "../../context/AuthContext";

function HomePage() {
  const {currentUser} = useContext(AuthContext);
 
  return (
    <div className="homePage">
      <div className="textContainer">
        <div className="wrapper">
          <h1 className="title">Find Your Dream Home with Real-Time Guidance</h1>
          <p>
          Discover your perfect property with our innovative real estate platform. We connect buyers, sellers, and renters with a comprehensive range of listings, from cozy apartments to luxurious estates. Our unique real-time chat feature ensures instant communication with agents and property owners, making your search seamless and efficient. Start exploring today and take the first step towards your next home!
          </p>
          <SearchBar />
          <div className="boxes">
            <div className="box">
              <h1>16+</h1>
              <h2>Years of Experience</h2>
            </div>
            <div className="box">
              <h1>200</h1>
              <h2>Award Gained</h2>
            </div>
            <div className="box">
              <h1>2000+</h1>
              <h2>Property Ready</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default HomePage;
