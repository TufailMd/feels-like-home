import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseurl = import.meta.env.VITE_BASE_URL;
axios.defaults.withCredentials = true;

export const addReview = createAsyncThunk(
  "reviews/add",
  async ({ id, review }) => {
    console.log("ADD review call");

    const res = await axios.post(
      `${baseurl}/api/listings/${id}/reviews`,
      review,
    );
    console.log("ADD review call done");
    return res.data;
  },
);

export const deleteReview = createAsyncThunk(
  "reviews/delete",
  async ({ id, reviewId }) => {
    console.log("ADD review call");
    console.log(reviewId);
    const res = await axios.delete(
      `${baseurl}/api/listings/${id}/reviews/${reviewId}`,
    );
    console.log("ADD review call done");
    return res.data;
  },
);
// D:\Web_Dev\backends\airbnb-clone frontend\src\features\review\reviewThunks.js