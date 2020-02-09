'use strict';
/*Funcion que pasandole como argumento un string devulve true o false 
si es un palindromo o no */

function PalindromeTwo(str) {
  const strTest1 = str
    .toLowerCase()
    .split('')
    .filter((element) => element !== ' ');
    
  const strTest2 = strTest1.map((element, index) => strTest1[strTest1.length - 1 - index]);

  if (strTest1.join() === strTest2.join()) {
    console.log('Es palíndromo');
    return true;
  } else {
    console.log('No es palíndromo');
    return false;
  }
}
PalindromeTwo('A mama Roma le aviva el amor a papa y a papa Roma le aviva el amor a mama'));
