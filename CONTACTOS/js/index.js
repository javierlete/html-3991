'use strict';

const URL = 'http://localhost:3000/contactos';

let ulContactos;
let contactos;

window.addEventListener('DOMContentLoaded', async () => {
    ulContactos = document.querySelector('#contactos');
    const inputBusqueda = document.querySelector('form input[type=search]');

    inputBusqueda.addEventListener('keyup', e => {
        const busqueda = e.target.value;

        const contactosFiltrados = contactos.filter(
            // Esta c es diferente de la otra porque están en diferentes ámbitos
            c => {
                const nombreCompleto = c.nombre + ' ' + c.apellidos;
                const nombreLimpio = normalizar(nombreCompleto);
                const busquedaLimpia = normalizar(busqueda);

                return nombreLimpio.includes(busquedaLimpia);
            }
        );
        listarContactos(contactosFiltrados);
    });

    const respuesta = await fetch(URL);
    contactos = await respuesta.json();

    listarContactos(contactos);
});

function normalizar(texto) {
    return texto.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function listarContactos(contactos) {
    ulContactos.innerHTML = '';

    for (const c of contactos) {
        const li = document.createElement('li'); // <li></li>
        li.innerHTML = `
            <span class="text-bg-secondary rounded-circle p-1 px-2">${c.nombre[0]}</span>
            ${c.nombre} ${c.apellidos}`;

        li.className = 'list-group-item border-0';

        ulContactos.appendChild(li);
    }
}

