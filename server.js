const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const events = require("./db/events.json");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the API.",
  });
});

app.get("/dashboard", (req, res) => {
  let credentails = req.headers.authorization;
  jwt.verify(credentails, "the_secret_key", (err) => {
    // verifies token
    if (err) {
      // if error, respond with 401 code
      res.sendStatus(401);
    } else {
      // otherwise, respond with private data
      res.json({
        events: events,
      });
    }
  });
});

app.post("/register", (req, res) => {
  if (req.body) {
    const user = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      // In a production app, you'll want to encrypt the password
    };
    var errorsToSend = [];
    const data = JSON.stringify(user, null, 2);
    var dbUserEmail = require("./db/user.json").email;

    if (dbUserEmail === user.email) {
      // check to see if email already exists in db
      errorsToSend.push("An account with this email already exists.");
    }
    if (user.password.length < 5) {
      // validate password is in correct format
      errorsToSend.push("Password too short.");
    }

    if (errorsToSend.length > 0) {
      res.status(400).json({ errors: errorsToSend });
    } else {
      fs.writeFile("./db/user.json", data, (err) => {
        if (err) {
          console.log(err + data);
        } else {
          const token = jwt.sign({ user }, "the_secret_key");
          // In a production app, you'll want the secret key to be an environment variable
          res.json({
            token,
            email: user.email,
            name: user.name,
          });
        }
      });
    }
  } else {
    res.sendStatus(400);
  }
});

app.post("/login", (req, res) => {
  const userDB = fs.readFileSync("./db/user.json");
  const userInfo = JSON.parse(userDB);
  if (
    req.body &&
    req.body.email === userInfo.email &&
    req.body.password === userInfo.password
  ) {
    const token = jwt.sign({ userInfo }, "the_secret_key");
    // In a production app, you'll want the secret key to be an environment variable
    res.json({
      token,
      email: userInfo.email,
      name: userInfo.name,
    });
  } else {
    res.status(401).json({ error: "Invalid login. Please try again." });
  }
});

// MIDDLEWARE
function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(401);
  }
}

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
