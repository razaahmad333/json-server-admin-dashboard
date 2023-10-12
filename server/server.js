const express = require("express");
const { populateInternalDBWithTableSchema } = require("./utils.js");


require("./helpers.js")
  .readDatabase()
  .then((data) => {
    populateInternalDBWithTableSchema(data);
  });

const app = express();

const PORT = process.env.PORT || 3000;


app.use(express.static("dashboard-ui"));
app.use(express.json());

app.use((req, res, next) => {
  console.table({
    "Incoming request": {
      method: req.method,
      url: req.originalUrl,
    },
  });

  res.on("finish", () => {
    console.table({
      "Outgoing response": {
        status: res.statusCode,
        message: res.statusMessage,
      },
    });
  });
  next();
});

app.get("/", async (req, res) => {
  res.sendFile("index.html");
});

app.use("/api", require("./routes"));

exports.startApp = () => {

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
  
}
 