import React, { useState } from "react";
import { IoMdHeartEmpty } from "react-icons/io";
import Wrapper from "@/components/Wrapper";
import ProductDetailsCarousel from "@/components/ProductDetailsCarousel";
import RelatedProducts from "@/components/RelatedProducts";
import { fetchDataFromApi } from "@/utils/api";
import { getDiscountedPricePercentage } from "@/utils/helper";
import ReactMarkdown from "react-markdown";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/cartSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetails = ({ product, products }) => {
  const [selectedSize, setSelectedSize] = useState();
  const [showError, setShowError] = useState(false);
  const dispatch = useDispatch();
  const p = product?.data?.[0]?.attributes || {}; // Safely access attributes

  const notify = () => {
    toast.success("Success. Check your cart!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    });
  };

  if (!product?.data?.length) {
    return <div>Product not found</div>; // Handle missing product gracefully
  }

  return (
    <div className="w-full md:py-20">
      <ToastContainer />
      <Wrapper>
        <div className="flex flex-col lg:flex-row md:px-10 gap-[50px] lg:gap-[100px]">
          {/* Left Column: Product Images */}
          <div className="w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-full mx-auto lg:mx-0">
            {p.image?.data?.length ? (
              <ProductDetailsCarousel images={p.image.data} />
            ) : (
              <div>No images available</div>
            )}
          </div>
          {/* Right Column: Product Details */}
          <div className="flex-[1] py-3">
            {/* Product Title */}
            <div className="text-[34px] font-semibold mb-2 leading-tight">
              {p.name || "No Product Name Available"}
            </div>

            {/* Product Subtitle */}
            <div className="text-lg font-semibold mb-5">{p.subtitle || ""}</div>

            {/* Product Price */}
            <div className="flex items-center">
              <p className="mr-2 text-lg font-semibold">
                Price: &pound;{p.price || "N/A"}
              </p>
              {p.original_price && (
                <>
                  <p className="text-base font-medium line-through">
                  &pound;{p.original_price}
                  </p>
                  <p className="ml-auto text-base font-medium text-green-500">
                    {getDiscountedPricePercentage(p.original_price, p.price)}% off
                  </p>
                </>
              )}
            </div>

            {/* Taxes Info */}
            <div className="text-md font-medium text-black/[0.5]">
              incl. of taxes
            </div>
            <div className="text-md font-medium text-black/[0.5] mb-20">
              (Also includes all applicable duties)
            </div>

            {/* Product Size Range */}
            <div className="mb-10">
              <div className="flex justify-between mb-2">
                <div className="text-md font-semibold">Select Size</div>
                <div className="text-md font-medium text-black/[0.5] cursor-pointer">
                  Size Guide
                </div>
              </div>

              <div id="sizesGrid" className="grid grid-cols-3 gap-2">
                {p.size?.data?.length ? (
                  p.size.data.map((item, i) => (
                    <div
                      key={i}
                      className={`border rounded-md text-center py-3 font-medium ${
                        item.enabled
                          ? "hover:border-black cursor-pointer"
                          : "cursor-not-allowed bg-black/[0.1] opacity-50"
                      } ${selectedSize === item.size ? "border-black" : ""}`}
                      onClick={() => {
                        setSelectedSize(item.size);
                        setShowError(false);
                      }}
                    >
                      {item.size}
                    </div>
                  ))
                ) : (
                  <div>No sizes available</div>
                )}
              </div>
              {showError && (
                <div className="text-red-600 mt-1">
                  Size selection is required
                </div>
              )}
            </div>

            {/* Add to Cart Button */}
            <button
              className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75"
              onClick={() => {
                if (!selectedSize) {
                  setShowError(true);
                  document.getElementById("sizesGrid").scrollIntoView({
                    block: "center",
                    behavior: "smooth",
                  });
                } else {
                  dispatch(
                    addToCart({
                      ...product?.data?.[0],
                      selectedSize,
                      oneQuantityPrice: p.price,
                    })
                  );
                  notify();
                }
              }}
            >
              Add to Cart
            </button>

            {/* Wishlist Button */}
            <button className="w-full py-4 rounded-full border border-black text-lg font-medium transition-transform active:scale-95 flex items-center justify-center gap-2 hover:opacity-75 mb-10">
              Wishlist
              <IoMdHeartEmpty size={20} />
            </button>

            {/* Product Description */}
            <div>
              <div className="text-lg font-bold mb-5">Product Details</div>
              <div className="markdown text-md mb-5">
                <ReactMarkdown>{p.description || "No description available"}</ReactMarkdown>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <RelatedProducts products={products} />
      </Wrapper>
    </div>
  );
};

export default ProductDetails;

// getStaticPaths for generating paths for product slugs
export async function getStaticPaths() {
  try {
    const products = await fetchDataFromApi("/api/products?populate=*");
    const paths =
      products?.data?.map((p) => ({
        params: {
          slug: p.attributes?.slug || "", // Ensure slug is present
        },
      })) || [];
    return { paths, fallback: false };
  } catch (error) {
    console.error("Error fetching product paths:", error);
    return { paths: [], fallback: false };
  }
}

// getStaticProps for fetching data for the current product and related products
export async function getStaticProps({ params: { slug } }) {
  try {
    const product = await fetchDataFromApi(
      `/api/products?populate=*&filters[slug][$eq]=${slug}`
    );
    const products = await fetchDataFromApi(
      `/api/products?populate=*&[filters][slug][$ne]=${slug}`
    );

    if (!product?.data?.length) {
      return { notFound: true };
    }

    return {
      props: { product, products },
    };
  } catch (error) {
    console.error("Error fetching product data:", error);
    return { notFound: true };
  }
}
