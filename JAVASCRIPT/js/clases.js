'use strict';

class Persona {
    // Constructor
    constructor(id, nombre, apellidos) {
        this.id = id;
        this.nombre = nombre;
        this.apellidos = apellidos;
    }
    // Método getNombreCompleto
    getNombreCompleto() {
        return `${this.nombre} ${this.apellidos || ''}`;
    }
}

const persona1 = new Persona(1, 'Javier', 'Lete');
const persona2 = new Persona(2, 'Pepe');

const personas = [persona1, persona2, { id: 3, nombre: 'Juan' }];

for(let p of personas) {
    // console.log(p);
    
    p.getNombreCompleto && console.log(p.getNombreCompleto());
}
