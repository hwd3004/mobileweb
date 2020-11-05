import React from "react";
import "../css/Footer.css";

const Footer = () => {
  return (
    <div id="Footer">
      <div className="footerDiv">
        <p>&copy; 닥터펫 {new Date().getFullYear()}</p>
      </div>
      <div className="footerDiv">
        <span>개인정보 보호방침</span>
      </div>
      <div className="footerDiv">
        <span>문의 사항</span>
        <span>광고 문의</span>
      </div>
    </div>
  );
};

export default Footer;
