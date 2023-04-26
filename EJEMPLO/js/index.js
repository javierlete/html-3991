// document DOMContentLoaded
//     getTareas
//         agregarTareaAul
//             crearLi
//     form submit
//         envioFormulario

const URL = 'http://localhost:3000/tareas';
let ulTareasPendientes, ulTareasCompletadas;

document.addEventListener('DOMContentLoaded', function (event) {
    // Obtenemos por id el ul de tareas pendientes y tareas completadas
    ulTareasPendientes = document.getElementById('tareas-pendientes');
    ulTareasCompletadas = document.getElementById('tareas-completadas');

    getTareas();

    const form = document.querySelector('main form');

    form.addEventListener('submit', envioFormulario);
});


async function envioFormulario(e) {
    e.preventDefault();

    const tarea = {
        titulo: document.getElementById('tarea').value,
        importante: false,
        completada: false
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
    etiqueta.innerHTML = tarea.titulo;
    li.appendChild(etiqueta);
    // Creamos un nuevo checkbox para marcar la tarea como importante
    const checkboxImportante = document.createElement('input');

    checkboxImportante.type = 'checkbox';
    checkboxImportante.title = 'Importante';
    checkboxImportante.checked = tarea.importante;

    li.appendChild(checkboxImportante);
    return li;
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
    
    if(!this.checked) {
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