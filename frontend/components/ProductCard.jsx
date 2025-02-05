// Import necessary modules and functions
import { getDiscountedPricePercentage } from "@/utils/helper";
import Image from "next/image";
import Link from "next/link";
import React from "react";

// Define the ProductCard component
const ProductCard = ({ data: { attributes: p, id } }) => {
  return (
    // Create a link that navigates to the product's page when clicked
    <Link
      href={`/product/${p.slug}`}
      className="transform overflow-hidden bg-white duration-200 hover:scale-105 cursor-pointer"
    >
      {/* Display the product's thumbnail using Next.js Image component */}
      <Image
        width={500}
        height={500}
        src={p.thumbnail.data.attributes.url}
        alt={p.name}
      />
      {/* Display product information */}
      <div className="p-4 text-black/[0.9]">
        {/* Display the product's name */}
        <h2 className="text-lg font-medium">{p.name}</h2>
        <div className="flex items-center text-black/[0.5]">
          {/* Display the product's price */}
          <p className="mr-2 text-lg font-semibold">&pound;{p.price}</p>
          {/* If the product has an original price, display the discounted price */}
          {p.original_price && (
            <>
              {/* Display the original price with a line-through */}
              <p className="text-base font-medium line-through">
              &pound;{p.original_price}
              </p>
              {/* Display the discounted price percentage and "off" text */}
              <p className="ml-auto text-base font-medium text-green-500">
                {getDiscountedPricePercentage(p.original_price, p.price)}% off
              </p>
            </>
          )}
        </div>
      </div>
    </Link>
  );
};

// Export the ProductCard component as the default export of this module
export default ProductCard;
