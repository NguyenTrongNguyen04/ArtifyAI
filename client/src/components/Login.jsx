import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets"; // Import assets.js
import { AppContext } from "../context/AppContext";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [state, setState] = useState("Login"); // State để chuyển đổi giữa Login và Sign Up
  const { setShowLogin, backendUrl, setToken, setUser } = useContext(AppContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (state === "Login") {
        const { data } = await axios.post(backendUrl + "/api/user/login", { email, password });

        if (data.success) {
          setToken(data.token);
          setUser(data.user);
          localStorage.setItem("token", data.token);
          setShowLogin(false);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
        });

        if (data.success) {
          setToken(data.token);
          setUser(data.user);
          localStorage.setItem("token", data.token);
          setShowLogin(false);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  // Animation Variants
  const formVariant = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeInOut" } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3, ease: "easeInOut" } },
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.4 },
    }),
  };

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.3 } }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
    >
      <motion.form
        onSubmit={onSubmitHandler}
        variants={formVariant}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="relative bg-white p-10 rounded-3xl shadow-xl w-[90%] max-w-md text-slate-600"
      >
        {/* Logo */}
        <motion.div
          variants={itemVariant}
          custom={0}
          initial="hidden"
          animate="visible"
          className="flex justify-center mb-5"
        >
          <img
            src={assets.logo} // Đường dẫn logo chính (logo.svg)
            alt="Logo"
            className="w-24 h-24 object-contain" // Tùy chỉnh kích thước logo
          />
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-center text-3xl text-neutral-700 font-semibold mb-2"
          variants={itemVariant}
          custom={1}
          initial="hidden"
          animate="visible"
        >
          {state === "Login" ? "Welcome Back!" : "Create Account"}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-sm text-center mb-6 text-gray-500"
          variants={itemVariant}
          custom={2}
        >
          {state === "Login"
            ? "Sign in to access your account."
            : "Join us to get started!"}
        </motion.p>

        {/* Input Fields */}
        {state !== "Login" && (
          <motion.div
            className="border px-6 py-3 flex items-center gap-3 rounded-full focus-within:ring-2 focus-within:ring-blue-500 mb-4"
            variants={itemVariant}
            custom={3}
          >
            <img src={assets.user_icon} width={20} height={20} alt="User Icon" />
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              className="outline-none text-sm w-full placeholder-gray-400"
              placeholder="Full Name"
              required
            />
          </motion.div>
        )}

        <motion.div
          className="border px-6 py-3 flex items-center gap-3 rounded-full focus-within:ring-2 focus-within:ring-blue-500 mb-4"
          variants={itemVariant}
          custom={4}
        >
          <img src={assets.email_icon} alt="Email Icon" />
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            className="outline-none text-sm w-full placeholder-gray-400"
            placeholder="Email"
            required
          />
        </motion.div>

        <motion.div
          className="border px-6 py-3 flex items-center gap-3 rounded-full focus-within:ring-2 focus-within:ring-blue-500 mb-4"
          variants={itemVariant}
          custom={5}
        >
          <img src={assets.lock_icon} alt="Lock Icon" />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            className="outline-none text-sm w-full placeholder-gray-400"
            placeholder="Password"
            required
          />
        </motion.div>

        {/* Forgot Password */}
        {state === "Login" && (
          <motion.p
            className="text-sm text-blue-600 mb-5 cursor-pointer hover:underline"
            variants={itemVariant}
            custom={6}
          >
            Forgot password?
          </motion.p>
        )}

        {/* Submit Button */}
        <motion.button
          className="bg-blue-600 w-full text-white py-3 rounded-full hover:bg-blue-700 transition-all font-medium mb-4"
          variants={itemVariant}
          custom={7}
        >
          {state === "Login" ? "Login" : "Create Account"}
        </motion.button>

        {/* Switch between Login/Signup */}
        <motion.p
          className="text-center text-sm text-gray-500"
          variants={itemVariant}
          custom={8}
        >
          {state === "Login" ? (
            <span>
              Don't have an account?{" "}
              <span
                className="text-blue-600 cursor-pointer font-medium hover:underline"
                onClick={() => setState("Sign Up")}
              >
                Sign Up
              </span>
            </span>
          ) : (
            <span>
              Already have an account?{" "}
              <span
                className="text-blue-600 cursor-pointer font-medium hover:underline"
                onClick={() => setState("Login")}
              >
                Login
              </span>
            </span>
          )}
        </motion.p>

        {/* Close Button */}
        <motion.img
          onClick={() => setShowLogin(false)}
          src={assets.cross_icon}
          alt="Close Icon"
          className="absolute top-6 right-6 cursor-pointer hover:scale-110 transition-all"
          variants={itemVariant}
          custom={9}
        />
      </motion.form>
    </motion.div>
  );
};

export default Login;