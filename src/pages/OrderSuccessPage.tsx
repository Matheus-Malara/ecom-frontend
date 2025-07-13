import {useParams, useNavigate} from "react-router-dom";
import {motion} from "framer-motion";
import {useEffect} from "react";

export default function OrderSuccessPage() {
    const {orderId} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (!orderId) {
            navigate("/");
        }
    }, [orderId, navigate]);

    return (
        <motion.div
            className="min-h-[70vh] flex flex-col justify-center items-center text-center px-4"
            initial={{opacity: 0, y: 40}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.6, ease: "easeOut"}}
        >
            <motion.div
                className="text-6xl mb-4"
                initial={{scale: 0.8, opacity: 0}}
                animate={{scale: 1, opacity: 1}}
                transition={{delay: 0.2, duration: 0.4}}
            >
                ✅
            </motion.div>

            <motion.h1
                className="text-2xl font-bold mb-2"
                initial={{opacity: 0, y: 10}}
                animate={{opacity: 1, y: 0}}
                transition={{delay: 0.3}}
            >
                Order placed successfully!
            </motion.h1>

            <motion.p
                className="text-gray-600 mb-4"
                initial={{opacity: 0, y: 10}}
                animate={{opacity: 1, y: 0}}
                transition={{delay: 0.4}}
            >
                Thank you for your purchase. You can track your order in your account.
            </motion.p>

            <motion.div
                className="bg-gray-100 border border-gray-300 text-gray-800 text-sm px-4 py-2 rounded mb-6"
                initial={{opacity: 0, y: 10}}
                animate={{opacity: 1, y: 0}}
                transition={{delay: 0.5}}
            >
                <span className="font-semibold text-sm">Order ID:</span> #{orderId}
            </motion.div>

            <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{opacity: 0, y: 10}}
                animate={{opacity: 1, y: 0}}
                transition={{delay: 0.6}}
            >
                <button
                    onClick={() => navigate("/user")}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
                >
                    Go to My Orders
                </button>
                <button
                    onClick={() => navigate("/")}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded"
                >
                    Back to Home
                </button>
            </motion.div>
        </motion.div>
    );
}
