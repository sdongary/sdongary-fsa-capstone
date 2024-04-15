import './Footer.css'
import footer_logo from '../Assets/logo_big.png'
import instagram_icon from '../Assets/instagram_icon.png'
import twitterx_icon from '../Assets/twitterx_icon.png'
import facebook_icon from '../Assets/facebook_icon.png'
import snapchat_icon from '../Assets/snapchat_icon.png'

const Footer = () => {
  return(
    <div className='footer'>
      <div className='footer-logo'>
        <img src={footer_logo} alt="" />
        <p>SHOPPER</p>
      </div>
      <ul className='footer-links'>
        <li>Company</li>
        <li>Products</li>
        <li>Offices</li>
        <li>About Us</li>
        <li>Contact</li>
      </ul>

      <div className='footer-social-icon'>
        <div className='footer-icons-container'>
          <img src={instagram_icon} alt="" />
        </div>
        <div className='footer-icons-container'>
          <img src={twitterx_icon} alt="" />
        </div>
        <div className='footer-icons-container'>
          <img src={facebook_icon} alt="" />
        </div>
        <div className='footer-icons-container'>
          <img src={snapchat_icon} alt="" />
        </div>
      </div>
      <div className='footer-copyright'>
        <hr />
        <p>Copyright @2024 - All Rights Reserved.</p>
      </div>
    </div>
  )
}

export default Footer