import Link from "next/link";
import React from "react";
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";
import Wrapper from "./Wrapper";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-3">
      {/* Footer container with background color, text color, and reduced padding top and bottom */}
      <Wrapper className="flex justify-center items-center flex-col md:flex-row gap-[5px] md:gap-0">
        {/* LEFT START */}
        <div className="text-[12px] text-white/[0.5] hover:text-white cursor-pointer text-center md:text-left">
          © 2025 E-Shop. All Rights Reserved {/* Copyright */}
        </div>
        {/* LEFT END */}
      </Wrapper>
    </footer>
  );
};

export default Footer;
