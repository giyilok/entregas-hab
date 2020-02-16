'use strict';

//Funcion asincrona para pedir los datos al servidor pasando la url
//de la API indicada
async function getExchangeRate(url) {
  return await (await fetch(url)).json();
}

/**
 * Funcion generica para pasar una cantidad en una moneda y
 * obtener el cambio en otra que a su vez se pasa a otro tipo de moneda
 * @ammount {number}la cantidad que se quiere cambiar
 * @currencyCode {string} el codigo de moneda sobre la cual se va a cambiar
 * @currencyCode1 {string} el codigo de moneda para el primer cambio
 * @currencyCode2 {string} el codego de moneda para el segundo cambio
 */
function getExchange(ammount, currencyCode, currencyCode1, currencyCode2) {
  const urlExchange = 'https://api.exchangerate-api.com/v4/latest/';
  const urlExchange1 = urlExchange + currencyCode;
  const urlExchange2 = urlExchange + currencyCode1;
  const promises = [getExchangeRate(urlExchange1), getExchangeRate(urlExchange2)];

  Promise.all(promises).then((changes) => {
    const result1 = Math.round(ammount * changes[0].rates[currencyCode1] * 100) / 100;
    const result2 = Math.round(result1 * changes[1].rates[currencyCode2] * 100) / 100;
    console.log(`${ammount} ${currencyCode} son ${result1} ${currencyCode1}`);
    console.log(`${result1} ${currencyCode1} son ${result2} ${currencyCode2} `);
  });
}

getExchange(20, 'EUR', 'USD', 'JPY');
