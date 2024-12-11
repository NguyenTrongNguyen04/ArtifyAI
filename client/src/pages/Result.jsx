import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";
import { AppContext } from "../context/AppContext";

const Result = () => {
  const [image, setImage] = useState(assets.sample_img_1); // Ảnh mặc định
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState(""); // Văn bản người dùng nhập
  const [isTranslating, setIsTranslating] = useState(false); // Đang dịch prompt

  const { generateImage } = useContext(AppContext);

  // Hàm API dịch văn bản
  const translatePrompt = async (text) => {
    try {
      setIsTranslating(true);
      const response = await fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=t&q=${encodeURIComponent(
          text
        )}`
      );
      const result = await response.json();
      setIsTranslating(false);
      return result[0][0][0];
    } catch (error) {
      console.error("Error translating prompt:", error);
      setIsTranslating(false);
      return text; // Nếu API thất bại, trả về prompt gốc
    }
  };

  // Submit để generate ảnh
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (input) {
      try {
        // Dịch prompt trước khi gửi
        const translatedPrompt = await translatePrompt(input);
        console.log("Translated Prompt:", translatedPrompt);

        // Gửi đến API để tạo ảnh
        const image = await generateImage(translatedPrompt);
        if (image) {
          setIsImageLoaded(true);
          setImage(image);
        }
      } catch (error) {
        console.error("Error generating image:", error);
      }
    }

    setLoading(false);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onSubmit={onSubmitHandler}
      className="flex flex-col min-h-[90vh] justify-center items-center p-6"
    >
      {/* Image Display */}
      <div>
        <div className="relative">
          <img
            src={image}
            alt="Generated Result"
            className={`max-w-sm rounded-lg shadow-xl transition-all ${
              isImageLoaded ? 'hover:scale-105 duration-300' : ''
            }`}
          />
          {/* Animation bar under image */}
          <span
            className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 via-blue-600 to-cyan-500 ${
              loading ? "w-full transition-all duration-[10s]" : "w-0"
            }`}
          />
        </div>

        {/* Loading Dots Animation */}
        {loading && (
          <div className="flex justify-center mt-5">
            {[...Array(3)].map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0.2, 1, 0.2],
                  y: [0, -10, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1,
                  delay: index * 0.2,
                }}
                className="w-4 h-4 bg-blue-500 rounded-full mx-1"
              ></motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Input + Button */}
      {!isImageLoaded && (
        <div className="flex w-full max-w-xl bg-neutral-200 text-gray-900 text-sm px-4 py-2 mt-10 rounded-full shadow-lg">
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder={
              isTranslating
                ? "Đang dịch, xin chờ..." // Đang dịch
                : "Enter prompt (Có hỗ trợ tiếng Việt)" // Placeholder mặc định
            }
            className="flex-1 bg-transparent outline-none ml-4 text-base"
            disabled={isTranslating}
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-600 to-cyan-500 px-10 py-3 rounded-full text-white hover:scale-105 transition-transform duration-300"
            disabled={loading || isTranslating}
          >
            Generate
          </button>
        </div>
      )}

      {/* Buttons for New Generate or Download */}
      {isImageLoaded && (
        <div className="flex gap-4 flex-wrap justify-center text-white text-lg p-0.5 mt-10">
          <motion.p
            onClick={() => {
              setIsImageLoaded(false);
              setInput(""); // Reset input khi người dùng muốn tạo ảnh khác
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-transparent border border-gray-900 text-gray-900 px-8 py-3 rounded-full cursor-pointer shadow-md hover:shadow-lg"
          >
            Generate Another
          </motion.p>
          <motion.a
            href={image}
            download
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gray-900 px-10 py-3 rounded-full cursor-pointer shadow-md hover:shadow-lg"
          >
            Download
          </motion.a>
        </div>
      )}
    </motion.form>
  );
};

export default Result;