'use strict';
/*Programa que proporcionando los resultados de los tres
ultimos partidos de tres equipos distintos, calcula la media
de cada equipo y devuelve por consola el equipo conla media
mas alta. Para practicar, lo resolvemos con lo que sabemos hasta
ahora de objetos y arrays*/

//Constructor
function Equipo(nombre, resultados) {
  this.nombre = nombre;
  this.resultados = resultados;
  this.media = 0;
}

//Funcion que devuelve la media redondeada de los n ultimos
//resultados de un equipo, pasando como parametro un array
//con los ultimos resultados
function calcularMedia(puntuacionesPartidos) {
  let sumaPuntos = 0;
  for (let i = 0; i < puntuacionesPartidos.length; i++) {
    sumaPuntos += puntuacionesPartidos[i];
  }
  return Math.round(sumaPuntos / puntuacionesPartidos.length);
}

//Devuelve la media mas alta de una coleccion de equipos,
//ordenando las medias de menor a mayor y recuperando
//la ultima posicion
function obtenerMediaMasAlta(arrayEquipos) {
  let arrayMedias = new Array(arrayEquipos.length);
  for (let i = 0; i < arrayMedias.length; i++) {
    arrayMedias[i] = arrayEquipos[i].media;
  }
  arrayMedias.sort(function(a, b) {
    return a - b;
  });
  return arrayMedias[arrayMedias.length - 1];
}

//Devuelve el nombre del equipo con la media más alta
function obtenerEquipo(equipos, media) {
  for (let i = 0; i < equipos.length; i++) {
    if (equipos[i].media === media) {
      return equipos[i].nombre;
    }
  }
}

//Funcion principal que saca por consola el equipo
//con la mejor media
function calcularMejorEquipo() {
  const equipos = [
    new Equipo('Maria', [62, 34, 55]),
    new Equipo('Paula', [35, 60, 59]),
    new Equipo('Rebeca', [40, 39, 63])
  ];

  for (let i = 0; i < equipos.length; i++) {
    equipos[i].media = calcularMedia(equipos[i].resultados);
  }

  let mediaMasAlta = obtenerMediaMasAlta(equipos);
  console.log(
    `El equipo con la media más alta es el equipo ${obtenerEquipo(
      equipos,
      mediaMasAlta
    )} con una media de ${mediaMasAlta}`
  );
}

calcularMejorEquipo();
