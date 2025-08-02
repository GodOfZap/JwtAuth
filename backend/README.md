```markdown
# 🔐 MEAN Auth Backend

This is the backend API for the MEAN Stack Authentication project. It uses **Node.js**, **Express.js**, and **MongoDB** to handle secure user registration, login, and role-based access management (Admin, Moderator, User).

---

## 🚀 Overview

The backend provides:
- 🧾 User registration & login
- 🔑 JWT token generation & verification
- 👮 Role-based route protection
- 🗃️ MongoDB integration for persistent user data
- 🧪 Unit and integration testing ready

---

## ⚙️ Tech Stack

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [JWT](https://jwt.io/)
- [bcryptjs](https://github.com/dcodeIO/bcrypt.js)

---

## 📁 Folder Structure

```plaintext
backend/
├── config/          # DB and auth configurations
├── controllers/     # Route handlers
├── middleware/      # Auth and role verification
├── models/          # Mongoose user and role models
├── routes/          # Auth and user routes
├── utit/            # Helper functions
└── server.js        # Entry point
```

---

## 🛠 Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/MeanAuth.git
cd MeanAuth/backend
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables:

Create a `.env` file with your settings:

```env
PORT=3000
DB_URI=mongodb://localhost:27017/meanAuthDB
JWT_SECRET=YOUR_SUPER_SECRET_KEY (change this in production)
JWT_EXPIRATION_TIME=86400 # 24 hours in seconds
```

---

## ▶️ Running the Server

Start your development server:

```bash
npm run dev
```
or
```bash
node server.js
```

It will run on: [http://localhost:4200](http://localhost:4200)

For production:

```bash
npm start
```

## 🔐 API Endpoints

Method	Endpoint	            Description
POST	/api/auth/signup	    Register new user
POST	/api/auth/signin	    Login & get JWT
GET	    /api/test/all	        Access public content
GET	    /api/test/user	        Access user content
GET	    /api/test/mod	        Moderator-only route
GET	    /api/test/admin	        Admin-only route

---

## 🧰 Helpful Commands

- Lint code: `npm run lint`
- Format files: `npm run prettier`
- Reset roles in DB: (use your seed script or manual update)

---

## 📚 Resources

- [Express Documentation](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [JWT Introduction](https://jwt.io/introduction/)
- [Node.js Documentation](https://nodejs.org/en/docs/)

---

## 👥 Contributors

Feel free to fork and contribute! Pull requests and issues are welcome.

---