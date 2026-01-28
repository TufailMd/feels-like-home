import { configureStore } from "@reduxjs/toolkit";
import listingReducer from "../features/listing/listingSlice";
import authReducer from "../features/user/userSlice";
import reviewsReducer from "../features/review/reviewSlice";

export const store = configureStore({
  reducer: {
    listings: listingReducer,
    auth: authReducer,
    reviews: reviewsReducer,
  },
});

export default store;
// D:\Web_Dev\backends\airbnb-clone frontend\src\app\store.js