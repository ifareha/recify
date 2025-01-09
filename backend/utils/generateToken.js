import jwt from "jsonwebtoken";

export const generateToken = (res, user) => {
    try {
        const token = jwt.sign({ userId: user._id }, process.env.JWT_KEY, {
            expiresIn: "7d",
        });
        return res
            .status(200)
            .cookie("token", token)
            .json({
                success: true,
                message: "Token generated successfully",
                user,
            });
    } catch (error) {
        console.error("Token generation error:", error.message);
        return res.status(500).json({
            success: false,
            message: "Failed to generate token",
        });
    }
};
