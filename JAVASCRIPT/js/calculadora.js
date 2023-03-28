'use strict';

let operando1, operando2, operacion;

function pedirDatos() {
    operando1 = +prompt('Operando 1');
    operacion = prompt('Operación');
    operando2 = +prompt('Operando 2');
}

function hacerCalculo() {
    switch(operacion) {
        case '+': return operando1 + operando2;
        case '-': return operando1 - operando2;
        case '*': return operando1 * operando2;
        case '/': return operando1 / operando2;
        default: throw 'No se conoce esa operación';
    }
}

function mostrarResultado(resultadoRecibido) {
    console.log(`El resultado de ${operando1} ${operacion} ${operando2} = ${resultadoRecibido}`);
}

pedirDatos();
const resultado = hacerCalculo();
mostrarResultado(resultado);
