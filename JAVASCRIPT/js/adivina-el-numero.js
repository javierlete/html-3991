'use strict';

const numeroAdivinar = Math.floor(Math.random() * 100) + 1;

let numero;

do {
    numero = +prompt('Dime un número entre 1 y 100');

    if(numeroAdivinar > numero) {
        console.log('El número es MAYOR');
    } else if(numeroAdivinar < numero) {
        console.log('El número es menor');
    }
} while (numeroAdivinar !== numero);

console.log('Has acertado');