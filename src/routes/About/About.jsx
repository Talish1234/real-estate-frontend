import "./about.scss";

function AboutPage() {
 
  return (
    <div className="about">
      <div className="textContainer">
        <div className="wrapper">
          <h1 className="title">About Us</h1>
          <p>
          Welcome to PropertyPulse, your trusted partner in real estate. Whether you’re buying, selling, or renting, our platform is designed to provide a seamless and personalized experience. We understand that real estate decisions are some of the most significant in life, and we're here to help you make informed choices with confidence.
          </p>
          <h2>Our Mission</h2>
          <p>
          Our mission is to revolutionize the real estate experience by leveraging the latest technology and a customer-first approach. We aim to make the process of finding your dream home or the perfect investment property as easy and enjoyable as possible.
          </p>

          <h2>Why Choose Us?</h2>
          <p><strong>Comprehensive Listings:</strong> We offer a vast selection of properties, from cozy apartments to luxury estates, ensuring that you can find exactly what you're looking for.
          </p>

          <p><strong>User-Friendly Interface:</strong> Our platform is designed with you in mind. Navigate through listings, filter by your preferences, and get all the details you need at your fingertips.
          </p>
          <p><strong>Trusted Expertise:</strong> With years of experience in the real estate market, our team of professionals is dedicated to providing you with reliable information and support.
          </p>
          <p><strong>Secure Transactions:</strong> We prioritize your security with advanced data protection measures, ensuring your personal information and transactions are safe.</p>
          <h2>Our Vision</h2>
          <p>We envision a future where real estate transactions are as transparent, efficient, and stress-free as possible. By continuously innovating and improving our services, we strive to set new standards in the real estate industry.
          </p>
          <h2>Join Us Today</h2>
          <p>Explore our listings, connect with our experts, and take the next step towards finding your perfect property. At PropertyPulse, we're more than just a real estate platform—we're your partner in making your real estate dreams come true.
          </p>    
        </div>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default AboutPage;
