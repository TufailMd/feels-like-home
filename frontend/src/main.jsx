import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import './index.css'
import { lazy, Suspense } from "react"
import App from './App.jsx'
import store from './app/store.js'
import { Provider } from 'react-redux'

const Listings = lazy(() => import("./components/Listings.jsx"))
const Listing = lazy(() => import("./components/Listing.jsx"))
const ListingForm = lazy(() => import("./components/ListingForm.jsx"))
const Login = lazy(() => import("./components/user/Login.jsx"))
const Signup = lazy(() => import("./components/user/Signup.jsx"))

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Listings />} />
      <Route path='listings' element={<Listings />} />
      <Route path='listings/:id' element={<Listing />} />
      <Route path='listings/new' element={<ListingForm />} />
      <Route path='listings/:id/edit' element={<ListingForm />} />
      <Route path='user/login' element={<Login />} />
      <Route path='user/signup' element={<Signup />} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
)
// D:\Web_Dev\backends\airbnb-clone frontend\src\main.jsx