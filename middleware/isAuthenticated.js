import jwt from "jsonwebtoken"

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token

        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false
            })
        }

        const decode = jwt.verify(token, process.env.SECRET_KEY)

        if (!decode) {
            return res.status(401).json({
                message: "Invalid Token",
                success: false
            })
        }

        req.id = decode.userId
        req.role = decode.role
        next()
    }
    catch (err) {
        // ✅ FIXED: was silently failing before, now sends proper response
        console.log("Auth error:", err.message)
        return res.status(401).json({
            message: "Invalid or expired token",
            success: false
        })
    }
}

export default isAuthenticated