// Indicando el uso de Axios para la API
const axios = require("axios").default;

// Base URL de la API
const apiUrl = "https://rickandmortyapi.com/api";

// Función para coger todos los chars con la API
function getAll() {
  return axios.get(`${apiUrl}/character`);
}

// Función para obetener los datos de un personaje por su ID
function getChar(id) {
  return axios.get(`${apiUrl}/character/` + id);
}

export default {
  getAll,
  getChar,
};
