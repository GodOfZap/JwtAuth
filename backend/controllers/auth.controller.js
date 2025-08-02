const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

exports.signup = async (req, res) => {
 const { username, email, password, roles } = req.body;
 const hashedPassword = bcrypt.hashSync(password, 8);
 let connection;

 try {
  connection = await req.pool.getConnection();
  await connection.beginTransaction();

  const [result] = await connection.execute(
   "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
   [username, email, hashedPassword]
  );
  const userId = result.insertId;

  if (roles) {
   const [roleRows] = await connection.execute(
    `SELECT id FROM roles WHERE name IN (${roles.map(() => "?").join(",")})`,
    roles
   );
   const roleIds = roleRows.map(row => row.id);

   const userRoleInserts = roleIds.map(roleId => [userId, roleId]);
   await connection.query(
    "INSERT INTO user_roles (user_id, role_id) VALUES ?",
    [userRoleInserts]
   );
  } else {
   const [defaultRoleRows] = await connection.execute(
    "SELECT id FROM roles WHERE name = 'user'"
   );
   if (defaultRoleRows.length > 0) {
    const defaultRoleId = defaultRoleRows[0].id;
    await connection.execute(
     "INSERT INTO user_roles (user_id, role_id) VALUES (?, ?)",
     [userId, defaultRoleId]
    );
   }
  }

  await connection.commit();
  res.send({ message: "User was registered successfully!" });
 } catch (err) {
  if (connection) await connection.rollback();
  res.status(500).send({ message: err.message });
 } finally {
  if (connection) connection.release();
 }
};

exports.signin = async (req, res) => {
 const { username, password } = req.body;
 let connection;

 try {
  connection = await req.pool.getConnection();
// ... inside the signin function
const [userRows] = await connection.execute(
  `SELECT u.id, u.username, u.email, u.password, r.name AS role_name
   FROM users u
   LEFT JOIN user_roles ur ON u.id = ur.user_id
   LEFT JOIN roles r ON ur.role_id = r.id
   WHERE u.username = ?`,
  [username]
);
// ...

  if (userRows.length === 0) {
   return res.status(404).send({ message: "User Not found." });
  }

  const user = userRows[0];
  const passwordIsValid = bcrypt.compareSync(password, user.password);

  if (!passwordIsValid) {
   return res.status(401).send({
    accessToken: null,
    message: "Invalid Password!"
   });
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
   expiresIn: process.env.JWT_EXPIRATION_TIME
  });

  const authorities = userRows.map(row => "ROLE_" + row.role_name.toUpperCase());

  res.status(200).send({
   id: user.id,
   username: user.username,
   email: user.email,
   roles: authorities,
   accessToken: token
  });
 } catch (err) {
  res.status(500).send({ message: err.message });
 } finally {
  if (connection) connection.release();
 }
};