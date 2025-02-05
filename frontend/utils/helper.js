// Function to calculate the percentage discount between originalPrice and discountedPrice
export const getDiscountedPricePercentage = (
  originalPrice, // The original price of the product or item
  discountedPrice // The discounted price of the product or item
) => {
  // Calculate the discount amount by subtracting the discounted price from the original price
  const discount = originalPrice - discountedPrice;

  // Calculate the discount percentage by dividing the discount amount by the original price and then multiplying by 100
  const discountPercentage = (discount / originalPrice) * 100;

  // Return the discount percentage as a fixed string with two decimal places
  return discountPercentage.toFixed(2);
};
