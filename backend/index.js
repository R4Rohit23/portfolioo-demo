const express = require("express");
const serverless = require("serverless-http");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const authRouter = require("./routers/auth_router");
// const adminRouter = require("./routers/admin_router");


const dashboardRouter = require("./routers/dashboard_router");
const artistRouter = require("./routers/artist_router");
const clientRouter = require("./routers/client_router");
const profileRouter = require("./routers/profile_router");
const messageRouter = require("./routers/message_router");
const gigRouter = require("./routers/gig_router");
const adminRouter = require("./routers/admin_router");
const dashBoardRouter = require("./routers/dashboard");
const paymentRouter = require("./routers/payment_router")

const session = require("express-session");
const passport = require("./utils/google_stratergy");

const app = express();
app.use(cors());
app.use(
  session({
    secret: process.env.EXPRESS_SESSION_SECRET_KEY,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/auth", authRouter);
app.use("/api/artist", artistRouter);
app.use("/api/client", clientRouter);
app.use("/api/gig", gigRouter);
app.use("/api/profile", profileRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/message", messageRouter);
app.use("/api/admin", adminRouter);
app.use("/api/dashBoard", dashBoardRouter);
app.use("/api/payment", paymentRouter);

const buildPath = path.join(__dirname, "../frontend/dist");
app.use(express.static(buildPath));

// to run and test locally
if (process.env.DEVELOPMENT) {
  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`Server is running on PORT: ${port}`);
  });
}
