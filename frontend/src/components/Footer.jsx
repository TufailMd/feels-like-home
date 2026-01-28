import React from 'react'
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa6";


function Footer() {
    return (
        <footer className=" bg-gray-200 py-6 text-center text-gray-800">

            <div className="flex justify-center space-x-4 p-4">
                <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black hover:text-blue-600 transition"
                >
                    <FaFacebook size={20} />
                </a>

                <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black hover:text-pink-500 transition"
                >
                    <FaInstagram size={20} />
                </a>

                <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black hover:text-blue-700 transition"
                >
                    <FaLinkedin size={20} />
                </a>
            </div>

            <div className="mt-2 text-sm">
                © FeelLikeHome Private Limited
            </div>

            <div className="mt-1 text-sm">
                <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mx-1 hover:underline"
                >
                    Privacy
                </a>
                |
                <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mx-1 hover:underline"
                >
                    Terms
                </a>
            </div>
        </footer>
    )
}

export default Footer;
// D:\Web_Dev\backends\airbnb-clone frontend\src\components\Footer.jsx