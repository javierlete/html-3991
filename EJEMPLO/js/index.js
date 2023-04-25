let ulTareasPendientes, ulTareasCompletadas;

document.addEventListener('DOMContentLoaded', function (event) {
    console.log('DOM fully loaded and parsed');

    getTareas();

    const form = document.querySelector('main form');

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const tarea = {
            titulo: document.getElementById('tarea').value,
            importante: false,
            completada: false
        }

        try {
            const respuesta = await fetch('http://localhost:3000/tareas', {
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
    })
});

async function getTareas() {
    try {
        // Nos conectamos al JSON-SERVER y le pedimos el conjunto de tareas
        const response = await fetch('http://localhost:3000/tareas');
        // Convertimos la respuesta en un array de objetos
        const tareas = await response.json();
        // Visualizamos en consola el array de tareas
        console.log(tareas);

        // Obtenemos por id el ul de tareas pendientes y tareas completadas
        ulTareasPendientes = document.getElementById('tareas-pendientes');
        ulTareasCompletadas = document.getElementById('tareas-completadas');

        // Borramos todos los elementos de la lista
        ulTareasPendientes.innerHTML = '';
        ulTareasCompletadas.innerHTML = '';

        tareas.forEach(tarea => {
            // Creamos un nuevo li
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
    // Creamos un nuevo checkbox para finalizar la tarea
    const checkboxFinalizar = document.createElement('input');

    checkboxFinalizar.type = 'checkbox';
    checkboxFinalizar.title = 'Finalizar';
    checkboxFinalizar.checked = tarea.completada;

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
// // Por cada tarea vamos a repetir lo siguiente
// tareas.forEach(tarea => {
//     // Creamos un nuevo list item <li></li>
//     const li = document.createElement('li');
//     // Añadimos el texto de la tarea <li>Tarea1</li>
//     li.innerHTML = tarea.titulo;
//     // Añadimos el list item a la lista <ul><li>Tarea1</li></ul>
//     tareasPendientes.appendChild(li);
// });