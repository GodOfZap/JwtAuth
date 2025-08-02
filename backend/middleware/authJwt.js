const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const db = require('../config/db.config.js');
dotenv.config();

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  if (token.startsWith("Bearer ")) {
    token = token.slice(7, token.length);
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = async (req, res, next) => {
  let connection;
  try {
    connection = await db.getConnection();
    const [rows] = await connection.execute(
      `SELECT r.name FROM user_roles ur
       JOIN roles r ON ur.role_id = r.id
       WHERE ur.user_id = ?`,
      [req.userId]
    );

    const roles = rows.map(row => row.name);

    if (roles.includes("admin")) {
      next();
      return;
    }

    res.status(403).send({ message: "Require Admin Role!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  } finally {
    if (connection) connection.release();
  }
};

isModerator = async (req, res, next) => {
  let connection;
  try {
    connection = await db.getConnection();
    const [rows] = await connection.execute(
      `SELECT r.name FROM user_roles ur
       JOIN roles r ON ur.role_id = r.id
       WHERE ur.user_id = ?`,
      [req.userId]
    );

    const roles = rows.map(row => row.name);

    if (roles.includes("moderator")) {
      next();
      return;
    }

    res.status(403).send({ message: "Require Moderator Role!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  } finally {
    if (connection) connection.release();
  }
};

const authJwt = {
  verifyToken,
  isAdmin,
  isModerator
};
module.exports = authJwt;
