'use strict';

const URL_VIVIENDAS = 'http://localhost:3000/viviendas/';

let tbody, nombre, direccion, alquiler, venta, precio, form;

window.addEventListener('DOMContentLoaded', () => {
    tbody = document.querySelector('tbody');

    nombre = document.querySelector('#nombre');
    direccion = document.querySelector('#direccion');
    alquiler = document.querySelector('#alquiler');
    venta = document.querySelector('#venta');
    precio = document.querySelector('#precio');
    
    form = document.querySelector('form');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        guardar();
    })

    listado();
});

async function listado() {
    const response = await fetch(URL_VIVIENDAS);
    const viviendas = await response.json();

    tbody.innerHTML = '';

    viviendas.forEach(vivienda => {
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <th>${vivienda.nombre}</th>
            <td>${vivienda.direccion}</td>
            <td>${vivienda.tipo}</td>
            <td>${vivienda.precio}</td>
            <td><a href="javascript:editar(${vivienda.id})" class="btn btn-primary">Editar</a><a href="javascript:borrar(${vivienda.id})" class="btn btn-danger">Borrar</a></td>
        `;

        tbody.appendChild(tr);
    });
}

async function borrar(id) {
    const respuesta = await fetch(URL_VIVIENDAS + id, {
        method: 'DELETE'
    });

    console.log(respuesta);

    listado();
}

async function editar(idEditar) {
    const response = await fetch(URL_VIVIENDAS + idEditar);
    const vivienda = await response.json();

    id.value = vivienda.id;
    nombre.value = vivienda.nombre;
    direccion.value = vivienda.direccion;
    
    switch(vivienda.tipo) {
        case 'Alquiler':
            alquiler.checked = true;
            break;
        case 'Venta':
            venta.checked = true;
            break;
    }

    precio.value = vivienda.precio;
}

function anyadir() {
    id.value = nombre.value = direccion.value = precio.value = '';
    alquiler.checked = venta.checked = false;
}

async function guardar() {
    const vivienda = {
        nombre: nombre.value,
        direccion: direccion.value,
        tipo: alquiler.checked ? 'Alquiler' : 'Venta',
        precio: precio.value
    };

    let respuesta;

    if(id.value) {
        vivienda.id = +id.value;

        respuesta = await fetch(URL_VIVIENDAS + vivienda.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(vivienda)
        });
    } else {
        respuesta = await fetch(URL_VIVIENDAS, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(vivienda)
        });
    }

    console.log(respuesta);

    listado();
}