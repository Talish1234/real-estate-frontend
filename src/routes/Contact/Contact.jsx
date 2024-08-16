import "./contact.scss";

function ContactPage() {
 
  return (
    <div className="about">
      <div className="textContainer">
        <div className="wrapper">
          <h1 className="title">Contact Us</h1>
          <p>
          We’re here to help! Whether you have a question about a listing, need assistance with your account, or just want to learn more about our services, our team is ready to assist you.
          </p>
          <h2> Get in Touch</h2>
          <h3>Customer Support</h3>
          <ul>
            <li>Email: support@talish.com</li>
            <li>Phone: +9898981010</li>
            <li>Hours: Monday - Friday, 9 AM - 6 PM</li>
          </ul>

          <h3>Sales Inquiries</h3>
          <ul>
            <li>Email: sales@talish.com</li>
            <li>Phone: +9898981010</li>
            <li>Hours: Monday - Friday, 9 AM - 6 PM</li>
          </ul>

          <h3>Technical Support</h3>
          <ul>
            <li>Email:  techsupport@talish.com</li>
            <li>Phone: +9898981010</li>
            <li>Hours: Monday - Friday, 9 AM - 6 PM</li>
          </ul>
          <h2>Visit Us</h2>
          <h3>Office Address</h3>
          <ul>
            <li>PropertyPulse</li>
            <li>A-26, Connaught Place</li>
            <li>New Delhi, Delhi 110001</li>
            <li>India</li>
          </ul>
        </div>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default ContactPage;