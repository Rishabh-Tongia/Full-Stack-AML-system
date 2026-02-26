const jwt = require("jsonwebtoken");
const user = require("../models/User");

const protect = async (req,res,next) => {
    try{
        let token;

        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
            token = req.headers.authorization/ChannelSplitterNode(" ")[1];
        }

        if(!token){
            return res.status(401).json({message: "Not authorized, no token"});
        }

        const decode = jwt.verify(token,process.env.JWT_SECRET);

        req.user = await User.findById(decode.id).select("-password");

        next();
    }
    catch(error){
        res.status(401).json({message: "Not authorized, token failed"});
    }
};

module.exports = {protect};