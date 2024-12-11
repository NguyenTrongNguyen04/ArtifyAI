import axios from "axios";
import userModel from "../../models/userModel.js";

export const generateImage = async (req, res) => {
    try {
        const { userId, prompt } = req.body;

        // Tìm người dùng trong cơ sở dữ liệu
        const user = await userModel.findById(userId);

        // Kiểm tra dữ liệu đầu vào
        if (!user || !prompt) {
            return res.json({ success: false, message: 'Missing Details' });
        }

        // Kiểm tra số dư tín dụng
        if (user.creditBalance === 0 || user.creditBalance < 0) {
            return res.json({ success: false, message: 'No Credit Balance', creditBalance: user.creditBalance });
        }

        // Gửi yêu cầu tới HuggingFace API
        const { data } = await axios.post(
            "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
            { inputs: prompt },
            {
                headers: {
                    Authorization: `Bearer ${process.env.HUGGINGFACE_API}`, 
                    "Content-Type": "application/json",
                },
                responseType: "arraybuffer", 
            }
        );

        // Xử lý dữ liệu phản hồi thành hình ảnh Base64
        const base64Image = Buffer.from(data, "binary").toString("base64");
        const resultImage = `data:image/png;base64,${base64Image}`;

        // Giảm số dư tín dụng của người dùng và cập nhật cơ sở dữ liệu
        await userModel.findByIdAndUpdate(user._id, { creditBalance: user.creditBalance - 1 });

        // Trả về phản hồi thành công
        res.json({
            success: true,
            message: "Image Generated",
            creditBalance: user.creditBalance - 1,
            resultImage,
        });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};