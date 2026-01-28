import Header from './components/Header/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/utils/ScrollToTop'
import PageLoader from './components/utils/PageLoader'
import { Outlet, useLocation } from 'react-router-dom'
import { Suspense } from 'react'

export default function App() {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen relative">

      <ScrollToTop />

      <Header />

      <div className='flex-1 pt-20 pb-10 bg-gray-50'>
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </div>

      <Footer />
    </div>
  )
}

// D:\Web_Dev\backends\airbnb-clone frontend\src\App.jsx
