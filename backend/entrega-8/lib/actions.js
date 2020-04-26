const fse = require("fs-extra");
const path = require("path");
const chalk = require("chalk");
const datefns = require("date-fns");
const formatDistance = require("date-fns/formatDistance");
const { es } = require("date-fns/locale");
const os = require("os");

const tasksPath = path.resolve(os.homedir(), "./tasks.json");

const state = {
  todos: [],
  lastUpdate: getDate(),
};

//Funcion para cargar o crear si aún no existe el fichero JSON con los  datos
function loadData() {
  //Comprobamos si existe el fichero task.json y si no lo crea
  fse.ensureFileSync(tasksPath);

  //Cargamos el fichero tasks.json
  const data = fse.readJsonSync(tasksPath, {
    throws: false,
  });

  if (!data) return;

  state.todos = data.todos;
}

//Funcion para calcular la distancia entre las fechas de modificacion
function getDistance({ lastUpdate }) {
  const distance = formatDistance(new Date(lastUpdate), new Date(), {
    locale: es,
    addSuffix: true,
    includeSeconds: true,
  });

  return distance;
}

//Funcion que devuelve la fecha y hora
function getDate() {
  const now = new Date();

  return now;
}

//Funcion para añadir la tarea
function addTodo({ text, priority }) {
  const existingTodo = state.todos.find(
    (todo) => todo.task.toLowerCase() === text.toLowerCase()
  );

  if (existingTodo) {
    throw new Error("Ya existe esta tarea en la lista");
  }

  const newTodo = {
    task: text,
    priority: priority,
    done: false,
    added: getDate(),
    lastUpdate: null,
  };

  state.todos.unshift(newTodo);

  saveChanges();
}

//Funcion para validar los indices
function checkIndex(index) {
  if (typeof index !== "number") {
    throw new Error("El índice debe ser un número");
  }

  if (index <= 0 || index > state.todos.length) {
    throw new Error("No existe ninguna tarea con ese número");
  }
}

//Funcion para marcar una tarea como hecha
function markAsDone({ index }) {
  checkIndex(index);

  state.todos[index - 1].done = true;

  state.todos[index - 1].lastUpdate = getDate();

  saveChanges();
}

//Funcion para desmarcar como hecha la tarea
function markAsUndone({ index }) {
  checkIndex(index);

  state.todos[index - 1].done = false;

  state.todos[index - 1].lastUpdate = getDate();

  saveChanges();
}

//Funcion para listar por consola toda la lista de tareas
function listTodos() {
  //Cabecera
  const headerDate = datefns.format(
    state.lastUpdate,
    "d 'de' MMMM 'de' yyyy '('EEEE')'",
    { locale: es }
  );
  console.log(
    chalk`\n\n{green.bold LISTA DE TAREAS:}\t\t{magentaBright Última actualización: ${headerDate})} \n\n\n`
  );
  console.log(chalk.green.bold("NÚMERO\tHECHA\tPRIORIDAD\tTAREA\n"));

  //Listamos las tareas
  for (const todo of state.todos) {
    const position = state.todos.indexOf(todo);

    const doneData = todo.done ? "Hecha!" : "";

    const priorityData = todo.priority ? "High" : "";

    console.log(
      chalk`Tarea ${
        position + 1
      }\t{bgGreenBright.black ${doneData}}\t{red ${priorityData}}\t\t{yellow.bold ${
        todo.task
      }}`
    );

    const addedData = datefns.format(
      new Date(todo.added),
      "d 'de' MMMM 'de' yyyy HH':'mm':'ss",
      { locale: es }
    );

    const modifiedData = todo.lastUpdate
      ? `Modificado: ${getDistance(todo)}`
      : "";

    console.log(
      chalk`\t\t\t\tAñadido: ${addedData} {magentaBright ${modifiedData}}\n`
    );
  }
}

//Funcion para listar por consola  la lista de tareas en formato tabla
function listTodosTable() {
  console.log(chalk.green("\nLista de tareas: \n"));
  console.table(state.todos);
}

//Funcion para borrar todas las tareas marcadas como realizadas
function cleanTodos() {
  const cleanList = state.todos.filter((todo) => todo.done === false);
  state.todos = cleanList;
  saveChanges();
}

//Funcion para borrar toda la lista de tareas
function cleanAllTodos() {
  state.todos = [];
  saveChanges();
}

//Funcion para guardar los cambios
function saveChanges() {
  state.lastUpdate = getDate();
  fse.outputJSONSync(tasksPath, state);
}

//Cargamos los datos guardados en el fichero
loadData();

module.exports = {
  loadData,
  addTodo,
  markAsDone,
  markAsUndone,
  listTodos,
  listTodosTable,
  cleanTodos,
  cleanAllTodos,
};
