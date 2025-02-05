import React, { useEffect, useState } from "react";
import Wrapper from "@/components/Wrapper";
import ProductCard from "@/components/ProductCard";
import { fetchDataFromApi } from "@/utils/api";
import useSWR from "swr";
import { useRouter } from "next/router";

const maxResult = 3;

const Category = ({ category, products, slug }) => {
  const [pageIndex, setPageIndex] = useState(1);
  const { query } = useRouter();

  useEffect(() => {
    // Reset the page index whenever the query changes (e.g., when navigating between pages)
    setPageIndex(1);
  }, [query]);

  // Fetch data from the API using the swr hook
  const { data, error, isLoading } = useSWR(
    `/api/products?populate=*&[filters][categories][slug][$eq]=${slug}&pagination[page]=${pageIndex}&pagination[pageSize]=${maxResult}`,
    fetchDataFromApi,
    {
      fallbackData: products, // Use the locally available products as fallback data while fetching
    }
  );

  if (error) {
    return <div>Failed to load products</div>; // Handle error gracefully
  }

  return (
    <div className="w-full md:py-20 relative">
      <Wrapper>
        <div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0">
          <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
            {/* Display the category name */}
            {category?.data?.[0]?.attributes?.name}
          </div>
        </div>

        {/* Products grid start */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
          {/* Map through the fetched data and render each product card */}
          {data?.data?.map((product) => (
            <ProductCard key={product?.id} data={product} />
          ))}
        </div>
        {/* Products grid end */}

        {/* Pagination buttons start */}
        {data?.meta?.pagination?.total > maxResult && (
          <div className="flex gap-3 items-center justify-center my-16 md:my-0">
            <button
              className={`rounded py-2 px-4 bg-black text-white disabled:bg-gray-200 disabled:text-gray-500`}
              disabled={pageIndex === 1}
              onClick={() => setPageIndex(pageIndex - 1)} // Go to the previous page
            >
              Previous
            </button>

            <span className="font-bold">{`${pageIndex} of ${data?.meta?.pagination?.pageCount}`}</span>

            <button
              className={`rounded py-2 px-4 bg-black text-white disabled:bg-gray-200 disabled:text-gray-500`}
              disabled={pageIndex === data?.meta?.pagination?.pageCount}
              onClick={() => setPageIndex(pageIndex + 1)} // Go to the next page
            >
              Next
            </button>
          </div>
        )}
        {/* Pagination buttons end */}

        {/* Show a loading overlay while fetching data */}
        {isLoading && (
          <div className="absolute top-0 left-0 w-full h-full bg-white/[0.5] flex flex-col gap-5 justify-center items-center">
            <img src="/logo.svg" width={150} />
            <span className="text-2xl font-medium">Loading...</span>
          </div>
        )}
      </Wrapper>
    </div>
  );
};

export default Category;

export async function getStaticPaths() {
  // Fetch all category data
  const category = await fetchDataFromApi("/api/categories?populate=*");

  // Ensure 'paths' is correctly formatted
  const paths = category?.data?.map((c) => ({
    params: {
      slug: c.attributes?.slug || "", // Use a fallback for slug if undefined
    },
  })) || []; // Fallback to an empty array if no categories are found

  return {
    paths,
    fallback: false, // Only pre-render paths returned here; others will 404
  };
}


// `getStaticProps` requires using `getStaticProps`
export async function getStaticProps({ params: { slug } }) {
  // Fetch category and products data for the specific slug from the API
  const category = await fetchDataFromApi(
    `/api/categories?filters[slug][$eq]=${slug}`
  );
  const products = await fetchDataFromApi(
    `/api/products?populate=*&[filters][categories][slug][$eq]=${slug}&pagination[page]=1&pagination[pageSize]=${maxResult}`
  );

  return {
    props: {
      category,
      products,
      slug,
    },
  };
}
