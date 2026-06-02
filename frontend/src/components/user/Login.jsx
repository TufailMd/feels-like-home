import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login } from "../../features/user/userThunks";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
    const [message, setMessage] = useState(null);
    const [type, setType] = useState("");
    const {
        register,
        handleSubmit, reset,
        formState: { errors },
    } = useForm();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            await dispatch(login(data)).unwrap();
            reset();

            setType("success");
            setMessage("Login successful!");

            setTimeout(() => {
                navigate("/");
            }, 1000);

        } catch (error) {
            console.log(error);

            setType("error");
            setMessage(error?.response?.data?.error || "Login failed");
        }
        setTimeout(() => {
            setMessage(null);
        }, 3000);
    };

    return (
        <div className="my-20 flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
                <h1 className="text-2xl font-semibold text-center mb-6">Login</h1>
                {message && (
                    <div
                        className={`mb-4 px-4 py-2 rounded-lg text-sm font-medium
        ${type === "success"
                                ? "bg-green-100 text-green-700 border border-green-300"
                                : "bg-red-100 text-red-700 border border-red-300"
                            }`}
                    >
                        {message}
                    </div>
                )}
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1">Username</label>
                        <input
                            type="text"
                            placeholder="Enter username"
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2
                ${errors.username
                                    ? "border-red-500 focus:ring-red-400"
                                    : "border-gray-300 focus:ring-blue-400"
                                }`}
                            {...register("username", {
                                required: "Username is required",
                            })}
                        />
                        {errors.username && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.username.message}
                            </p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            placeholder="Enter password"
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2
                ${errors.password
                                    ? "border-red-500 focus:ring-red-400"
                                    : "border-gray-300 focus:ring-blue-400"
                                }`}
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters",
                                },
                            })}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition font-medium cursor-pointer"
                    >
                        Log in
                    </button>
                </form>

                <hr className="my-4" />

                <p className="text-center text-gray-600">
                    Don&apos;t have an account?{" "}
                    <Link
                        to="/signup"
                        className="text-blue-600 hover:underline font-medium"
                    >
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
// D:\Web_Dev\backends\airbnb-clone frontend\src\components\user\Login.jsx