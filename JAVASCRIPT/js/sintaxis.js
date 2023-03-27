'use strict';
/*
Comentario multilínea
*/

// Comentario de línea

// alert('Prueba');

// nombre = prompt('Dime tu nombre');

// console.log('Hola ' + nombre);

// console.log(`Hola ${nombre}`); // ES2015

const x = 6; // +prompt('X');
const y = 5; // parseInt(prompt('Y'));

console.log(x, typeof x);
console.log(y, typeof y);

let suma = 0;

suma = x + y;

console.log('El resultado de ' + x + ' + ' + y + ' = ' + suma);
console.log(`El resultado de ${x} + ${y} = ${suma}`);

let arrancado = false;

const arr = []; // new Array(3);

arr[0] = 5;
arr[1] = 6;
arr[2] = 7;
arr[3] = 8;

arr.push(9, 10, 11);

arr[20] = 12;

arr[15] = 'Pepe';

arr['Yepa'] = 'Vale';
arr.otro = 'También vale';

console.log(arr[1]);

console.log(arr['otro']);
console.log(arr.Yepa);

console.log(typeof arr, arr);
console.log(arr.length);

