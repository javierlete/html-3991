// document DOMContentLoaded
//     getTareas
//         agregarTareaAul
//             crearLi
//     form submit
//         envioFormulario
'use strict';

const URL = 'http://localhost:3000/tareas';
const FLECHA_ARRIBA = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"/>
                       </svg>`
const FLECHA_ABAJO = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>
                          </svg>`;
const ESTRELLA_HUECA = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
                        <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
                        </svg>`;
const ESTRELLA_RELLENA = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                        </svg>`;

let ulTareasPendientes, ulTareasCompletadas, iconoCompletadas;
let ordenarVinculo, sentidoOrdenar = 1, criterioOrdenacion = 'Ordenar';

document.addEventListener('DOMContentLoaded', function (event) {
    // Obtenemos por id el ul de tareas pendientes y tareas completadas
    ulTareasPendientes = document.getElementById('tareas-pendientes');
    ulTareasCompletadas = document.getElementById('tareas-completadas');

    ordenarVinculo = document.querySelector('[href="#ordenar"]');

    ulTareasCompletadas.style.display = 'none';

    getTareas();

    const form = document.querySelector('main form');

    form.addEventListener('submit', envioFormulario);

    const completadas = document.getElementById('completadas');

    completadas.style.display = 'none';
    completadas.addEventListener('click', completadasClick);

    iconoCompletadas = document.getElementById('icono-completadas');

    iconoCompletadas.innerHTML = FLECHA_ARRIBA;

    const importancia = document.getElementById('importancia');
    const alfabeticamente = document.getElementById('alfabeticamente');
    const fechaDeCreacion = document.getElementById('fecha-de-creacion');

    alfabeticamente.addEventListener('click', alfabeticamenteClick);
    importancia.addEventListener('click', importanciaClick);
    fechaDeCreacion.addEventListener('click', fechaDeCreacionClick);
});

function ordenar(criterio, texto) {
    cambiarCriterioOrdenacion(texto);

    ordenarUl(ulTareasPendientes, criterio);
    ordenarUl(ulTareasCompletadas, criterio);
}

function cambiarCriterioOrdenacion(texto) {
    sentidoOrdenar = criterioOrdenacion == texto ? sentidoOrdenar * -1 : 1;
    criterioOrdenacion = texto;

    console.log(criterioOrdenacion, sentidoOrdenar);

    ordenarVinculo.innerHTML = criterioOrdenacion + (sentidoOrdenar == 1 ?  FLECHA_ABAJO : FLECHA_ARRIBA);
}

function ordenarUl(ul, criterio) {
    const lis = ul.children;

    const arr = Array.prototype.slice.call(lis);

    const arrOrdenado = arr.sort(criterio);

    ul.innerHTML = '';

    for (let li of arrOrdenado) {
        ul.appendChild(li);
    }
}

function fechaDeCreacionClick() {
    ordenar((a, b) => {
        const creacionA = a.querySelector('.creacion').innerText;
        const creacionB = b.querySelector('.creacion').innerText;

        return creacionA.localeCompare(creacionB) * sentidoOrdenar;
    }, 'Fecha de creación');
}
function importanciaClick() {
    ordenar(function (liA, liB) {
        const a = liA.querySelector('label input').checked;
        const b = liB.querySelector('label input').checked;

        if(a==b) {
            return 0;
        }

        return sentidoOrdenar * (a ? -1 : 1);
    }, 'Importancia');
    // a	    b	    sort    
    // true	    true	0	    a == b
    // true	    false	-1	    a < b
    // false	true	1	    a > b
    // false	false	0	    a == b
}

function alfabeticamenteClick() {
    ordenar((a, b) => a.innerText.localeCompare(b.innerText) * sentidoOrdenar, 'Alfabéticamente');
}

function completadasClick(e) {
    const display = e.target.checked ? 'block' : 'none';
    const icono = e.target.checked ? FLECHA_ABAJO : FLECHA_ARRIBA;

    iconoCompletadas.innerHTML = icono;

    ulTareasCompletadas.style.display = display;
}

