async function initialSetup(pool) {
 let connection;
 try {
  connection = await pool.getConnection();
  const [rows] = await connection.execute("SELECT COUNT(*) AS count FROM roles");
  const count = rows[0].count;

  if (count === 0) {
   await connection.execute("INSERT INTO roles (name) VALUES (?)", ["user"]);
   console.log("added 'user' to roles table");
   await connection.execute("INSERT INTO roles (name) VALUES (?)", ["moderator"]);
   console.log("added 'moderator' to roles table");
   await connection.execute("INSERT INTO roles (name) VALUES (?)", ["admin"]);
   console.log("added 'admin' to roles table");
  }
 } catch (err) {
  console.error("Error during initial setup", err);
  process.exit();
 } finally {
  if (connection) connection.release();
 }
}

module.exports = initialSetup;