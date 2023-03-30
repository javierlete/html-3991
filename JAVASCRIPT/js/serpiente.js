'use strict';

let canvas, contexto;
const SALTO = 1; // píxeles
const INTERVALO = 3; // milisegundos
let tecla;

window.addEventListener('DOMContentLoaded', function() {
    canvas = document.getElementById('tablero');
    contexto = canvas.getContext('2d');

    const serpiente = new Serpiente(10, 10, 20, 20, 'blue');
    const fondo = new Fondo('lightgray');
    
    this.setInterval(function() {
        fondo.dibujar();

        switch(tecla) {
            case 'ArrowUp':
                serpiente.y -= SALTO;
                break;
            case 'ArrowDown':
                serpiente.y += SALTO;
                break;
            case 'ArrowLeft':
                serpiente.x -= SALTO;
                break;
            case 'ArrowRight':
                serpiente.x += SALTO;
                break;
        }

        serpiente.dibujar();
    }, INTERVALO);

    window.addEventListener('keydown', function(e) {
        tecla = e.code;
    });

});

class Serpiente {
    constructor(x, y, ancho, alto, color) {
        this.x = x;
        this.y = y;
        this.ancho = ancho;
        this.alto = alto;
        this.color = color;
    }

    dibujar() {
        contexto.fillStyle = this.color;
        contexto.fillRect(this.x, this.y, this.ancho, this.alto);
    }
}

class Fondo {
    constructor(color) {
        this.color = color;
    }

    dibujar() {
        contexto.fillStyle = this.color;
        contexto.fillRect(0, 0, canvas.width, canvas.height);
    }
}