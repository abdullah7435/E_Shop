// Importing the necessary function from "@reduxjs/toolkit" to configure the Redux store.
import { configureStore } from "@reduxjs/toolkit";

// Importing the cartSlice reducer from "./cartSlice" file.
import cartSlice from "./cartSlice";

// Configuring the Redux store with the cartSlice reducer.
export default configureStore({
  // Defining the root reducer using an object.
  reducer: {
    // Assigning the cartSlice reducer to the "cart" key in the root reducer.
    cart: cartSlice,
  },
});
