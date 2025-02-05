import React, { useState, useEffect } from "react";
import Wrapper from "./Wrapper";
import Link from "next/link";
import Menu from "./Menu";
import MenuMobile from "./MenuMobile";

import { IoMdHeartEmpty } from "react-icons/io";
import { BsCart } from "react-icons/bs";
import { BiMenuAltRight } from "react-icons/bi";
import { VscChromeClose } from "react-icons/vsc";
import { fetchDataFromApi } from "@/utils/api";
import { useSelector } from "react-redux";

// test
import { Button, Space } from "antd";
import { CgWebsite, CgShoppingCart } from "react-icons/cg";
import { useRouter } from "next/router";
import { useAuthContext } from "../components/context/AuthContext";
import { removeToken } from "../helpers";

const Header = () => {
  // State variables to manage the header's behavior
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showCatMenu, setShowCatMenu] = useState(false);
  const [show, setShow] = useState("translate-y-0"); // CSS class for header animation
  const [lastScrollY, setLastScrollY] = useState(0); // Store last scroll position
  const [categories, setCategories] = useState(null); // Store fetched categories from API

  // Access the cart items from the Redux store
  const { cartItems } = useSelector((state) => state.cart);

  // Function to control header animation on scroll
  const controlNavbar = () => {
    if (window.scrollY > 200) {
      // If the user has scrolled down, hide the header when scrolling down
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("-translate-y-[80px]"); // Hide the header using a CSS transform
      } else {
        setShow("shadow-sm"); // Show a shadow on the header when scrolling up
      }
    } else {
      setShow("translate-y-0"); // Show the header normally if not scrolled down enough
    }
    setLastScrollY(window.scrollY);
  };

  // test
  const { user, setUser } = useAuthContext();
  const [loggedIn, setLoggedIn] = useState(!!user);
  const router = useRouter();

  const handleLogout = () => {
    setUser(null);
    removeToken();
    // window.location.reload();
    router.push("/");
  };
  //

  useEffect(() => {
    // Add scroll event listener when the component mounts
    window.addEventListener("scroll", controlNavbar);
    return () => {
      // Remove the scroll event listener when the component unmounts
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]); // Run this effect whenever 'lastScrollY' changes

  useEffect(() => {
    // Fetch categories from the API when the component mounts
    fetchCategories();
  }, []);

  // test
  useEffect(() => {
    // Add the user logout status to the dependency array
    // So that the header component updates when the user logs out
    setLoggedIn(!!user); // Update the logged-in status when the user object changes
  }, [user]);

  // Function to fetch categories from the API
  const fetchCategories = async () => {
    const response = await fetchDataFromApi("/api/categories?populate=*");
  
    console.log("API Response:", response);  // Debugging
    
    if (!response || !response.data) {
      console.error("No data received from API");
      return;
    }
  
    setCategories(response.data);
  };

  return (
    <header
      className={`w-full h-[50px] md:h-[80px] bg-white flex items-center justify-between z-20 sticky top-0 transition-transform duration-300 ${show}`}
    >
      <Wrapper className="h-[60px] flex justify-between items-center">
        <Link href="/">
          <img src="/logo.svg" className="w-[40px] md:w-[60px]" />
        </Link>

        <Menu
          showCatMenu={showCatMenu}
          setShowCatMenu={setShowCatMenu}
          categories={categories}
        />

        {mobileMenu && (
          <MenuMobile
            showCatMenu={showCatMenu}
            setShowCatMenu={setShowCatMenu}
            setMobileMenu={setMobileMenu}
            categories={categories}
          />
        )}

        {/* Add navigation links for Signup, Login, and Logout */}
        <div className="flex items-center gap-4">
          <Space className="header_space">
            <Space className="auth_buttons">
              {user ? (
                <>
                  <Button className="auth_button_login" href="/profile" type="link">
                    {user?.username}
                  </Button>
                  <Button
                    className="auth_button_signUp"
                    type="primary"
                    onClick={handleLogout}
                    style={{ backgroundColor: "#1890ff" }}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button className="auth_button_login" href="/login" type="link">
                    Login
                  </Button>
                  <Button className="auth_button_signUp" href="/signup" type="primary">
                    SignUp
                  </Button>
                </>
              )}
            </Space>
          </Space>

          {/* Cart Icon */}
          <Link href="/cart">
            <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:bg-black/[0.05] cursor-pointer relative">
              <BsCart className="text-[15px] md:text-[20px]" />
              {cartItems.length > 0 && (
                <div className="h-[14px] md:h-[18px] min-w-[14px] md:min-w-[18px] rounded-full bg-red-600 absolute top-1 left-5 md:left-7 text-white text-[10px] md:text-[12px] flex justify-center items-center px-[2px] md:px-[5px]">
                  {cartItems.length}
                </div>
              )}
            </div>
          </Link>

          {/* Mobile Menu Icon */}
          <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex md:hidden justify-center items-center hover:bg-black/[0.05] cursor-pointer relative -mr-2">
            {mobileMenu ? (
              <VscChromeClose
                className="text-[16px]"
                onClick={() => setMobileMenu(false)}
              />
            ) : (
              <BiMenuAltRight
                className="text-[20px]"
                onClick={() => setMobileMenu(true)}
              />
            )}
          </div>
        </div>
      </Wrapper>
    </header>
  );
};

export default Header;
