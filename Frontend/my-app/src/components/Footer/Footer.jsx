import React from 'react'
import './Footer.css'
const Footer = () => {
  return (
    <>
    <footer>
    <div className="row">
        <div className="col" >
        <img src="https://i.pinimg.com/750x/24/f1/04/24f1046135df5bbe488a2f452dfc1c39.jpg" alt="" className='logo'/>
        
        <p style={{color:"#ff6502"}}>धर्म-धर्मादर्थः प्रभवति धर्मात्प्रभवते सुखम् ।
        धर्मण लभते सर्वं धर्मप्रसारमिदं जगत् ॥
        
        </p>
        <p style={{color:"#ff6502"}}>हरि अनंत हरि कथा अनंता।
        कहहिं सुनहिं बहुबिधि सब संता॥
        रामचंद्र के चरित सुहाए।
        कलप कोटि लगि जाहिं न गाए॥</p>
        </div>




        <div className="col">
            <h3>Office <div className="underline"><span></span></div></h3>
            <p>Itpl Road</p>
            <p>whitefield bangalore</p>
            <p>Karanataka PIN 83768736,India</p>
            <p className="email-id">gyan@gmail.com</p>
            <h4>798375895</h4>
        </div>
        <div className="col">

            <h3>Links <div className="underline"><span></span></div></h3>
            <ul style={{paddingLeft:"0%"}}>
                <li><a href="">Home</a></li>
                <li><a href="">Services</a></li>
                <li><a href="">About Us</a></li>
                <li><a href="">Features</a></li>
                <li><a href="">Contact us</a></li>
            </ul>
        </div>
        <div className="col">

           <h3>NewsLetter <div className="underline"><span></span></div></h3>

           <form className='foooter-form' >
            <i className="far fa-envelope"></i>
            <input type="text" placeholder="Enter your Email id"/>
            <button type="submit"> <i className="far fa-arrow-right"></i></button>
           </form>
      <div className="social-icons">
        <i className="fab fa-facebook-f"></i>
        <i className="fab fa-twitter"></i>
        <i className="fab fa-whatsapp"></i>
        <i className="fab fa-pinterest"></i>

      </div>

        </div>
    </div>
    <hr/>
    <p className="copy-right">Made By Gyan Prakash Mishra</p>

</footer>


    
    </>
  )
}

export default Footer