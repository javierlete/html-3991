'use strict';

let canvas, contexto;
const SALTO = 1; // píxeles
const INTERVALO = 1; // milisegundos
let tecla;
let jugando = true;
let repeticion;
const TAMANO = 20;

window.addEventListener('DOMContentLoaded', function() {
    canvas = document.getElementById('tablero');
    contexto = canvas.getContext('2d');

    const serpiente = new Serpiente(10, 10, TAMANO, TAMANO, 'blue');
    const fondo = new Fondo('lightgray');
    
    repeticion = setInterval(function() {
        fondo.dibujar();

        switch(tecla) {
            case 'ArrowUp':
                serpiente.y -= SALTO;
                
                if(serpiente.y < 0) {
                    gameover();
                }

                break;
            case 'ArrowDown':
                serpiente.y += SALTO;
                
                if(serpiente.y > canvas.height - TAMANO - 1) {
                    gameover();
                }
                
                break;
            case 'ArrowLeft':
                serpiente.x -= SALTO;
                
                if(serpiente.x < 0) {
                    gameover();
                }
                
                break;
            case 'ArrowRight':
                serpiente.x += SALTO;
                
                if(serpiente.x > canvas.width - TAMANO - 1) {
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

    alert('Has perdido');
}