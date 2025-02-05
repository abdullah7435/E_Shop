// Import the React library to use React components
import React from "react";
// Import the Wrapper component from the "@/components" directory
import Wrapper from "@/components/Wrapper";
// Import the Link component from "next/link"
import Link from "next/link";

// Define the Contact functional component
const Contact = () => {
  return (
    // Create a div element with the class "min-h-[650px]" and flex layout
    <div className="min-h-[650px] flex items-center">
      {/* Use the Wrapper component */}
      <Wrapper>
        {/* Create a div element with the class "max-w-[600px]", rounded corners, black border, padding of 5, and centered horizontally */}
        <div className="max-w-[600px] rounded-lg p-5 border border-black mx-auto flex flex-col">
          {/* Display the text "Thanks for shopping with us!" with a font size of 2xl and bold font weight */}
          <div className="text-2xl font-bold">Contact Us</div>
          {/* Display the text "Your order has been placed Contactfully." with a font size of lg and bold font weight */}
          <div className="text-lg font-bold mt-2">Who We Are</div>
          {/* Display the text "For any product related query, drop an email to" with a font size of base */}
          <div className="text-base mt-5">
            We are energetic Contact discovering things that transcend the
            commonplace; that we think will get your attention and capture it.
            In addition, to convey these to you wherever you are and at whatever
            point you believe you have sufficient energy to enjoy a bit. So we
            made an organization to bring you items you will become hopelessly
            enamored with; to allow you to make your very own space, to take
            advantage of those concealed abilities and make your own looks and
            accumulations; to enable you to impart your manifestations to
            companions to understand that second conclusion, to move or be
            enlivened; and to enable you to shop such that you will discover
            hypnotizing. We like to consider ‘Eshop’ as the advanced
            age likeness the sixteenth Century Grand Trunk Road, an expressway
            that changed the essence of exchange the US subcontinent.
          </div>
          {/* Display the email address as an underlined text */}
          <div className="underline">shoeshopcontact@shop.com</div>

          {/* Create a link wrapped in the Link component that points to the homepage ("/") and has a font size of bold and margin-top of 5 */}
          {/* <Link href="/" className="font-bold mt-5">
            Continue Shopping
          </Link> */}
        </div>
      </Wrapper>
    </div>
  );
};

// Export the Contact component as the default export
export default Contact;
