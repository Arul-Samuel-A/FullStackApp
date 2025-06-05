import Admin from "../models/adminModel.js";
import generateToken from "../utils/token.js";

async function adminLogin(req, res) {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({ message: "Admin not found" });
    }

    if (admin.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = generateToken({id:admin._id, email: admin.email});

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 20 * 60 * 1000,
    });
    res.status(200).json({
  message: "Login successful"
});

  } catch (err) {
    console.error("🔥 Error logging in:", err);
    res.status(500).json({
      message: "Error logging in",
      error: err.message,
    });
  }
}

export default adminLogin;
