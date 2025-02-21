import JWT from "jsonwebtoken";

const authUser = async (req, res, next) => {
    const { token } = await req.headers;

    if (!token) {
        return res.json({ success: false, message: "Not Authorized! Login Again." });
    }

    try {
        const decoded = JWT.verify(token, process.env.JWT_SECRET);

        req.body.userId = decoded.id;


        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ success: false, message: "Invalid or expired token." });
    }
};

export default authUser;
