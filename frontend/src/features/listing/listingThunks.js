import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseurl = import.meta.env.VITE_BASE_URL;

axios.defaults.withCredentials = true;

export const fetchListings = createAsyncThunk("listings/fetch", async () => {
  console.log("Fetching listings...", baseurl);

  const res = await axios.get(`${baseurl}/api/listings`);
  console.log("Listings fetched:", res.data);
  return res.data;
});

export const getListing = createAsyncThunk("listings/getOne", async (id) => {
  console.log("Fetching listing...", baseurl, id);

  const res = await axios.get(`${baseurl}/api/listings/${id}`);
  console.log("Listing fetched:", res.data);

  return res.data;
});

export const addListing = createAsyncThunk("listings/add", async (formData) => {
  const res = await axios.post(`${baseurl}/api/listings`, formData);
  return res.data;
});

export const editListing = createAsyncThunk(
  "listings/edit",
  async ({ id, formData }) => {
    const res = await axios.put(`${baseurl}/api/listings/${id}`, formData);
    return res.data;
  },
);

export const destroyListing = createAsyncThunk(
  "listings/delete",
  async (id) => {
    const res = await axios.delete(`${baseurl}/api/listings/${id}`);
    return res.data;
  },
);

export const searchListings = createAsyncThunk(
  "listings/search",
  async (query) => {
    const res = await axios.get(`${baseurl}/api/listings/search?q=${query}`);
    return res.data;
  },
);
// D:\Web_Dev\backends\airbnb-clone frontend\src\features\listing\listingThunks.js