
const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const controllers=require("./controllers").other

const router=require("./routes");

const passport = require("passport")
const initPassport = require("./config/passport-config")
const UserDB=require("./models").User
const session = require('express-session')
const sequelize=require("./config/db")
const cors = require('cors')

app.use(bodyParser.json());

initPassport(
  passport,
  async (email) => {
    return await UserDB.findOne({
      where: { email: email },
    });
  },
  async (id) => {
    return await UserDB.findOne({ where: { id: id } });
  }
);

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
      name: "cookieLogin",
      cookie: {
          httpOnly: false,
         
    }
  })
);

app.use(passport.initialize()); 
app.use(passport.session()); 


const corsOptions = {
  origin: true,
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Access-Control-Allow-Methods",
    "Access-Control-Request-Headers",
  ],
  credentials: true,
  enablePreflight: true,
};

app.use(cors(corsOptions));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8081");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

// let port = 8082;

sequelize
  .authenticate()
  .then(() => {
    console.log("Sequelize has succesfully connected of the database");
  })
  .catch((err) => console.error("Unable to connect to the database: ", err));

app.use("/", router);

app.get("/reset",controllers.reset)


let port = 8082;
app.listen(port, () => {
  console.log("Server is running on " + port);

});

