'use strict';
/*Funcion que pasandole un string devuleve la primera palabra de
mayor longitud en el string*/

function LetterCount(str) {
  let longWord = '';
  let strParts = str.split(' ');
  for (const word of strParts) {
    if (word.length > longWord.length) {
      longWord = word;
    }
  }
  return longWord;
}

console.log(LetterCount('Hola soy un ninja localizando palabras largas'));
