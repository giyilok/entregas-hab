'use strict';
/*Programa que simula el lanzamiento de un dado
de 6 caras y va sumando las puntuaciones obtenidas
en cada tirada. El programa termina cuando se
alcanza o supera los 50 puntos mostrando un 
mensaje de enhorabuena*/

//Funcion que devuelve el resultado de una tirada de un dado
//de 6 caras
function tiraDado() {
  for (let i = 0; i <= 30; i++) {
    return Math.ceil(Math.random() * 6);
  }
}

//Juego de tirar dado
function playDado() {
  let numTirada = 0;
  let puntuacion = 0;
  let tirada = 0;

  while (puntuacion < 50) {
    numTirada++;
    tirada = tiraDado();
    puntuacion += tirada;
    if (puntuacion < 50) {
      console.log(`Tirada ${numTirada}: ha salido un ${tirada}`);
    }
  }

  console.log(`¡Enhorabuena, ha salido un ${tirada}!
¡Has ganado un total de ${puntuacion} puntos!`);
}

playDado();
