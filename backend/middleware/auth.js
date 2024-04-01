const dotenv = require("dotenv");
dotenv.config();
const Jwt = require("jsonwebtoken");
const config = require("../configs.json");

module.exports.generateToken = (email, id, accountType, username) => {
    const secretKey = config.JWT_SECRET;
    const payload = { email, id, username, accountType };
    const options = { expiresIn: config.JWT_ACCESS_TOKEN_EXPIRY };
    const token = Jwt.sign(payload, secretKey, options);
    return token;
};

module.exports.auth = async (req, res, next) => {
    // get token
    let token = undefined;
    const authHeader = req.headers["authorization"];

    if (authHeader) {
        const [bearer, accessToken] = authHeader?.split(" ");
        if (bearer === "Bearer" && accessToken) {
            token = accessToken;
        }
    }
    console.log("token---->", token);

    // check token empty or not
    if (!token) {
        return res.status(401).json({
            success: false,
            massage: "token not found",
        });
    }
    try {
        // extract payload data from token like account type
        const loginUserDetails = await Jwt.verify(token, config.JWT_SECRET);
        console.log("decode --> ", loginUserDetails);
        req.user = loginUserDetails;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            success: false,
            massage: "Invalid accessToken provided.",
        });
    }
};

module.exports.isClient = (req, res, next) => {
    try {
        const { accountType } = req.user;

        console.log("Account type: " + accountType);

        if (accountType !== "Client") {
            return res.status(401).json({
                success: false,
                massage: "this site is protected for client",
            });
        }

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            massage: "User role is not matching with Client",
        });
    }
};

module.exports.isArtist = (req, res, next) => {
    try {
        const { accountType } = req.user;
        console.log(req.user);
        if (accountType !== config.CONSTANTS.artist) {
            return res.status(401).json({
                success: false,
                massage: "this site is protected for Artist",
            });
        }

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            massage: "User role is not matching with Artist",
        });
    }
};

module.exports.isAdmin = (req, res, next) => {
    try {
        const { accountType } = req.user;

        console.log(accountType);
        if (accountType !== config.CONSTANTS.admin) {
            return res.status(401).json({
                success: false,
                massage: "this site is protected for Admin",
            });
        }

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            massage: "User role is not matching with Admin",
        });
    }
};
