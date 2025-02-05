// Importing necessary components and functions
import HeroBanner from "@/components/HeroBanner";
import ProductCard from "@/components/ProductCard";
import Wrapper from "@/components/Wrapper";
import { useEffect, useState } from "react";
import { fetchDataFromApi } from "@/utils/api";

// Defining the Home component
export default function Home({ products }) {
  return (
    <main>
      {/* Hero banner component */}
      <HeroBanner />

      <Wrapper>
        {/* Section with heading and paragraph */}
        <div className="text-center max-w-[800px] mx-auto my-[50px] md:my-[80px]">
          <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
          Your One-Stop Shop for Style and Sophistication
          </div>
          <div className="text-md md:text-xl">
          Discover Premium Shoes, Stylish Shirts, Captivating Perfumes, and Trendy Jackets – All in One Place!
          </div>
        </div>
        {/* End of heading and paragraph section */}

        {/* Section for displaying products in a grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
          {products?.data?.map((product) => (
            <ProductCard key={product?.id} data={product} />
          ))}
        </div>
        {/* End of products grid section */}
      </Wrapper>
    </main>
  );
}

// This function fetches data from the API and passes it as props to the Home component
export async function getStaticProps() {
  const products = await fetchDataFromApi("/api/products?populate=*");

  return {
    props: { products },
  };
}
