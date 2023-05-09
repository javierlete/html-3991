'use strict';

const URL = 'http://localhost:3000/contactos';

let ulContactos;
let contactos;
let spanNumeroContactos;
let listadoContactos;
let detalleContacto;

let form;
let inputId;
let inputNombre;
let inputApellidos;
let inputEmpresa;
let inputTelefono;
let inputEtiqueta;
let inputEmail;
let inputEtiquetaEmail;
let inputFecha;
let inputEtiquetaFecha;

window.addEventListener('DOMContentLoaded', async () => {
    form = document.querySelector('#listado-contactos form');
    inputId = document.querySelector('#id');
    inputNombre = document.querySelector('#nombre');
    inputApellidos = document.querySelector('#apellidos');
    inputEmpresa = document.querySelector('#empresa');
    inputTelefono = document.querySelector('#telefono');
    inputEtiqueta = document.querySelector('#etiqueta');
    inputEmail = document.querySelector('#email');
    inputEtiquetaEmail = document.querySelector('#etiqueta-email');
    inputFecha = document.querySelector('#fecha');
    inputEtiquetaFecha = document.querySelector('#etiqueta-fecha');

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

    await cargarContactos();
});

async function cargarContactos() {
    contactos = (await axios.get(URL)).data;

    mostrarListado();
    listarContactos(contactos);
}

async function guardarContacto() {
    const id = inputId.value;
    const nombre = inputNombre.value;
    const apellidos = inputApellidos.value;
    const empresa = inputEmpresa.value;
    const telefono = inputTelefono.value;
    const etiqueta = inputEtiqueta.value;
    const email = inputEmail.value;
    const etiquetaEmail = inputEtiquetaEmail.value;
    const fecha = inputFecha.value;
    const etiquetaFecha = inputEtiquetaFecha.value;

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

    if(id) {
        contacto.id = id;

        const respuesta = await axios.put(`${URL}/${id}`, contacto);
    } else {
        const respuesta = await axios.post(URL, contacto);
    }

    await cargarContactos();
}

function mostrarListado() {
    detalleContacto.style.display = 'none';
    listadoContactos.style.display = 'block';
}

async function mostrarFormulario(e) {
    detalleContacto.style.display = 'block';
    listadoContactos.style.display = 'none';

    const id = e?.target?.dataset?.id;

    if (id) {
        const c = (await axios.get(`${URL}/${id}`)).data;

        inputId.value = c.id ? c.id: '';
        inputNombre.value = c.nombre ? c.nombre: '';
        inputApellidos.value = c.apellidos ? c.apellidos: '';
        inputEmpresa.value = c.empresa ? c.empresa: '';
        inputTelefono.value = c.telefono ? c.telefono: '';
        inputEtiqueta.value = c.etiqueta ? c.etiqueta: '';
        inputEmail.value = c.email ? c.email: '';
        inputEtiquetaEmail.value = c.etiquetaEmail ? c.etiquetaEmail: '';
        inputFecha.value = c.fecha ? c.fecha: '';
        inputEtiquetaFecha.value = c.etiquetaFecha ? c.etiquetaFecha: '';
    } else {
        inputId.value = '';
        inputNombre.value = '';
        inputApellidos.value = '';
        inputEmpresa.value = '';
        inputTelefono.value = '';
        inputEtiqueta.value = '';
        inputEmail.value = '';
        inputEtiquetaEmail.value = '';
        inputFecha.value = '';
        inputEtiquetaFecha.value = '';
    }
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

        li.dataset.id = c.id;

        li.addEventListener('click', mostrarFormulario);

        ulContactos.appendChild(li);
    }

    spanNumeroContactos.innerHTML = contactos.length + ' contacto' + (contactos.length == 1 ? '' : 's');
}

