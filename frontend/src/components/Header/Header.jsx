import { useEffect, useState } from "react";
import { IoMenu, IoClose } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getLogin, logout } from "../../features/user/userThunks";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const { isAuthenticated, loading, err } = useSelector(state => state.auth);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;

    navigate(`/listings?q=${encodeURIComponent(search.trim())}`);
    setSearch("");
  };


  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(getLogin());
    }
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-white shadow-sm">
      <div className="mx-auto px-4">
        <div className="flex h-18 items-center justify-between md:text-lg lg:text-xl">

          <Link
            to="/listings"
            className="flex items-center transition-transform duration-200 hover:scale-103"
          >
            <img src="/H.png" alt="FeelLikeHome" className="w-10" />
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden hover:cursor-pointer text-gray-700 transition hover:text-red-500 active:scale-90"
            aria-label="Toggle menu"
          >
            {isOpen ? <IoClose size={35} /> : <IoMenu size={35} />}
          </button>

          <div className="hidden md:flex w-full items-center justify-between mx-3">

            <Link
              to="/listings"
              className="block rounded-md px-2 py-2 text-gray-700 transition hover:bg-gray-100"
            >
              Explore
            </Link>

            <form
              onSubmit={handleSearch}
              className="
                group flex items-center h-10
                border-2 border-gray-200
                rounded-full px-1
                transition
                hover:border-red-500
                focus-within:border-red-500
                focus-within:shadow-md
              "
            >
              <input
                type="text"
                placeholder="Search Destinations"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="
                  flex-1 h-full
                  text-gray-700
                  outline-none rounded-full
                  placeholder:text-gray-400
                "
              />

              <div
                onClick={handleSearch}
                className="
                  flex items-center justify-center
                  w-9 h-9 rounded-full
                  bg-red-500 text-white
                  transition
                  hover:bg-red-600
                  hover:scale-102
                  active:scale-95
                  cursor-pointer
                "
              >
                <FaSearch size={18} />
              </div>
            </form>

            <div className="flex items-center gap-4">
              <Link
                to="/listings/new"
                className="block rounded-md px-2 py-2 text-gray-700 transition hover:bg-gray-100"
              // 
              >
                Become a host
              </Link>

              {isAuthenticated ? (
                <Link
                  onClick={() => dispatch(logout())}
                  className="block rounded-md px-2 py-2 text-gray-700 transition hover:bg-gray-100"
                >
                  Log out
                </Link>) : (
                <>
                  <Link
                    to="/user/login"
                    className="text-gray-700 transition hover:text-red-500 hover:bg-gray-100"
                  >
                    Log in
                  </Link>
                  <Link
                    to="/user/signup"
                    className="
                  rounded-md bg-red-500 px-4 py-1.5
                  text-white
                  transition
                  hover:bg-red-600
                  hover:shadow-md
                  active:scale-95
                "
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t bg-white animate-fadeIn">
          <div className="space-y-3 px-4 py-4">

            <Link
              to="/listings"
              className="block rounded-md px-2 py-2 text-gray-700 transition hover:bg-gray-100 hover:cursor-pointer"
            >
              Explore
            </Link>
            <form onSubmit={handleSearch} className="flex hover:cursor-pointer">
              <input
                type="search"
                placeholder="  Search Destinations"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="
                  w-full rounded-l-md border border-gray-300
                  px-3 py-2 outline-none
                  focus:border-red-500
                "
              />
              <button type="submit"
                className="
                  rounded-r-md bg-red-500 px-4 text-white
                  transition hover:bg-red-600 active:scale-95 hover:cursor-pointer
                "
              >
                <FaSearch className="hover:cursor-pointer" />
              </button>
            </form>

            <Link
              to="/listings/new"
              className="block rounded-md px-2 py-2 text-gray-700 transition hover:bg-gray-100"
            >
              Become a host
            </Link>

            {isAuthenticated ? (
              <Link
                to="/user/logout"
                className="block rounded-md px-2 py-2 text-gray-700 transition hover:bg-gray-100"
              >
                Log out
              </Link>
            ) : (
              <>
                <Link
                  to="/user/login"
                  className="block rounded-md px-2 py-2 text-gray-700 transition hover:bg-gray-100"
                >
                  Log in
                </Link>

                <Link
                  to="/user/signup"
                  className="
                block rounded-md bg-red-500 px-3 py-2
                text-center text-white
                transition hover:bg-red-600 active:scale-95 cursor-pointer
              "
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

        </div>
      )}
    </nav>
  );
}

export default Header;
// D:\Web_Dev\backends\airbnb-clone frontend\src\components\Header\Header.jsx