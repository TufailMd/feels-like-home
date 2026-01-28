import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addListing, editListing, getListing } from "../features/listing/listingThunks";
import PageLoader from "./utils/PageLoader";
import { resetCurrListing } from "../features/listing/listingSlice";

function ListingForm() {
    const { loading, error, currListing } = useSelector(state => state.listings);
    const [submitting, setSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!id) {
            dispatch(resetCurrListing());

            reset({
                title: "",
                description: "",
                price: "",
                country: "",
                location: "",
                image: null,
            });

        } else {
            const fetchListing = async () => {
                try {
                    const result = await dispatch(getListing(id)).unwrap();
                    reset({
                        title: result.title || "",
                        description: result.description || "",
                        price: result.price || "",
                        country: result.country || "",
                        location: result.location || "",
                    });
                } catch (error) {
                    console.log(error);
                }
            };

            fetchListing();
        }
    }, [id, dispatch, reset]);



    const onSubmit = async (data) => {
        const formData = new FormData();

        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("price", data.price);
        formData.append("country", data.country);
        formData.append("location", data.location);

        if (data.image && data.image[0]) {
            formData.append("image", data.image[0]);
        }

        try {
            setSubmitting(true);

            if (id) {
                await dispatch(editListing({ id, formData })).unwrap();
            } else {
                await dispatch(addListing(formData)).unwrap();
            }

            reset();
            navigate("/listings");

        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false);
        }
    };


    return (
        <>
            {id && loading &&
                <>
                    <PageLoader />
                    <div className="max-w-2xl mx-auto mt-20 p-6 text-center">
                        <div className="animate-pulse space-y-4">
                            <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto" />
                            <div className="h-10 bg-gray-200 rounded" />
                            <div className="h-24 bg-gray-200 rounded" />
                            <div className="h-10 bg-gray-200 rounded" />
                            <div className="h-10 bg-gray-200 rounded" />
                        </div>
                        <p className="mt-4 text-gray-500">Loading listing details...</p>
                    </div>
                </>
            }

            {!loading &&
                <div className="max-w-2xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-xl">
                    <h2 className="text-3xl font-semibold text-center mb-6">
                        {id ? "Edit Home Details" : "Add Your Home"}
                    </h2>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" encType="multipart/form-data">

                        <div>
                            <label className="block text-md font-medium text-gray-700">
                                Title
                            </label>
                            <input
                                {...register("title", { required: "Title is required" })}
                                type="text"
                                placeholder="Give your space a catchy title"
                                className={`mt-1 w-full p-2 rounded-lg border ${errors.title ? "border-red-500" : "border-gray-300"
                                    } focus:ring-blue-500 focus:border-blue-500`}
                            />
                            {errors.title && (
                                <p className="text-red-500 text-md mt-1">
                                    {errors.title.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-md font-medium text-gray-700">
                                Description
                            </label>
                            <textarea
                                {...register("description", {
                                    required: "Description is required",
                                })}
                                rows="3"
                                placeholder="Share some details about your place"
                                className={`mt-1 w-full p-2 rounded-lg border ${errors.description ? "border-red-500" : "border-gray-300"
                                    } focus:ring-blue-500 focus:border-blue-500`}
                            />
                            {errors.description && (
                                <p className="text-red-500 text-md mt-1">
                                    {errors.description.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-md font-medium text-gray-700">
                                Upload Image
                            </label>
                            <input
                                {...register("image")}
                                type="file"
                                accept="image/*"
                                className="mt-1 block w-full text-md text-gray-500 cursor-pointer
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-lg file:border-0
                        file:text-md file:font-semibold
                        file:bg-blue-50 file:text-blue-700
                        hover:file:bg-blue-100"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block  text-md font-medium text-gray-700">
                                    Price (₹)
                                </label>
                                <input
                                    {...register("price", {
                                        required: "Price is required",
                                        min: { value: 1, message: "Price must be greater than 0" },
                                    })}
                                    type="number"
                                    placeholder="2500"
                                    className={`mt-1 w-full p-2 rounded-lg border ${errors.price ? "border-red-500" : "border-gray-300"
                                        } focus:ring-blue-500 focus:border-blue-500`}
                                />
                                {errors.price && (
                                    <p className="text-red-500 text-md mt-1">
                                        {errors.price.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-md  font-medium text-gray-700">
                                    Country
                                </label>
                                <input
                                    {...register("country", {
                                        required: "Country is required",
                                    })}
                                    type="text"
                                    placeholder="India"
                                    className={`mt-1 w-full p-2 rounded-lg border ${errors.country ? "border-red-500" : "border-gray-300"
                                        } focus:ring-blue-500 focus:border-blue-500`}
                                />
                                {errors.country && (
                                    <p className="text-red-500 text-md mt-1">
                                        {errors.country.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="block text-md font-medium text-gray-700">
                                Location
                            </label>
                            <input
                                {...register("location", {
                                    required: "Location is required",
                                })}
                                type="text"
                                placeholder="Jaipur, Rajasthan"
                                className={`mt-1 w-full p-2  rounded-lg border ${errors.location ? "border-red-500" : "border-gray-300"
                                    } focus:ring-blue-500 focus:border-blue-500`}
                            />
                            {errors.location && (
                                <p className="text-red-500 text-md mt-1">
                                    {errors.location.message}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={submitting}
                            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold cursor-pointer
    hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {submitting ? "Saving..." : id ? "Update Listing" : "Create Listing"}
                        </button>
                    </form>
                </div>
            }
        </>
    );
}

export default ListingForm;
// D:\Web_Dev\backends\airbnb-clone frontend\src\components\ListingForm.jsx