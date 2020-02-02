'use strict';
/*Calculadora con 2 operandos y 5 operaciones:
Suma, resta, multiplicacion, division y operando1 elevado a
operando2*/

//Asignar a estas variables los operandos deseados y la operacion
//a realizar (suma="+", resta="-", multiplicacion="*", division="/",
//potencia de operando1 elevado a operando2="**")
let operando1 = 4;
let operando2 = 2;
let operacion = '%';

//Funciones genericas de operacion
function sumar(value1, value2) {
  return value1 + value2;
}

function restar(value1, value2) {
  return value1 - value2;
}

function multiplicar(value1, value2) {
  return value1 * value2;
}

function dividir(value1, value2) {
  return value1 / value2;
}

function pot(value1, value2) {
  return value1 ** value2;
}

//Calculadora usando If ... else
function calcularConIf(operando1, operacion, operando2) {
  if (operacion === '+') {
    return sumar(operando1, operando2);
  } else if (operacion === '-') {
    return restar(operando1, operando2);
  } else if (operacion === '*') {
    return multiplicar(operando1, operando2);
  } else if (operacion === '/') {
    return dividir(operando1, operando2);
  } else if (operacion === '**') {
    return pot(operando1, operando2);
  } else return 'No se ha seleccionado ninguna operación de las aceptadas';
}

console.log(calcularConIf(operando1, operacion, operando2));

//Calculadora usando switch ...case
function calcularConSwitch(operando1, operacion, operando2) {
  let resultado;
  switch (operacion) {
    case '+':
      resultado = sumar(operando1, operando2);
      break;
    case '-':
      resultado = restar(operando1, operando2);
      break;

    case '*':
      resultado = multiplicar(operando1, operando2);
      break;

    case '/':
      resultado = dividir(operando1, operando2);
      break;

    case '**':
      resultado = pot(operando1, operando2);
      break;

    default:
      resultado = 'No se ha seleccionado ninguna operación de las aceptadas';
      break;
  }
  return resultado;
}

console.log(calcularConSwitch(operando1, operacion, operando2));
