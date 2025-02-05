import React from "react"; // Importing React library for creating components
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Importing carousel styles
import { Carousel } from "react-responsive-carousel"; // Importing the Carousel component from react-responsive-carousel library

const ProductDetailsCarousel = ({ images }) => {
  return (
    // A container div for the carousel with some styling
    <div className="text-white text-[20px] w-full max-w-[1360px] mx-auto sticky top-[50px]">
      {/* The Carousel component from react-responsive-carousel */}
      <Carousel
        infiniteLoop={true} // Infinite loop for the carousel items
        showIndicators={false} // Hide the indicators that show the position of the current item
        showStatus={false} // Hide the status bar that shows current item number and total items
        thumbWidth={60} // Set the width of thumbnail images
        className="productCarousel" // Custom CSS class name for the Carousel component
      >
        {/* Mapping through the 'images' prop, which is an array of image objects */}
        {images?.map((img) => (
          // Each image in the array is displayed as a slide in the carousel
          <img
            key={img.id} // Using 'id' as the key for each image element (helps React efficiently update the DOM)
            src={img.attributes.url} // Image source URL
            alt={img.attributes.name} // Alternative text for the image
          />
        ))}
      </Carousel>
    </div>
  );
};

export default ProductDetailsCarousel; // Exporting the ProductDetailsCarousel component for use in other parts of the application
