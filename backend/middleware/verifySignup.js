checkDuplicateUsernameOrEmail = async (req, res, next) => {
 const { username, email } = req.body;
 let connection;
 try {
  connection = await req.pool.getConnection();

  const [usernameRows] = await connection.execute(
   "SELECT id FROM users WHERE username = ?",
   [username]
  );
  if (usernameRows.length > 0) {
   return res.status(400).send({ message: "Failed! Username is already in use!" });
  }

  const [emailRows] = await connection.execute(
   "SELECT id FROM users WHERE email = ?",
   [email]
  );
  if (emailRows.length > 0) {
   return res.status(400).send({ message: "Failed! Email is already in use!" });
  }

  next();
 } catch (err) {
  res.status(500).send({ message: err.message });
 } finally {
  if (connection) connection.release();
 }
};

checkRolesExisted = async (req, res, next) => {
 if (req.body.roles) {
  let connection;
  try {
   connection = await req.pool.getConnection();
   const [roleRows] = await connection.execute("SELECT name FROM roles");
   const availableRoles = roleRows.map(row => row.name);

   for (let i = 0; i < req.body.roles.length; i++) {
    if (!availableRoles.includes(req.body.roles[i])) {
     return res.status(400).send({
      message: `Failed! Role ${req.body.roles[i]} does not exist!`
     });
    }
   }
   next();
  } catch (err) {
   res.status(500).send({ message: err.message });
  } finally {
   if (connection) connection.release();
  }
 } else {
  next();
 }
};

const verifySignup = {
 checkDuplicateUsernameOrEmail,
 checkRolesExisted
};

module.exports = verifySignup;