async function envioFormulario(e) {
    e.preventDefault();

    const tarea = {
        titulo: document.getElementById('tarea').value,
        importante: false,
        completada: false,
        creacion: new Date().toISOString().substring(0, 10)
    }

    try {
        const respuesta = await fetch(URL, {
            method: 'POST',
            body: JSON.stringify(tarea),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (respuesta.ok) {
            const tareaConfirmada = await respuesta.json();

            agregarTareaAul(tareaConfirmada);
        } else {
            throw new Error(respuesta.statusText);
        }
    } catch (error) {
        console.error(error);
    }
}
async function getTareas() {
    try {
        // Nos conectamos al JSON-SERVER y le pedimos el conjunto de tareas
        const response = await fetch(URL);
        // Convertimos la respuesta en un array de objetos
        const tareas = await response.json();
        // Visualizamos en consola el array de tareas
        console.log(tareas);

        // Borramos todos los elementos de la lista
        ulTareasPendientes.innerHTML = '';
        ulTareasCompletadas.innerHTML = '';

        tareas.forEach(tarea => {
            agregarTareaAul(tarea);
        });
        // Si se detecta un error
    } catch (error) {
        // se visualiza el error en consola
        console.error(error);
    }
}


function agregarTareaAul(tarea) {
    const li = crearLi(tarea);

    // Añadimos el li a la lista de tareas pendientes o tareas completadas
    if (tarea.completada) {
        ulTareasCompletadas.appendChild(li);
    } else {
        ulTareasPendientes.appendChild(li);
    }
}

function crearLi(tarea) {
    const li = document.createElement('li');

    li.dataset.id = tarea.id;

    // Creamos un nuevo checkbox para finalizar la tarea
    const checkboxFinalizar = document.createElement('input');

    checkboxFinalizar.type = 'checkbox';
    checkboxFinalizar.title = 'Finalizar';
    checkboxFinalizar.checked = tarea.completada;

    checkboxFinalizar.addEventListener('click', finalizarClick);

    li.appendChild(checkboxFinalizar);

    // Añadimos el texto de la tarea
    let tipoEtiqueta = 'span';

    if (tarea.completada) {
        tipoEtiqueta = 'del';
    }
    const etiqueta = document.createElement(tipoEtiqueta);
    etiqueta.innerHTML = `<span class="titulo">${tarea.titulo}</span> <span class="creacion">${tarea.creacion}</span>`;
    li.appendChild(etiqueta);
    
    const labelImportante = document.createElement('label');
    const contenidoLabel = document.createElement('span');
    contenidoLabel.innerHTML = tarea.importante ? ESTRELLA_RELLENA : ESTRELLA_HUECA;
    labelImportante.appendChild(contenidoLabel);

    // Creamos un nuevo checkbox para marcar la tarea como importante
    const checkboxImportante = document.createElement('input');

    checkboxImportante.type = 'checkbox';
    checkboxImportante.title = 'Importante';
    checkboxImportante.checked = tarea.importante;
    checkboxImportante.style.display = 'none';

    checkboxImportante.addEventListener('click', importanteClick);

    labelImportante.appendChild(checkboxImportante);
    li.appendChild(labelImportante);

    return li;
}

async function importanteClick(e) {
    const li = e.target.parentElement.parentElement;
    const id = li.dataset.id;

    const respuesta = await fetch(`${URL}/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ importante: this.checked }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!respuesta.ok) {
        alert('No se pudo marcar la tarea como importante');
        return;
    }

    const span = li.querySelector('label span');
    span.innerHTML = this.checked ? ESTRELLA_RELLENA : ESTRELLA_HUECA;
}

async function finalizarClick() {
    const li = this.parentNode;

    const id = li.dataset.id;

    const respuesta = await fetch(`${URL}/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ completada: this.checked }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!respuesta.ok) {
        alert('No se pudo finalizar la tarea');
        return;
    }

    if (!this.checked) {
        const del = li.querySelector('del');
        const texto = del.innerHTML;

        del.outerHTML = `<span>${texto}</span>`;

        ulTareasCompletadas.removeChild(li);
        ulTareasPendientes.appendChild(li);
    } else {
        const span = li.querySelector('span');
        const texto = span.innerHTML;

        span.outerHTML = `<del>${texto}</del>`;

        ulTareasPendientes.removeChild(li);
        ulTareasCompletadas.appendChild(li);
    }
}

// // Por cada tarea vamos a repetir lo siguiente
// tareas.forEach(tarea => {
//     // Creamos un nuevo list item <li></li>
//     const li = document.createElement('li');
//     // Añadimos el texto de la tarea <li>Tarea1</li>
//     li.innerHTML = tarea.titulo;
//     // Añadimos el list item a la lista <ul><li>Tarea1</li></ul>
//     tareasPendientes.appendChild(li);
// });