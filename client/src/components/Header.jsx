import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user, setShowLogin } = useContext(AppContext);
  const navigate = useNavigate();

  const onClickHandler = () => {
    if (user) {
      navigate("/result");
    } else {
      setShowLogin(true);
    }
  };

  return (
    <motion.div
      className="flex flex-col justify-center items-center text-center my-20 p-4"
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {/* Tagline */}
      <motion.div
        className="text-gray-600 inline-flex text-center gap-2 bg-white shadow-lg px-6 py-1 rounded-full border border-neutral-200 hover:shadow-xl transition-shadow duration-300"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <p>Best text to image generator</p>
        <img src={assets.star_icon} alt="Star Icon" className="h-6 w-6" />
      </motion.div>

      {/* Hero Title */}
      <motion.h1
        className="text-4xl max-w-[300px] sm:text-7xl sm:max-w-[620px] mx-auto mt-10 text-center font-bold leading-tight"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 2 }}
      >
        Turn text to{" "}
        <span
          className="bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-700 bg-clip-text text-transparent font-extrabold"
        >
          image
        </span>
        , in seconds.
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        className="text-center max-w-xl text-gray-600 mx-auto mt-5 text-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
      >
        Unleash your creativity with AI. Turn your imagination into visual art
        in seconds - just type, and watch the magic happen.
      </motion.p>

      {/* CTA Button */}
      <motion.button
        onClick={onClickHandler}
        className="sm:text-lg text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-cyan-500 hover:to-blue-600 w-auto mt-8 px-12 py-2.5 flex items-center gap-3 rounded-full shadow-lg transform transition-transform duration-300 ease-in-out"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          default: { duration: 0.5 },
          opacity: { delay: 1.95, duration: 1 },
        }}
      >
        Generate Images
        <img className="h-6" src={assets.star_group} alt="Star Group" />
      </motion.button>

      {/* Sample Images */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.45, duration: 1 }}
        className="flex flex-wrap justify-center mt-16 gap-6"
      >
        {Array(6)
          .fill("")
          .map((item, index) => (
            <motion.img
              whileHover={{ scale: 1.1 }}
              className="rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer h-16 sm:h-20"
              src={index % 2 === 0 ? assets.sample_img_2 : assets.sample_img_1}
              alt={`Sample ${index}`}
              key={index}
              width={80}
            />
          ))}
      </motion.div>

      {/* Image Attribution Note */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.45, duration: 0.8 }}
        className="mt-2 text-neutral-500 text-sm"
      >
        Generated images from ArtifyAI
      </motion.p>
    </motion.div>
  );
};

export default Header;