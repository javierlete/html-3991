'use strict';

let canvas, contexto;
const SALTO = 20; // píxeles
const INTERVALO = 200; // milisegundos
let tecla;
let jugando = true;
let repeticion;
const TAMANO = 20;

window.addEventListener('DOMContentLoaded', function() {
    canvas = document.getElementById('tablero');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 4;

    contexto = canvas.getContext('2d');

    const serpiente = new Serpiente(TAMANO, TAMANO, TAMANO, TAMANO, 'blue');
    const manzana = new Serpiente(20, 80, TAMANO, TAMANO, 'green');
    const fondo = new Fondo('lightgray');
    
    repeticion = setInterval(function() {
        fondo.dibujar();

        manzana.dibujar();

        switch(tecla) {
            case 'ArrowUp':
                serpiente.y -= SALTO;
                
                if(serpiente.y <= 0) {
                    gameover();
                }

                break;
            case 'ArrowDown':
                serpiente.y += SALTO;
                
                if(serpiente.y >= canvas.height - TAMANO - 1) {
                    gameover();
                }
                
                break;
            case 'ArrowLeft':
                serpiente.x -= SALTO;
                
                if(serpiente.x <= 0) {
                    gameover();
                }
                
                break;
            case 'ArrowRight':
                serpiente.x += SALTO;
                
                if(serpiente.x >= canvas.width - TAMANO - 1) {
                    gameover();
                }
                
                break;
        }

        serpiente.dibujar();
    }, INTERVALO);

    window.addEventListener('keydown', function(e) {
        tecla = e.code;
        console.log(tecla);
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

function gameover() {
    tecla = undefined;

    clearInterval(repeticion);

    contexto.font = '700 40px/2 sans-serif';
    contexto.fillStyle = 'black';
    contexto.fillText('Has perdido', 0, 40);
}
