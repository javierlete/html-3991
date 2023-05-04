'use strict';

const URL = 'http://localhost:3000/contactos';

window.addEventListener('DOMContentLoaded', async () => {
    const ulContactos = document.querySelector('#contactos');
    const respuesta = await fetch(URL);

    console.log("respuesta", respuesta);

    const contactos = await respuesta.json();

    console.log("contactos", contactos);

    ulContactos.innerHTML = '';

    for (const c of contactos) {
        const li = document.createElement('li'); // <li></li>
        li.innerHTML = `
            <span class="text-bg-secondary rounded-circle p-1 px-2">${c.nombre[0]}</span>
            ${c.nombre} ${c.apellidos}`;
        
        li.className = 'list-group-item border-0';

        ulContactos.appendChild(li);
    }
});
