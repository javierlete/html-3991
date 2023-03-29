'use strict';

// Función constructora
function Persona(id, nombre, apellidos) {
    this.id = id;
    this.nombre = nombre;
    this.apellidos = apellidos;
}

// Método getNombreCompleto para el prototipo Persona
Persona.prototype.getNombreCompleto = function () {
    return `${this.nombre} ${this.apellidos}`;
};

const persona1 = new Persona(1, 'Javier', 'Lete');
const persona2 = new Persona(2, 'Pepe');

console.log(typeof persona1, persona1);
console.log(typeof persona2, persona2);

const personas = [persona1, persona2];

for(let p of personas) {
    console.log(p.getNombreCompleto());
}