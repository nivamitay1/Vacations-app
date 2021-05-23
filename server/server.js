const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const app = require("./index");
const port = process.env.PORT || 3000;

app.listen(process.env.PORT || 3000, () => {
  console.log("App is running on port " + port);
});
