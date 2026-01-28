import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux"
import { signup } from "../../features/user/userThunks";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


function Signup() {
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit, reset,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        console.log(data);
        try {
            dispatch(signup(data)).unwrap();
            reset();
            navigate("/")
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="my-20 flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
                <h1 className="text-2xl font-semibold text-center mb-6">Sign Up</h1>

                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    {/* Email */}
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2
                ${errors.email
                                    ? "border-red-500 focus:ring-red-400"
                                    : "border-gray-300 focus:ring-blue-400"
                                }`}
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Enter a valid email",
                                },
                            })}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* Username */}
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1">Username</label>
                        <input
                            type="text"
                            placeholder="Enter unique username"
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2
                ${errors.username
                                    ? "border-red-500 focus:ring-red-400"
                                    : "border-gray-300 focus:ring-blue-400"
                                }`}
                            {...register("username", {
                                required: "Username is required",
                                minLength: {
                                    value: 3,
                                    message: "Username must be at least 3 characters",
                                },
                            })}
                        />
                        {errors.username && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.username.message}
                            </p>
                        )}
                    </div>

                    {/* Password */}
                    <div className="mb-5">
                        <label className="block text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            placeholder="Enter strong password"
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

                    {/* Button */}
                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition font-medium hover:cursor-pointer"
                    >
                        Sign up
                    </button>
                </form>

                <hr className="my-4" />

                <p className="text-center text-gray-600">
                    Have an account?{" "}
                    <Link
                        to="/user/login"
                        className="text-blue-600 hover:underline font-medium"
                    >
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Signup;
// D:\Web_Dev\backends\airbnb-clone frontend\src\components\user\Signup.jsx