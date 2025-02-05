// Importing necessary modules and components from React and other libraries
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProductCard from "./ProductCard";

// Defining a functional component called RelatedProducts that takes 'products' as a prop
const RelatedProducts = ({ products }) => {
  // Configuring responsive settings for the Carousel component
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1023, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 767, min: 0 },
      items: 1,
    },
  };

  return (
    // Main container for the related products section with some responsive styling classes
    <div className="mt-[50px] md:mt-[100px] mb-[100px] md:mb-0">
      {/* Section title */}
      <div className="text-2xl font-bold mb-5">You Might Also Like</div>

      {/* Carousel component that displays the related products */}
      <Carousel
        responsive={responsive} // Pass the responsive settings to the Carousel component
        containerClass="-mx-[10px]" // Styling class to control the container's horizontal margins
        itemClass="px-[10px]" // Styling class to control each item's horizontal padding
      >
        {/* Loop through the products data and render a ProductCard for each product */}
        {products?.data?.map((product) => (
          <ProductCard key={product?.id} data={product} /> // Passing the product data as props to the ProductCard component
        ))}
      </Carousel>
    </div>
  );
};

// Exporting the RelatedProducts component as the default export
export default RelatedProducts;
