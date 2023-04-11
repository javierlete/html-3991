'use strict';

const URL = 'http://localhost:3000/canciones/';
let ulCanciones;
let form;
let iframe;
let tbody;
let idInput, tituloInput, artistaInput, generoInput, urlInput;

window.addEventListener('DOMContentLoaded', async function () {
    ulCanciones = document.getElementById('canciones');
    iframe = document.querySelector('iframe');
    tbody = document.querySelector('tbody');
    idInput = document.getElementById('id');
    tituloInput = document.getElementById('titulo');
    artistaInput = document.getElementById('artista');
    generoInput = document.getElementById('genero');
    urlInput = document.getElementById('url');

    form = document.querySelector('form');
    
    form.addEventListener('submit', guardar);

    await listado();
});

async function guardar(e) {
    e.preventDefault();

    const cancion = {
        titulo: tituloInput.value,
        artista: artistaInput.value,
        genero: generoInput.value,
        url: urlInput.value
    };

    const id = Number(idInput.value);
    let metodo;
    let url = URL;

    if (id) {
        metodo = 'PUT';
        url += id;

        cancion.id = id;
    } else {
        metodo = 'POST';
    }

    console.log(metodo, url, cancion);

    const respuesta = await fetch(url, {
        method: metodo,
        body: JSON.stringify(cancion),
        headers: { 'Content-Type': 'application/json' },
    });

    console.log(respuesta);

    form.reset();

    await listado();
}

async function listado() {
    const respuesta = await fetch(URL);
    const canciones = await respuesta.json();

    let li;
    ulCanciones.innerHTML = '';
    canciones.forEach(cancion => {
        li = document.createElement('li');
        li.innerHTML = `<a href="javascript:ver(${cancion.id})">${cancion.titulo}</a>`; // `<iframe src="${cancion.url}" title="${cancion.titulo}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;  // JSON.stringify(cancion);

        ulCanciones.appendChild(li);
    });

    let tr;
    tbody.innerHTML = '';
    canciones.forEach(cancion => {
        tr = document.createElement('tr');
        tr.innerHTML = `
            <th>${cancion.id}</th>
            <td>${cancion.titulo}</td>
            <td>${cancion.artista}</td>
            <td>${cancion.genero}</td
            <td>
                <a href="javascript:editar(${cancion.id})">Editar</a>
                <a href="javascript:borrar(${cancion.id})">Borrar</a>
            </td>`;

        tbody.appendChild(tr);
    });
}

async function ver(id) {
    const respuesta = await fetch(URL + id);
    const cancion = await respuesta.json();

    iframe.src = cancion.url;
}

async function editar(id) {
    const respuesta = await fetch(URL + id);
    const cancion = await respuesta.json();

    idInput.value = cancion.id;
    tituloInput.value = cancion.titulo;
    artistaInput.value = cancion.artista;
    generoInput.value = cancion.genero;
    urlInput.value = cancion.url;
}

async function borrar(id) {
    const respuesta = await fetch(URL + id, {
        method: 'DELETE'
    });

    console.log(respuesta);

    await listado();
}