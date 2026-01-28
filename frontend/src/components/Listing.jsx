import { useEffect, useState, useRef } from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import { useNavigate, useParams } from "react-router-dom";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import mapboxgl from "mapbox-gl";
import { addReview, deleteReview } from "../features/review/reviewThunks";
import { getListing } from "../features/listing/listingThunks";
import { resetCurrListing } from "../features/listing/listingSlice";
import PageLoader from "./utils/PageLoader";

mapboxgl.accessToken = import.meta.env.VITE_MAP_TOKEN;

function Listing() {
    const { currListing, loading, error } = useSelector(state => state.listings);
    const { user, loading: authLoading } = useSelector(state => state.auth);
    const { loading: reviewLoading } = useSelector(state => state.reviews);
    const [mapLoaded, setMapLoaded] = useState(false);
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(0);
    const [deletingId, setDeletingId] = useState(null);
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);
    const dispatch = useDispatch();
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(resetCurrListing());
        dispatch(getListing(id));
    }, []);


    useEffect(() => {
        if (
            !currListing ||
            !currListing.geometry ||
            !mapContainerRef.current ||
            mapRef.current
        ) return;

        const [lng, lat] = currListing.geometry.coordinates;

        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: "mapbox://styles/mapbox/streets-v12",
            center: [lng, lat],
            zoom: 10
        });

        mapRef.current = map;

        map.on("load", () => {
            setMapLoaded(true);
        });

        new mapboxgl.Marker()
            .setLngLat([lng, lat])
            .addTo(map);

        return () => {
            map.remove();
            mapRef.current = null;
        };
    }, [currListing]);

    const isOwner = user?._id === currListing?.owner[0]?._id;

    const handleSubmitReview = async (e) => {
        e.preventDefault();

        if (!comment.trim()) {
            alert("Please write a comment");
            return;
        }

        if (!rating) {
            alert("Please give a rating");
            return;
        }

        const review = {
            comment,
            rating,
        };



        try {
            console.log("Submitting review:", review);
            await dispatch(addReview({ id, review }));
            setComment("");
            setRating(0);
        } catch (error) {
            console.log(error);
        }

    };

    return (
        <>
            {loading &&
                <>
                    <PageLoader />
                    <div className="max-w-xl mx-auto px-4 mt-6 animate-pulse">
                        <div className="h-8 bg-gray-200 rounded w-3/4 mb-4" />

                        <div className="h-64 bg-gray-200 rounded mb-4" />

                        <div className="h-4 bg-gray-200 rounded w-1/2 mb-2" />
                        <div className="h-4 bg-gray-200 rounded w-2/3 mb-2" />
                        <div className="h-4 bg-gray-200 rounded w-1/3 mb-2" />
                    </div>
                </>
            }
            {error && (
                <div className="max-w-xl mx-auto px-4 mt-6">
                    <div className="bg-red-100 text-red-700 p-4 rounded-lg">
                        {error}
                    </div>
                </div>
            )}

            {!loading && currListing && (
                <div className="max-w-xl mx-auto px-4 mt-2">

                    <h2 className="text-3xl font-semibold">{currListing.title}</h2>

                    <div className="overflow-hidden rounded-lg mt-4 shadow-xl mb-3 aspect-[3/2] bg-gray-200">
                        <img
                            src={currListing.image?.url}
                            alt="listing"
                            loading="lazy"
                            className="w-full h-full object-cover"
                        />

                    </div>

                    <p className="text-xl mb-3">
                        Owned by <span className="font-semibold">{currListing.owner[0]?.username}</span>
                    </p>

                    <div className="text-gray-600 text-lg">
                        <p className="mb-3">{currListing.description}</p>

                        <p className="flex items-center mb-3">
                            <FaIndianRupeeSign size={15} className="mr-1" />
                            {currListing.price.toLocaleString("en-IN")} / night
                        </p>

                        <p className="mb-3">{currListing.location}</p>
                        <p className="mb-3">{currListing.country}</p>
                    </div>

                    {isOwner && (
                        <div className="my-4 mb-6">
                            <button
                                className="px-5 py-2 bg-blue-500 text-white rounded-lg mr-4 hover:bg-blue-600 cursor-pointer"
                                onClick={() => navigate(`/listings/${currListing._id}/edit`)}
                            >
                                Edit
                            </button>

                            <button
                                className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 cursor-pointer"
                                onClick={() => navigate(`/listings/${currListing._id}/delete`)}
                            >
                                Delete
                            </button>


                        </div>
                    )}

                    <hr />

                    <div className="my-3">
                        <h4 className="text-center text-3xl mb-4">User Reviews</h4>

                        {currListing.review && currListing.review.length > 0 ? (
                            currListing.review.map((review) => (
                                <div className="bg-zinc-100 rounded p-3 my-3" key={review._id}>
                                    <span className="flex text-lg items-center justify-between">
                                        <strong>{review.author.username}</strong>
                                        <small>{new Date(review.createdAt).toLocaleDateString()}</small>
                                    </span>

                                    <p className="mt-2">{review.comment}</p>

                                    <Box className="mt-1 flex items-center gap-2">
                                        <Rating
                                            value={review.rating}
                                            readOnly
                                            precision={0.5}
                                            size="small"
                                        />
                                    </Box>


                                    <button
                                        disabled={deletingId === review._id}
                                        onClick={() => {
                                            setDeletingId(review._id);
                                            dispatch(deleteReview({ id, reviewId: review._id }))
                                                .finally(() => setDeletingId(null)
                                                );
                                        }}
                                        className={`mt-3 px-5 py-2 rounded-lg text-white cursor-pointer 
    ${deletingId === review._id
                                                ? "bg-gray-400 cursor-not-allowed"
                                                : "bg-red-600 hover:bg-red-700"}`}
                                    >
                                        {deletingId === review._id ? "Deleting..." : "Delete"}
                                    </button>

                                </div>
                            ))
                        ) : (
                            <div className="bg-zinc-100 rounded p-3 my-3">
                                <p>No reviews yet</p>
                            </div>
                        )}

                    </div>

                    <>
                        <hr />

                        <div className="my-3">
                            <h4 className="text-center text-3xl mb-1">Leave a Review</h4>

                            <form onSubmit={handleSubmitReview} className="space-y-4">

                                <div className="mb-1">
                                    <label className="block text-lg mb-1">Comments:</label>
                                    <textarea
                                        // className="w-full border rounded p-2"
                                        className={`mt-1 w-full p-2 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500`}
                                        placeholder="Write your review here..."
                                        value={comment}
                                        rows="3"
                                        onChange={(e) => setComment(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="mb-1">
                                    <label className="block text-lg mb-2">Give rating:</label>

                                    <Box>
                                        <Rating
                                            name="rating"
                                            value={rating}
                                            onChange={(event, newValue) => {
                                                setRating(newValue);
                                            }}
                                            size="large"
                                        />
                                    </Box>

                                </div>

                                {!authLoading && user?._id ? (
                                    <button
                                        type="submit"
                                        disabled={reviewLoading}
                                        className={`px-6 py-2 rounded shadow text-white cursor-pointer 
    ${reviewLoading ? "bg-gray-400 cursor-not-allowed" : "bg-cyan-500 hover:bg-cyan-600"}`}
                                    >
                                        {reviewLoading ? "Submitting..." : "Submit Review"}
                                    </button>) : (
                                    <button
                                        className="hover:bg-gray-100 bg-cyan-500 text-white px-4 py-2 rounded my-1 cursor-pointer"
                                        onClick={() => navigate("/login")}
                                    >
                                        Login to leave a review
                                    </button>
                                )}

                            </form>
                        </div>
                    </>

                    <hr />

                    <div className="my-5 relative">
                        <h1 className="text-xl font-bold text-gray-700 mb-3">Where you'll be</h1>

                        {!mapLoaded && (
                            <div className="absolute w-full h-64 rounded-lg bg-gray-200 animate-pulse" />
                        )}

                        <div
                            ref={mapContainerRef}
                            className="w-full h-64 rounded-lg shadow-lg"
                        ></div>
                    </div>

                </div>
            )}

            {!loading && !currListing && !error &&
                <div className="text-center mt-10 text-gray-500">
                    Listing not found
                </div>
            }
        </>
    );
}

export default Listing;
// D:\Web_Dev\backends\airbnb-clone frontend\src\components\Listing.jsx