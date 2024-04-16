const express = require("express");
const cors = require("cors");
const app = express();
const port = 3008;

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretKey = "1234";

const { Sequelize, DataTypes } = require("sequelize");
app.use(cors());
// Express middleware for parsing JSON
app.use(express.json());
//Conexion a la DB
// Database connection
const sequelize = new Sequelize({
  dialect: "mysql",
  host: "localhost",
  username: "root",
  password: "1234",
  database: "grupo5db",
});
// Entity class for dynamic table creation
class Entity {
  constructor(name, fields) {
    this.name = name;
    this.model = sequelize.define(name, fields);
  }
  async sync() {
    await this.model.sync({ force: true });
    console.log(`Table for ${this.name} synchronized`);
  }
}
// Define a simple schema for the User entity
const userSchema = {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  user_email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  user_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  user_last_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  user_password: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
};
const libroSchema = {
  libro_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  nombre_libro: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  nombre_autor: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
};
// Create User entity using the schema
const User = new Entity("User", userSchema);
const Libro = new Entity("Libro", libroSchema);
// Synchronize the database with the defined models.
// This will create the tables if they do not exist
// It will also create the tables with the defined schema
// it will delete the information in the table
const syncronizeDB = () => {
  sequelize
    .sync()
    .then(async () => {
      await User.sync();
      await Libro.sync();
    })
    .catch((error) => {
      console.error("Error synchronizing database:", error);
    });
};
 //syncronizeDB();

 
app.get("/api", (req, res) => {
  res.send("Hello World!");
});

app.post("/login", async (req, res) => {
  try {
    const { user_email, user_password } = req.body;
    console.log("req.body");
    console.log(req.body);
    const user = await User.model.findOne({
      where: {
        user_email: user_email,
      },
    });

    const isValidPassword = await bcrypt.compare(
      user_password,
      user.user_password
    );

    // Define token expiration time (e.g., 1 hour)
    const expirationTime = 300; // in seconds

    // Generate JWT token with expiration time
    const token = jwt.sign(
      { userId: user.user_id, timeIssued: Date.now() }, // payload
      secretKey,
      { expiresIn: expirationTime } // options
    );

    if (user && isValidPassword) {
      res.status(200).json({ message: "Login successful", user, token });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error authenticating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.post("/register", async (req, res) => {
  try {
    const { user_email, user_name, user_last_name, user_password } = req.body;
    console.log("req.body");
    console.log(req.body);

    const hassPassword = await bcrypt.hash(user_password, 10);
    const user = await User.model.create({
      user_email,
      user_name,
      user_last_name,
      user_password: hassPassword,
    });
    res.status(201).json({ message: "User created", user });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



app.get("/users", async (req, res) => {
  try {
    const users = await User.model.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.delete("/user/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;
    await User.model.destroy({
      where: {
        user_id,
      },
    });
    res.status(204).json({ message: "User deleted" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.put("/users/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;
    const { user_email, user_name, user_last_name, user_password } = req.body;
    await User.model.update(
      {
        user_email,
        user_name,
        user_last_name,
        user_password,
      },
      {
        where: {
          user_id,
        },
      }
    ); // Update the user with the given user_id
    res.status(204).json({ message: "User updated" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//back-end para libros

app.get("/libros", async (req, res) => {
  try {
    const libros = await Libro.model.findAll();
    res.status(200).json(libros);
  } catch (error) {
    console.error("Error fetching libros:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.delete("/libros/:libro_id", async (req, res) => {
  try {
    const { libro_id } = req.params;
    await Libro.model.destroy({
      where: {
        libro_id,
      },
    });
    res.status(204).json({ message: "Libro deleted" });
  } catch (error) {
    console.error("Error deleting libro:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.put("/libros/:libro_id", async (req, res) => {
  try {
    const { libro_id } = req.params;
    const { nombre_autor, nombre_libro } = req.body;
    await Libro.model.update(
      {
        nombre_autor,
        nombre_libro,
        
      },
      {
        where: {
          libro_id,
        },
      }
    ); // Update the libro with the given libro_id
    res.status(204).json({ message: "Libro updated" });
  } catch (error) {
    console.error("Error updating libro:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/registroLibro", async (req, res) => {
  try {
    const { nombre_autor, nombre_libro } = req.body;
    console.log("req.body");
    console.log(req.body);
    const libro = await Libro.model.create({
      nombre_autor,
      nombre_libro,
    });
    res.status(201).json({ message: "Libro created", libro });
  } catch (error) {
    console.error("Error creating libro:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
