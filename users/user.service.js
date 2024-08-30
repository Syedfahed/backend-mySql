const pool = require("../config/database");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const JWT_SECRET = "password"; // Replace with your secret key

module.exports = {
  create: async (data, callBack) => {
    data.password = await bcrypt.hash(data.password, 10);
    const checkSql = `SELECT * FROM signup WHERE email = ? OR phoneNumber = ?`;
    // check user
    pool.query(checkSql, [data.email, data.phoneNumber], (err, checkData) => {
      if (err) {
        return callBack({
          succcess: 0,
          message: "An error occurred while checking for existing users",
        });
      }
      if (checkData.length > 0) {
        return callBack({
          succcess: 0,
          message: "Email or Phone Number already exists",
        });
      }
      // create new use
      console.log(data);

      pool.query(
        `insert into signup(fullName, email, password, phoneNumber) values(?,?,?,?)`,
        [data.fullName, data.email, data.password, data.phoneNumber],
        (err, result) => {
          console.log("err", err, "result", result);
          if (err) {
            return callBack(err);
          } else {
            return callBack(null, result);
          }
        }
      );
    });
  },
  loginUser: (data, callBack) => {
    const sql = "SELECT * FROM signup WHERE email = ? ";
    pool.query(sql, [data.email], async (err, checkData) => {
      if (err) {
        return callBack({
          succcess: 0,
          message: "An error occurred while fetching user data",
        });
      }

      if (checkData.length === 0) {
        return callBack({
          succcess: 0,
          message: "Invalid email or password",
        });
      }
      console.log(checkData[0]);

      const user = checkData[0];

      // Compare the provided password with the stored hash

      const passwordMatch = await bcrypt.compare(data.password, user.password);

      if (!passwordMatch) {
        return callBack({ succcess: 0, message: "Invalid email or password" });
      }

      // Generate JWT token
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          userName: user.fullName,
          phoneNumber: user.phoneNumber,
        },
        JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );
      return callBack(null, {
        succcess: 1,
        message: "Login successful",
        token,
      });
    });
  },
  getUser: (data, callBack) => {
    const sqlQuary = "select id,fullName,email,phoneNumber from signup";
    pool.query(
      sqlQuary,
      [data.id, data.fullName, data.email, data.phoneNumber],
      (err, result) => {
        if (err) {
          return callBack(err);
        } else {
          return callBack(null, result);
        }
      }
    );
  },
  getUserByID: (id, callBack) => {
    const sqlQuary = `select id,fullName,email,phoneNumber from signup where id = ?`;
    pool.query(sqlQuary, [id], (err, result) => {
      if (err) {
        return callBack(err);
      } else {
        return callBack(null, result[0]);
      }
    });
  },
  updateUser: (data, callBack) => {
    const sqlQuary = `update signup set fullName=?,email=? where id = ?`;
    pool.query(
      sqlQuary,
      [data.fullName, data.email, data.phoneNumber, data.id],
      (err, result) => {
        if (err) {
          return callBack(err);
        } else {
          return callBack(null, result);
        }
      }
    );
  },
  getProduct: (data, callBack) => {
    const sqlQuary =
      "select category_id, name, description, price, count, image from products";
    pool.query(
      sqlQuary,
      [
        data.category_id,
        data.name,
        data.description,
        data.price,
        data.count,
        data.image,
      ],
      (err, result) => {
        if (err) {
          return callBack(err);
        } else {
          return callBack(null, result);
        }
      }
    );
  },
  createBlog: async (data, callBack) => {
    pool.query(
      `insert into blog(description, postDate, postBy, title, userEmail) values(?,?,?,?,?)`,
      [
        data.description,
        data.postDate,
        data.postBy,
        data.title,
        data.userEmail
      ],
      (err, result) => {
        console.log("err", err, "result", result);
        if (err) {
          return callBack(err);
        } else {
          return callBack(null, result);
        }
      }
    );
  },
  getBlogs: async (data, callBack) => {
    pool.query(
      `select id, userName, profile, description, postDate, postBy, title, userEmail from blog`,
      [
        data.id,
        data.userName,
        data.profile,
        data.description,
        data.postDate,
        data.postBy,
        data.title,
        data.userEmail,
      ],
      (err, result) => {
        console.log("err", err, "result", result);
        if (err) {
          return callBack(err);
        } else {
          return callBack(null, result);
        }
      }
    );
  },
  getBlogByEmail: (email, callBack) => {
    console.log(email);
    
    const sqlQuary = `select id, userName, profile, description, postDate, postBy, title, userEmail from blog where userEmail = ?`;
    pool.query(sqlQuary, [email], (err, result) => {
      if (err) {
        return callBack(err);
      } else {
        return callBack(null, result);
      }
    });
  },
};
