const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");

const dbConfig = require("./app/config/db.config");

const app = express();

// parse requests of content-type - application/json
app.use(express.json());

//request logger
app.use(morgan("tiny"));

//cross Origin
app.use(cors());
app.options("*", cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
const Role = db.role;

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

// add express json middleware
app.use(express.static(path.join(__dirname, "/src/build")));
app.use(express.json());

// test Routes
app.get("/", (req, res) => res.json({ aplication_name: "The Accounter" }));

// files routes
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname + "/src/build/index.html"));
// });

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });
    }
  });
}
