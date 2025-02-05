// Import necessary modules
import React from "react";
import Wrapper from "@/components/Wrapper"; // Importing the Wrapper component from "@/components/Wrapper"
import Link from "next/link"; // Importing the Link component from "next/link"

// Define the functional component Failed
const Failed = () => {
    return (
        // A div container with minimum height of 650px, containing centered flex items
        <div className="min-h-[650px] flex items-center">
            {/* Wrapping the content with the Wrapper component */}
            <Wrapper>
                {/* A div container with maximum width of 600px, rounded corners, border, and flex column layout */}
                <div className="max-w-[600px] rounded-lg p-5 border border-black mx-auto flex flex-col">
                    {/* A text element with 2xl font size and bold styling */}
                    <div className="text-2xl font-bold">Payment failed!</div>
                    {/* A text element with base font size and margin top of 5 */}
                    <div className="text-base mt-5">
                        For any product related query, drop an email to
                    </div>
                    {/* An underline-styled text element displaying the email address */}
                    <div className="underline">customersupport@eshop.com</div>

                    {/* A Link component that serves as a clickable link to the homepage */}
                    <Link href="/" className="font-bold mt-5">
                        Continue Shopping
                    </Link>
                </div>
            </Wrapper>
        </div>
    );
};

// Export the Failed component as the default export of this module
export default Failed;
