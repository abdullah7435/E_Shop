// Import the React library
import React from "react";

// Define a functional component called Wrapper
// It accepts two props: "children" and "className"
const Wrapper = ({ children, className }) => {
  // Return JSX that represents the component's UI
  // The component wraps its children inside a <div> element
  // The div has CSS classes that define its appearance and layout
  // The "w-full" class sets the width to 100% of its container
  // The "max-w-[1280px]" class sets the maximum width to 1280px with responsive tailwind CSS syntax
  // The "px-5 md:px-10" classes set horizontal padding with responsive values
  // The "mx-auto" class centers the div horizontally in its container
  // The ${className || ""} part adds the value of the "className" prop, if provided, to the classes
  // The curly braces {children} represent the content that will be rendered inside the <div> element
  return (
    <div
      className={`w-full max-w-[1280px] px-5 md:px-10 mx-auto ${
        className || ""
      }`}
    >
      {children}
    </div>
  );
};

// Export the Wrapper component as the default export of this module
export default Wrapper;
