const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");
//setting up config files
dotenv.config({ path: "back-end/config/config.env" });

// connecting to data base.keys
connectDatabase();

// server listener.
app.listen(process.env.PORT, () => {
  console.log(
    `server started on post: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
  );
});
