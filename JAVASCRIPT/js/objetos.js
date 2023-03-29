'use strict';

const persona = new Object();

persona.nombre = 'Javier';
persona.apellido = 'Lete';

persona.hobbies = [ 'Música', 'Informática' ];

console.log(persona);

console.log(persona.hobbies[1]);

console.log({ id: 5, nombre: 'Otro ejemplo' });

const persona2 = {
    nombre: 'Pepe',
    apellido: 'Pérez',
    hobbies: [ 'Macramé', 'Ramen' ]
};

console.log(persona2);
console.log(persona2.nombre);
console.log(persona2['apellido']);

const personas = [ persona, persona2, { nombre: 'Juan' }];

personas[1].apellidos = 'Pérez González';

console.log(personas);

console.log(typeof funcionNombreCompleto);

persona.nombreCompleto = funcionNombreCompleto;

persona.apellido = 'Letengo que decir algo';

console.log('PERSONA NOMBRE COMPLETO', persona.nombreCompleto());
console.log('NOMBRE COMPLETO', funcionNombreCompleto.bind(persona)());

function funcionNombreCompleto() {
    return `${this.nombre} ${this.apellido}`;
}
