const {
  createUser,
  login,
  getUsersData,
  getUsersDataByID,
  updateUser,
  getProductData,
  creatBlog,
  getBlogs,
  getBlogByEmail,
} = require("./user.controller");
const jwt = require("jsonwebtoken");
const router = require("express").Router();
const verifyToken = (req, res, next) => {
  const JWT_SECRET = "password"; // Replace with your secret key
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(403).json({ succcess: 0, message: "No token provided" });
  }
  console.log(token.slice(7));
//   for remove bar token text
  const tokenS = token.slice(7);
  jwt.verify(tokenS, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ succcess: 0, message: "Unauthorized: Invalid token" });
    }
    // If token is valid, save the decoded user information to the request
    req.user = decoded;
    next();
  });
};
router.post("/signup", createUser);
router.post("/login", login);
router.get("/user", verifyToken, getUsersData);
router.get("/user/:id", getUsersDataByID);
router.put("/user/", updateUser);
router.get("/prodect/", getProductData);
router.post("/blogPost/", creatBlog);
router.get("/blogs/", getBlogs);
router.post("/getBlogs/", getBlogByEmail);
module.exports = router;
