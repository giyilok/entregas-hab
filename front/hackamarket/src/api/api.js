const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql2 = require("mysql2");

// Jsonwebtoken
const jwt = require("jsonwebtoken");
const config = require("./config");

// App
const app = express();

// App uses
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("llave", config.llave);

// Datos de conexión a la bd
const connection = mysql2.createConnection({
  host: "localhost",
  user: "giyilok",
  password: "dander",
  database: "hackamarket",
});

// Conexión con la bd
connection.connect((error) => {
  if (error) throw error;
  console.log("Database status: ok");
});

// Puerto conexión de la api
const PORT = 3050;

app.listen(PORT, () => console.log("API Ustatus: ok"));

// LLamada GET de prueba
app.get("/", (req, res) => {
  res.send("Te doy la bienvenida a mi API");
});

// Ruta para obtener todos los clientes de la BBDD
app.get("/clientes", (req, res) => {
  // Query sql
  const sql = "SELECT * FROM clientes";

  connection.query(sql, (error, results) => {
    // Si sale mal
    if (error) throw error;

    // Si hay resultados
    console.log(results);
    if (results.length > 0) {
      res.json(results);
    } else {
      res.status(404).send("No existen clientes en la BBDD");
    }
  });
});

// Ruta para añadir un nuevo cliente
app.post("/clientes/add", (req, res) => {
  // Query sql
  const sql = "INSERT INTO clientes SET ?";

  // Objeto que recibe la bd
  const newClient = {
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    ciudad: req.body.ciudad,
    empresa: req.body.empresa,
  };

  // Conexión y ejecución del SQL
  connection.query(sql, newClient, (error) => {
    if (error) throw error;

    res.status(200).send("Cliente creado");
  });
});

app.put("/clientes/update/:id", (req, res) => {
  // Recibimos el id a editar por como parámetro
  const id = req.params.id;

  // Recibimos los datos a actualizar en el body de la request
  const { nombre, apellido, ciudad, empresa } = req.body;

  // Query sql y update
  const sql =
    "UPDATE clientes SET nombre = ?, apellido = ?, ciudad = ?, empresa = ? WHERE id = ?";
  connection.query(sql, [nombre, apellido, ciudad, empresa, id], (error) => {
    if (error) throw error;
    res.status(200).send("Cliente actualizado");
  });
});

// Ruta para borrar el cliente especificado
app.delete("/clientes/delete/:id", (req, res) => {
  // Recibimos el id a borrar por como parámetro
  const id = req.params.id;

  // Query y borrado
  const sql = "DELETE FROM clientes WHERE id = ?";
  connection.query(sql, [id], (error) => {
    if (error) throw error;
    res.status(200).send("Cliente borrado");
  });
});

/*******   PRODUCTOS ***************/

// Función para obtener todos los productos de la bd
app.get("/productos", (req, res) => {
  // Query sql
  const sql = "SELECT * FROM productos";
  connection.query(sql, (error, results) => {
    // Si sale mal
    if (error) throw error;
    // Si hay resultados
    console.log(results);
    if (results.length > 0) {
      res.json(results);
    } else {
      res.send("No existen productos en la BBDD");
    }
  });
});

// Función para actualizar los datos de un producto en la bd
// cuando se realiza una compra
app.put("/productos/update/:id", (req, res) => {
  // Recibimos el id a editar por como parámetro
  const id = req.params.id;

  // Recibimos los datos a actualizar en el body de la request
  const { estado, stock } = req.body;

  // Query sql y update
  const sql = "UPDATE productos SET estado = ?, stock = ? WHERE id = ?";
  connection.query(sql, [estado, stock, id], (error) => {
    if (error) throw error;

    res.status(200).send("Producto actualizado");
  });
});

/*********  USUARIOS *****************/

// TODO Comprobar que no existe ya el usuario
// Ruta para registrar nuevos usuarios
app.post("/usuarios/add", (req, res) => {
  // Comprobamos que no exista ya el usuario en la BBDD
  const { email, password, admin } = req.body;

  // Definimos la query y consulta
  const sqlUser = "SELECT * FROM usuarios WHERE email = ?";
  connection.query(sqlUser, [email], (error, results) => {
    if (error) throw error;

    console.log(results);
    // Si hay algún resultado devolvemos una respuesta de error
    if (results.length > 0) {
      res.status(409).send({
        status: "error",
        message: "Ya existe un usuario con ese mail en la base de datos",
      });
    } else {
      // Query sql
      const sql = "INSERT INTO usuarios SET ?";

      // Objeto que recibe la bd
      const newUser = {
        email: email,
        password: password,
        admin: admin,
      };

      // Conexión y ejecución del SQL
      connection.query(sql, newUser, (error) => {
        if (error) throw error;

        res.status(200).send("Usuario registrado");
      });
    }
  });
});

// Método login que crea el token
app.post("/auth", (req, res) => {
  // Datos que llegan en el body: usuario y password
  const { email, password } = req.body;
  console.log(email, password);
  // Secuencia sql
  const sql = "SELECT * FROM usuarios WHERE email = ? AND password = ?";

  // Conexión a la bd
  connection.query(sql, [email, password], (error, results) => {
    let admin = null;

    console.log(results);

    if (error) throw error;

    // Si existe un usuario con ese email y password
    if (results.length > 0) {
      const payload = {
        check: true,
      };

      // Comprobamos si es administrador
      if (results[0].admin === 1) {
        admin = true;
      } else {
        admin = false;
      }

      const token = jwt.sign(payload, app.get("llave"), {
        expiresIn: "1 day",
      });

      console.log("Admin y token", admin, token);

      res.json({
        message: "Te has autentificado correctamente",
        token: token,
        isAdmin: admin,
        email: email,
      });
    } else {
      res
        .status(404)
        .send("No existe ningún usuario con ese email o contraseña");
    }
  });
});
