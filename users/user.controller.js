const { create, loginUser, getUser, getUserByID, updateUser, getProduct, createBlog, getBlogs, getBlogByEmail } = require("./user.service");
// const { pool } = require("../config/database");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const pool = require("../config/database");
module.exports = {
  createUser: (req, res) => {
    const body = req.body;
    create(body, (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }
      return res.status(200).json({
        succcess: 1,
        data: result,
      });
    });
  },
  login: (req, res) => {
    const body = req.body;
    loginUser(body, (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }
      return res.status(200).json({
        data: result,
      });
    });
  },
  getUsersData: (req, res) => {
    const body = req.body;
    getUser(body, (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }
      return res.status(200).json({
        succcess: 1,
        data: result,
      });
    });
  },
  getUsersDataByID: (req, res) => {
    const id = req.params.id;
    getUserByID(id, (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }
      return res.status(200).json({
        succcess: 1,
        data: result,
      });
    });
  },
  updateUser: (req, res) => {
    const data = req.body;
    updateUser(data, (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }
      return res.status(200).json({
        succcess: 1,
        message:'Sucessfull updated' ,
      });
    });
  },
  getProductData: (req, res) => {
    const body = req.body;
    getProduct(body, (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }
      return res.status(200).json({
        succcess: 1,
        data: result,
      });
    });
  },
  creatBlog: (req, res) => {
    const body = req.body;
    createBlog(body, (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }
      return res.status(200).json({
        succcess: 1,
        message:'Blog posted'
      });
    });
  },
  getBlogs: (req, res) => {
    const body = req.body;
    getBlogs(body, (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }
      return res.status(200).json({
        succcess: 1,
        data: result,
      });
    });
  },
  getBlogByEmail: (req, res) => {
    const email = req.body.userEmail;
    console.log( req.body);
    
    getBlogByEmail(email, (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }
      return res.status(200).json({
        succcess: 1,
        data: result,
      });
    });
  },
};
