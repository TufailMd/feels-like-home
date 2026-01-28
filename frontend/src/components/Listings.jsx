import { useLayoutEffect, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {
    FaFire,
    FaBed,
    FaMountain,
    FaUmbrellaBeach,
    FaTree,
    FaSnowflake,
    FaCity,
    FaCampground,
    FaWater,
    FaToggleOn,
    FaToggleOff, FaChevronLeft, FaChevronRight
} from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchListings, searchListings } from "../features/listing/listingThunks";
import PageLoader from "./utils/PageLoader";

const filters = [
    { label: "Trending", icon: <FaFire /> },
    { label: "Rooms", icon: <FaBed /> },
    { label: "Iconic Cities", icon: <FaCity /> },
    { label: "Beach", icon: <FaUmbrellaBeach /> },
    { label: "Mountains", icon: <FaMountain /> },
    { label: "Lakefront", icon: <FaWater /> },
    { label: "Camping", icon: <FaCampground /> },
    { label: "Farms", icon: <FaTree /> },
    { label: "Arctic", icon: <FaSnowflake /> },
];

const Listings = () => {
    const { allListings, loading, error } = useSelector((state) => state.listings);
    const [isScrollable, setIsScrollable] = useState(false);
    const dispatch = useDispatch();
    const skeletonArray = Array.from({ length: 8 });
    const [showTax, setShowTax] = useState(false);
    const filterRef = useRef(null);
    const navigate = useNavigate();

    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const query = params.get("q");

        if (query) {
            dispatch(searchListings(query));
        } else {
            dispatch(fetchListings());
        }
    }, [location.search, dispatch]);


    const scroll = (direction) => {
        if (!filterRef.current) return;

        const scrollAmount = 200;
        filterRef.current.scrollBy({
            left: direction === "left" ? -scrollAmount : scrollAmount,
            behavior: "smooth",
        });
    };

    const checkScrollable = () => {
        if (!filterRef.current) return;
        const { scrollWidth, clientWidth } = filterRef.current;
        setIsScrollable(scrollWidth > clientWidth);
    };

    useLayoutEffect(() => {
        const run = () => checkScrollable();

        requestAnimationFrame(run);
        window.addEventListener("resize", run);

        return () => window.removeEventListener("resize", run);
    }, []);


    return (
        <>
            {loading && (
                <>
                    <PageLoader />
                    <div className="max-w-7xl mx-auto px-4 mt-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {skeletonArray.map((_, index) => (
                                <div key={index} className="animate-pulse">
                                    <div className="h-64 w-full bg-gray-200 rounded-xl" />
                                    <div className="mt-3 space-y-2">
                                        <div className="h-4 bg-gray-200 rounded w-3/4" />
                                        <div className="h-4 bg-gray-200 rounded w-1/2" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}

            {!loading && error && (
                <div className="max-w-7xl mx-auto px-4 mt-10">
                    <div className="bg-red-100 text-red-700 p-4 rounded-lg">
                        Failed to load listings. Please try again.
                    </div>
                </div>
            )}



            {
                !loading &&
                <div className="max-w-7xl mx-auto px-4">

                    <div className="sticky top-0 z-30 py-3">

                        <div className="relative w-full flex flex-col gap-8">

                            <div className="relative w-full flex items-center">

                                {isScrollable && (
                                    <div className="pointer-events-none absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-white to-transparent z-10" />
                                )}

                                {isScrollable && (
                                    <button
                                        onClick={() => scroll("left")}
                                        className="absolute left-3 z-20 h-9 w-9 bg-white border shadow rounded-full flex items-center justify-center cursor-pointer "
                                    >
                                        <FaChevronLeft />
                                    </button>
                                )}

                                <div className="w-full overflow-hidden">
                                    <div
                                        ref={filterRef}
                                        onScroll={checkScrollable}
                                        className="flex gap-12 overflow-x-auto scroll-smooth no-scrollbar   md:px-0"
                                    >
                                        {filters.map((filter, index) => (
                                            <div
                                                key={index}
                                                className="flex flex-col items-center text-gray-500 hover:text-black cursor-pointer min-w-fit"
                                            >
                                                <div className="text-lg">{filter.icon}</div>
                                                <p className="text-sm mt-1 whitespace-nowrap">
                                                    {filter.label}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {isScrollable && (
                                    <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-white to-transparent z-10" />
                                )}

                                {isScrollable && (
                                    <button
                                        onClick={() => scroll("right")}
                                        className="absolute right-3 z-20 h-9 w-9 bg-white border shadow rounded-full flex items-center justify-center cursor-pointer"
                                    >
                                        <FaChevronRight />
                                    </button>
                                )}

                                {!isScrollable &&
                                    <div className="hidden md:flex justify-end">
                                        <div className="flex items-center border rounded-lg gap-3 px-4 py-2">
                                            <span onClick={() => setShowTax(!showTax)} className="cursor-pointer">
                                                {showTax ? <FaToggleOn size={24} /> : <FaToggleOff size={24} />}
                                            </span>
                                            <span>Display total after taxes</span>
                                        </div>
                                    </div>
                                }
                            </div>

                            {isScrollable && <div className="flex justify-center">
                                <div className="flex items-center border rounded-lg gap-3 px-4 py-2">
                                    <span onClick={() => setShowTax(!showTax)} className="cursor-pointer">
                                        {showTax ? <FaToggleOn size={24} /> : <FaToggleOff size={24} />}
                                    </span>
                                    <span>Display total after taxes</span>
                                </div>
                            </div>
                            }

                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
                        {allListings.map((listing) => (
                            <div
                                key={listing._id} onClick={() => navigate(`/listings/${listing._id}`)}
                                className="cursor-pointer rounded-xl overflow-hidden transition-transform md:hover:scale-105"
                            >
                                <div className="h-64 w-full bg-gray-200 overflow-hidden rounded-xl">
                                    <img
                                        src={listing.image?.url}
                                        alt={listing.title}
                                        loading="lazy"
                                        className="h-64 w-full object-cover"
                                    />
                                </div>


                                <div className="mt-3">
                                    <h3 className="font-semibold">{listing.title}</h3>

                                    {!showTax ? (
                                        <p className="text-gray-700">
                                            ₹{listing.price} / night
                                        </p>
                                    ) : (
                                        <p className="font-semibold">
                                            ₹{Math.round(listing.price * 1.18)} / night
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div >
            }

            {!loading && !error && allListings.length === 0 && (
                <div className="text-center mt-10 text-gray-500">
                    No listings found
                </div>
            )}
        </>
    );
};

export default Listings;
// D:\Web_Dev\backends\airbnb-clone frontend\src\components\Listings.jsx