const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const useRouter = require("./users/user.router");
app.use(cors());
app.use(bodyParser.json());
app.use("/api/", useRouter);


// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
