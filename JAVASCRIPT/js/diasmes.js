'use strict';

let mes, dias, respuesta;

do {
    mes = +prompt('Dime el mes que quieres');

    if (isNaN(mes)) {
        console.error('Debes introducir un número, no un texto');
    } else if (mes >= 1 && mes <= 12) {
        switch (mes) {
            case 2: dias = 28; break;
            case 4:
            case 6:
            case 9:
            case 11: dias = 30; break;
            default: dias = 31; break;
        }
    
        console.log(mes, dias);
    } else {
        console.error('Ese mes no es válido');
    }

    respuesta = confirm('¿Quieres introducir otro mes?');
} while (respuesta);
