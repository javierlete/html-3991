'use strict';

window.addEventListener('DOMContentLoaded', function() {
    const span = document.getElementById('resultado');
    const cuadroTexto = document.getElementById('nombre');
    const boton = document.getElementById('saludar');

    console.log(span, cuadroTexto, boton);

    boton.addEventListener('click', function() {
        span.innerHTML = 'Hola ' + cuadroTexto.value;
    });
});