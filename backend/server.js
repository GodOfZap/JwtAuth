const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const pool = require("./config/db.config");
const initialSetup = require("./util/initialSetup");

const app = express();

const corsOptions = {
 origin: "http://localhost:4200"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Make the pool available to all routes via the request object
app.use((req, res, next) => {
 req.pool = pool;
 next();
});

// Test the connection and perform initial setup
(async () => {
 try {
  const connection = await pool.getConnection();
  console.log("Successfully connected to MySQL.");
  connection.release();
  await initialSetup(pool);
 } catch (err) {
  console.error("Connection error", err);
  process.exit();
 }
})();

// Routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

// Simple route
app.get("/", (req, res) => {
 res.json({ message: "Welcome to the MEVN Auth application (MySQL version)." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
 console.log(`Server is running on port ${PORT}.`);
});