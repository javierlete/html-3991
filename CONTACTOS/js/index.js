'use strict';

const URL = 'http://localhost:3000/contactos';

let ulContactos;
let contactos;
let spanNumeroContactos;
let listadoContactos;
let detalleContacto;

window.addEventListener('DOMContentLoaded', async () => {
    listadoContactos = document.querySelector("#listado-contactos");
    detalleContacto = document.querySelector("#detalle-contacto");
    
    ulContactos = document.querySelector('#contactos');
    spanNumeroContactos = document.querySelector('main header span:last-of-type');
    const inputBusqueda = document.querySelector('form input[type=search]');
    inputBusqueda.addEventListener('input', filtrar);

    const agregar = document.querySelector('#agregar');
    agregar.addEventListener('click', mostrarFormulario);

    const cerrar = document.querySelector('.btn-close');
    cerrar.addEventListener('click', mostrarListado);

    const guardar = document.querySelector('#guardar');
    guardar.addEventListener('click', guardarContacto);

    const respuesta = await fetch(URL);
    contactos = await respuesta.json();

    mostrarListado();
    listarContactos(contactos);
});

async function guardarContacto() {
    const nombre = document.querySelector('#nombre').value;
    const apellidos = document.querySelector('#apellidos').value;
    const empresa = document.querySelector('#empresa').value;
    const telefono = document.querySelector('#telefono').value;
    const etiqueta = document.querySelector('#etiqueta').value;
    const email = document.querySelector('#email').value;
    const etiquetaEmail = document.querySelector('#etiqueta-email').value;
    const fecha = document.querySelector('#fecha').value;
    const etiquetaFecha = document.querySelector('#etiqueta-fecha').value;

    const contacto = {
        nombre,
        apellidos,
        empresa,
        telefono,
        etiqueta,
        email,
        etiquetaEmail,
        fecha,
        etiquetaFecha
    };

    const respuesta = await fetch(URL, {
        method: 'POST',
        body: JSON.stringify(contacto),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

function mostrarListado() {
    detalleContacto.style.display = 'none';
    listadoContactos.style.display = 'block';
}

function mostrarFormulario() {
    detalleContacto.style.display = 'block';
    listadoContactos.style.display = 'none';
}
function filtrar(e) {
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
}

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

    spanNumeroContactos.innerHTML = contactos.length + ' contacto' + (contactos.length == 1 ? '' : 's');
}

