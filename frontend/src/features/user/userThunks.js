import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseurl = import.meta.env.VITE_BASE_URL;
axios.defaults.withCredentials = true;

export const signup = createAsyncThunk("auth/signup", async (payload) => {
  const res = await axios.post(`${baseurl}/api/user/signup`, payload);
  return res.data;
});

export const getLogin = createAsyncThunk("auth/checkLogin", async () => {
  const res = await axios.get(`${baseurl}/api/user/me`);
  return res.data;
});

export const login = createAsyncThunk("auth/login", async (payload) => {
  const res = await axios.post(`${baseurl}/api/user/login`, payload);
  return res.data;
});

export const logout = createAsyncThunk("auth/logout", async () => {
  const res = await axios.post(`${baseurl}/api/user/logout`);
  return res.data;
});
// D:\Web_Dev\backends\airbnb-clone frontend\src\features\user\userThunks.js
