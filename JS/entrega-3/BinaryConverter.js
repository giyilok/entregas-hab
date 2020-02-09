'use strict';

/*Funcion que devuelve el quivalente en decimal del valor binario
pasado como string*/

function BinaryConverter(str) {
  const strArray = str.split('');
  let decimalValor = strArray.reduce(
    (accDecimal, digit, index) => accDecimal + digit * Math.pow(2, strArray.length - index - 1),
    0
  );
  return decimalValor;
}

console.log(BinaryConverter('11110000'));
