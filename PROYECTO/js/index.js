'use strict';

const URL_VIVIENDAS = 'http://localhost:3000/viviendas/';

let viviendasDiv, imagen, nombre, precio, inputs;
let vivienda, todas, alquiler, venta, min, max;

window.addEventListener('DOMContentLoaded', () => {
    viviendasDiv = document.querySelector('#viviendas');
    
    imagen = document.querySelector('#imagen');
    nombre = document.querySelector('#nombre');
    precio = document.querySelector('#precio');

    inputs = document.querySelectorAll('input');

    vivienda = document.querySelector('#vivienda');
    todas = document.querySelector('#todas');
    alquiler = document.querySelector('#alquiler');
    venta = document.querySelector('#venta');
    min = document.querySelector('#min');
    max = document.querySelector('#max');

    inputs.forEach(input => {
        input.addEventListener('input', () => {
            filtrar();
        });
    });

    listado();
});

async function listado() {
    const response = await fetch(URL_VIVIENDAS);
    const viviendas = await response.json();

    viviendasDiv.innerHTML = '';

    viviendas.forEach(vivienda => {
        const viviendaDiv = document.createElement('div');
        viviendaDiv.classList.add('col');
        
        viviendaDiv.innerHTML = `
            <div class="card h-100">
                <img src="${vivienda.imagen}" class="card-img-top" alt="">
                <div class="card-body">
                    <h5 class="card-title">${vivienda.nombre}</h5>
                    <p class="card-text">${vivienda.tipo}: ${vivienda.precio}</p>
                    <a href="javascript:detalle(${vivienda.id})" class="btn btn-primary stretched-link">Ver detalle</a>
                </div>
            </div>
        `;

        viviendasDiv.appendChild(viviendaDiv);
    });
}

async function detalle(id) {
    const respuesta = await fetch(URL_VIVIENDAS + id);
    const vivienda = await respuesta.json();

    console.log(vivienda);

    imagen.src = vivienda.imagen;
    nombre.innerHTML = vivienda.nombre;
    precio.innerHTML = vivienda.precio;
}

async function filtrar() {
    const response = await fetch(URL_VIVIENDAS);
    const viviendas = await response.json();

    viviendasDiv.innerHTML = '';

    const viviendasFiltradas = viviendas.filter(v => {
        const seLlamaIgual = v.nombre.toLowerCase().includes(vivienda.value.toLowerCase());
        const tipo = todas.checked ? 'Todas' : alquiler.checked ? 'Alquiler' : venta.checked ? 'Venta' : '';
        const mismoTipo = tipo === 'Todas' ? true : v.tipo === tipo;
        const dentroDelPrecio = v.precio >= min.value && v.precio <= max.value;

        return seLlamaIgual && mismoTipo && dentroDelPrecio;
    })

    viviendasFiltradas.forEach(vivienda => {
        const viviendaDiv = document.createElement('div');
        viviendaDiv.classList.add('col');
        
        viviendaDiv.innerHTML = `
            <div class="card h-100">
                <img src="${vivienda.imagen}" class="card-img-top" alt="">
                <div class="card-body">
                    <h5 class="card-title">${vivienda.nombre}</h5>
                    <p class="card-text">${vivienda.tipo}: ${vivienda.precio}</p>
                    <a href="javascript:detalle(${vivienda.id})" class="btn btn-primary stretched-link">Ver detalle</a>
                </div>
            </div>
        `;

        viviendasDiv.appendChild(viviendaDiv);
    });
}