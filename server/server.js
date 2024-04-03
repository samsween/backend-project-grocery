const express = require("express");
const connectDB = require("./db/connect");
const cors = require("cors");
const app = express();
const apiRoutes = require("./routes/api");
const cookieParser = require("cookie-parser");
const PORT = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use("/api", apiRoutes);
app.use("/images", express.static("images"));

connectDB().then(() => {
  app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
});
