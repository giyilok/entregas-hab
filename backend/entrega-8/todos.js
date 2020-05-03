const minimist = require("minimist");

//Importamos las funciones de accion del modulo actions
const {
  addTodo,
  markAsDone,
  markAsUndone,
  listTodos,
  listTodosTable,
  cleanTodos,
  cleanAllTodos,
} = require("./lib/actions.js");

//Capturar los argumentos con minimist
[, , ...argv] = process.argv;
const {
  _,
  priority,
  list,
  listAsTable,
  done,
  undone,
  clean,
  cleanAll,
} = minimist(argv);

async function main() {
  try {
    //Procesamos las opciones
    if (clean) {
      await cleanTodos();
      process.exit();
    }

    if (cleanAll) {
      await cleanAllTodos();
      process.exit();
    }

    if (list) {
      listTodos();
      process.exit();
    }

    if (listAsTable) {
      listTodosTable();
      process.exit();
    }

    if (done) {
      await markAsDone({ index: done });
      process.exit();
    }

    if (undone) {
      await markAsUndone({ index: undone });
      process.exit();
    }

    if (_ != "") {
      await addTodo({
        text: _.join(" "),
        priority,
      });
    } else {
      throw new Error("Debe introducir algún argumento válido");
    }
  } catch (error) {
    console.error(error);
  }
}

main();
