import React from "react";
import "../css/footer.css";







import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faGoogle, faDribbble, faSkype } from "@fortawesome/free-brands-svg-icons";





const Footer = () => {
  return (
    <footer className="footer">
      <div className="social-btns">
        <a href="#" className="btn facebook">
        <FontAwesomeIcon icon={faFacebook} style={{ color: "#74C0FC" }} />
        </a>
        <a href="#" className="btn twitter">
          <FontAwesomeIcon icon={faTwitter} style={{ color: "#1DA1F2" }} />
        </a>
        <a href="#" className="btn google">
          <FontAwesomeIcon icon={faGoogle} style={{ color: "#DB4437" }} />
        </a>
        <a href="#" className="btn dribbble">
          <FontAwesomeIcon icon={faDribbble} style={{ color: "#EA4C89" }} />
        </a>
        <a href="#" className="btn skype">
          <FontAwesomeIcon icon={faSkype} style={{ color: "#00AFF0" }} />
        </a>
      </div>
      <ul className="menu">
        <li className="menu__item"><a className="menu__link" href="#">Home</a></li>
        <li className="menu__item"><a className="menu__link" href="#">About</a></li>
        <li className="menu__item"><a className="menu__link" href="#">Services</a></li>
        <li className="menu__item"><a className="menu__link" href="#">Team</a></li>
        <li className="menu__item"><a className="menu__link" href="#">Contact</a></li>
      </ul>

      <p>&copy;2024 All Rights Reserved</p>
    </footer>
  );
};




export default Footer;





// const sites = ["facebook", "twitter", "google", "dribbble", "skype"];

// const Footer: React.FC = () => {
//   return (
//     <footer className="footer">
//       <div className="social-btns">
//         {sites.map((site) => (
//           <a href="#" className={`btn ${site}`} key={site}>
//             <i className={`fa fa-${site}`} aria-hidden="true"></i>
//           </a>
//         ))}
//       </div>

//       <p>&copy;2021 Nadine Coelho | All Rights Reserved</p>

      
//     </footer>
   
//   );
// };




// const Footer: React.FC = () => {
//   return (
//     <>
//       <footer className="footer">
//         <div className="waves">
//           <div className="wave" id="wave1"></div>
//           <div className="wave" id="wave2"></div>
//           <div className="wave" id="wave3"></div>
//           <div className="wave" id="wave4"></div>
//         </div>

//         <ul className="social-icon">
//           <li className="social-icon__item">
//             <a className="social-icon__link" href="#">
//               <ion-icon name="logo-facebook"></ion-icon>
//             </a>
//           </li>
//           <li className="social-icon__item">
//             <a className="social-icon__link" href="#">
//               <ion-icon name="logo-twitter"></ion-icon>
//             </a>
//           </li>
//           <li className="social-icon__item">
//             <a className="social-icon__link" href="#">
//               <ion-icon name="logo-linkedin"></ion-icon>
//             </a>
//           </li>
//           <li className="social-icon__item">
//             <a className="social-icon__link" href="#">
//               <ion-icon name="logo-instagram"></ion-icon>
//             </a>
//           </li>
//         </ul>

//         <ul className="menu">
//           <li className="menu__item"><a className="menu__link" href="#">Home</a></li>
//           <li className="menu__item"><a className="menu__link" href="#">About</a></li>
//           <li className="menu__item"><a className="menu__link" href="#">Services</a></li>
//           <li className="menu__item"><a className="menu__link" href="#">Team</a></li>
//           <li className="menu__item"><a className="menu__link" href="#">Contact</a></li>
//         </ul>

//         <p>&copy;2024  | All Rights Reserved</p>
//       </footer>
//     </>
//   );
// };


