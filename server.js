const express = require("express");
const mongoose = require("mongoose");
// require("dotenv").config();
// const connectDB = require("./db/connect");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(require("./routes"));

// const port = process.env.PORT || 3001;
// const start = async () => {
//   try {
//     await connectDB(process.env.MONGO_URI);
//     app.listen(port, () => {
//       console.log(`=> 🌍 => server is listening on PORT ${port}......`);
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };
// start();

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/pizza-hunt",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Use this to log mongo queries being executed!
mongoose.set("debug", true);

app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));
