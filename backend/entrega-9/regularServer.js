require("dotenv").config();
const express = require("express");
const http = require("http");
const morgan = require("morgan");

const port = process.env.PORT;

//Versión con http
/* const server = http.createServer();

server.on("request", (request, response) => {
  const hourNow = new Date().getHours();

  request.on("error", (error) => {
    console.error(error);
  });

  //Comprobamos que cuando se pida la ruta "/" sea por la mañana,
  //considerando "mañana española" de 08:00 a 14:00
  if (request.url === "/" && hourNow >= 8 && hourNow < 14) {
    response.statusCode = 200;
    response.setHeader("Content-type", "text/plain; charset=utf-8");
    response.end("Hola");
  } else {
    //Si no es por la mañana respondemos con un error 404
    response.statusCode = 404;
    response.setHeader("Content-type", "text/plain; charset=utf-8");
    response.end("Non se atopou a páxina. Volva a intentalo pola mañá.");
  }
});

server.listen(port);
console.log(`Servidor web listo e rulando en http://localhost:${port}`);
 */

/************************************************ */
//Versión con express
const app = express();

app.use(morgan("combined"));

app.get("/", function (req, res, next) {
  const hourNow = new Date().getHours();
  console.log(hourNow);
  //Comprobamos que cuando se pida la ruta "/" sea por la mañana,
  //considerando "mañana española" de 08:00 a 14:00
  if (hourNow >= 8 && hourNow < 14) {
    res.statusCode = 200;
    res.setHeader("Content-type", "text/plain; charset=utf-8");
    res.send("Hola");
  }

  next();
});

app.use(function (err, req, res, next) {
  res.statuscode = 500;
  res.end(`Error:  ${err.message}`);
});

app.use(function (req, res) {
  res.statusCode = 404;
  res.setHeader("Content-type", "text/plain; charset=utf-8");
  res.end("Non se atopou a páxina. Volva a intentalo pola mañá.");
});

app.listen(port);
