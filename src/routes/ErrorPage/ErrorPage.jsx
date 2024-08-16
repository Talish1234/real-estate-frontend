import "./errorPage.scss";

function ErrorPage (){
    return (
    <div className="Error">
     <div className="container">

      <h1>
        Oops!
      </h1>
      <p>something went wrong</p>
     </div>
     <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>)
}
export default ErrorPage;