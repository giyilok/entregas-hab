const fs = require("fs");
const fse = require("fs-extra");
const path = require("path");
const chalk = require("chalk");

[, , ...argv] = process.argv;

/*********************************************/
//Version síncrona errores con try...catch
/* for (const file of argv) {
  const fileRoute = path.join(__dirname, file);
  const parsedFile = path.parse(fileRoute);

  try {
    const content = fs.readFileSync(fileRoute);
    const stats = fs.statSync(fileRoute);
    if (stats.size < 10240) {
      console.log(
        chalk`{green.bold El contenido del fichero }{red "${parsedFile.base}"}{green.bold  es:}\n\n ${content}\n `
      );
    } else {
      console.error(
        chalk`{yellow El fichero }{red "${parsedFile.base}"}{yellow  es mayor de 10Kb y no se muestra el contenido}\n\n`
      );
    }
  } catch (error) {
    if (error.code === "ENOENT") {
      console.error(
        chalk`{red.bold El fichero "${parsedFile.base}" o la ruta "${parsedFile.dir}" no existen}\n\n`
      );
    } else {
      console.error(error);
    }
  }
} */

/*********************************************/
//Versión asíncrona con callbacks
/* for (const file of argv) {
  const fileRoute = path.join(__dirname, file);
  const parsedFile = path.parse(fileRoute);

  fs.readFile(fileRoute, "utf-8", (err, data) => {
    if (err) {
      if (err.code === "ENOENT") {
        console.error(
          chalk`{red.bold El fichero "${parsedFile.base}" o la ruta "${parsedFile.dir}" no existen}\n\n`
        );
      } else {
        console.error(err);
      }
    } else {
      fs.stat(fileRoute, function (err, stats) {
        if (err) console.log(err);

        if (stats.size < 10240) {
          console.log(
            chalk`{green.bold El contenido del fichero }{red "${parsedFile.base}"}{green.bold  es:}\n\n ${data}\n `
          );
        } else {
          return console.log(
            chalk`{yellow El fichero }{red "${parsedFile.base}"}{yellow  es mayor de 10Kb y no se muestra el contenido}\n\n`
          );
        }
      });
    }
  });
} */

/*********************************************/
//Versión asíncrona con promesas
/* for (const file of argv) {
  const fileRoute = path.join(__dirname, file);
  const parsedFile = path.parse(fileRoute);

  fse
    .readFile(fileRoute)
    .then((content) => {
      fse.stat(fileRoute).then((stats) => {
        if (stats.size < 10240) {
          console.log(
            chalk`{green.bold El contenido del fichero }{red "${parsedFile.base}"}{green.bold  es:}\n\n ${content}\n `
          );
        } else {
          console.error(
            chalk`{yellow El fichero }{red "${parsedFile.base}"}{yellow  es mayor de 10Kb y no se muestra el contenido}\n\n`
          );
        }
      });
    })
    .catch((error) => {
      if (error.code === "ENOENT") {
        console.error(
          chalk`{red.bold El fichero "${parsedFile.base}" o la ruta "${parsedFile.dir}" no existen}\n\n`
        );
      } else {
        console.error(error);
      }
    });
} */

/*********************************************/
//Versión asíncrona con async await
async function showFiles() {
  for (const file of argv) {
    const fileRoute = path.join(__dirname, file);
    const parsedFile = path.parse(fileRoute);

    try {
      const content = await fse.readFile(fileRoute);
      const stats = await fse.stat(fileRoute);

      if (stats.size < 10240) {
        console.log(
          chalk`{green.bold El contenido del fichero }{red "${parsedFile.base}"}{green.bold  es:}\n\n ${content}\n `
        );
      } else {
        console.error(
          chalk`{yellow El fichero }{red "${parsedFile.base}"}{yellow  es mayor de 10Kb y no se muestra el contenido}\n\n`
        );
      }
    } catch (error) {
      if (error.code === "ENOENT") {
        console.error(
          chalk`{red.bold El fichero "${parsedFile.base}" o la ruta "${parsedFile.dir}" no existen}\n\n`
        );
      } else {
        console.error(error);
      }
    }
  }
}

showFiles();
