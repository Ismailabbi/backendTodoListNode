const express = require("express");
const taskRouter = require("./routes/taskRoute");
const authRouter = require("./routes/authRoute");
const userRouter = require("./routes/userRoute");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authMidllew = require("./middleware/auth");



const cors = require('cors');
app.use(cors({
  origin: '*'
}));
app.use(bodyParser.json());

mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb://localhost:27017/taskdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("data base connected");
  })
  .catch(() => {
    console.log("data base is not connected ");
  });

app.use(cookieParser());

app.use("/task", authMidllew.requireSignIn, taskRouter);
app.use("/auth", authRouter);
app.use("/user", authMidllew.requireSignIn, userRouter);


app.listen(5000, () => {
  console.log("welecome to our server");
});
