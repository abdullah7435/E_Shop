// Import the React library to use React components
import React from "react";
// Import the Wrapper component from the "@/components" directory
import Wrapper from "@/components/Wrapper";
// Import the Link component from "next/link"
import Link from "next/link";

// Define the Success functional component
const Success = () => {
  return (
    // Create a div element with the class "min-h-[650px]" and flex layout
    <div className="min-h-[650px] flex items-center">
      {/* Use the Wrapper component */}
      <Wrapper>
        {/* Create a div element with the class "max-w-[600px]", rounded corners, black border, padding of 5, and centered horizontally */}
        <div className="max-w-[600px] rounded-lg p-5 border border-black mx-auto flex flex-col">
          {/* Display the text "Thanks for shopping with us!" with a font size of 2xl and bold font weight */}
          <div className="text-2xl font-bold">Thanks for shopping with us!</div>
          {/* Display the text "Your order has been placed successfully." with a font size of lg and bold font weight */}
          <div className="text-lg font-bold mt-2">
            Your order has been placed successfully.
          </div>
          {/* Display the text "For any product related query, drop an email to" with a font size of base */}
          <div className="text-base mt-5">
            For any product related query, drop an email to
          </div>
          {/* Display the email address as an underlined text */}
          <div className="underline">shoeshopcontact@shop.com</div>

          {/* Create a link wrapped in the Link component that points to the homepage ("/") and has a font size of bold and margin-top of 5 */}
          <Link href="/" className="font-bold mt-5">
            Continue Shopping
          </Link>
        </div>
      </Wrapper>
    </div>
  );
};

// Export the Success component as the default export
export default Success;
