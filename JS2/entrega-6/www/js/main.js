"use strict";

const urlExchange = "https://api.exchangerate-api.com/v4/latest/";

const selects = document.querySelectorAll("select");
const button = document.getElementById("turn");
const money = document.getElementById("money");
const result = document.getElementById("result");

//Funcion para obtener los rates de la API
async function getRates(url) {
  return await (await fetch(url)).json();
}

//Funcion para añadir los nombres de los rates a los selectores
async function fillSelect() {
  try {
    const data = await getRates(urlExchange + "AED");
    const fragment = document.createDocumentFragment();

    for (const select of selects) {
      for (const rate in data.rates) {
        const option = document.createElement("option");
        option.setAttribute("value", rate);
        option.innerText = rate;
        fragment.append(option);
      }
      select.append(fragment);
    }
  } catch (error) {
    console.error(error);
  }
}

//Funcion para calcular y presentar el resultado con los rates seleccionados
function calculateExchange(ammount, currencyCode1, currencyCode2) {
  const urlExchange1 = urlExchange + currencyCode1;

  getRates(urlExchange1).then(change => {
    const result1 =
      Math.round(ammount * change.rates[currencyCode2] * 100) / 100;
    result.textContent = `${ammount} ${currencyCode1} son ${result1} ${currencyCode2}`;
  });
}

//Handler del boton convertir
function handlerButton(event) {
  event.preventDefault();
  if (!money.value) money.value = 0;
  calculateExchange(money.value, selects[0].value, selects[1].value);
}

//Funcion principal que controla el estado de la aplicacion
function main() {
  fillSelect();

  button.addEventListener("submit", handlerButton);
}

main();
