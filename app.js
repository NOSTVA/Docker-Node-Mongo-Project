// setting environment variables --------------
const port = process.env.PORT || 8080;
const mongodb_uri =
  process.env.MONGODB_URI || "mongodb://0.0.0.0:27017/persons";

const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const personsRouter = require("./routes/personsRouter");

const app = express();

app.use(bodyParser.json());

app.get("/", (req, res, next) => {
  res.json({
    message: "success",
    db: mongodb_uri,
    port: port,
  });
});

// api routes --------------------------------
app.use("/persons", personsRouter);

// error route -------------------------------
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
});

// start application -------------------------
const start = async function () {
  try {
    await connectDB(mongodb_uri);
    app.listen(port, () => console.log("listening on port " + port));
  } catch (err) {
    console.log(err);
  }
};

start();
