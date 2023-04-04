'use strict';

let tabla, tbody, form;
let id, nombre, apellido;

// Esperamos a la carga de todo el documento
window.addEventListener('DOMContentLoaded', function () {
    // Obtenemos los objetos del DOM que necesitamos a lo largo del programa
    tabla = document.querySelector('table');
    tbody = document.querySelector('tbody');
    form = document.querySelector('form');

    id = document.querySelector('#id');
    nombre = document.querySelector('#nombre');
    apellido = document.querySelector('#apellido');

    // Mostramos todos los registros
    mostrarTodos();

    // Cuando alguien intente enviar el formulario
    form.addEventListener('submit', function (evento) {
        // Deshabilitamos el envío de formulario
        evento.preventDefault();

        // Guardamos el registro
        guardar();
    });
});

function mostrarTodos() {
    mostrarTabla();

    // Vaciamos las filas de la tabla
    tbody.innerHTML = '';

    // Ordenamos la tabla según id
    clientes.sort((c1, c2) => c1.id - c2.id);

    // Por cada cliente...
    clientes.forEach(c => {
        // ... creamos una fila
        nuevaFila(c);
    });
}

function mostrarTabla() {
    // Mostramos la tabla
    tabla.style.display = 'block';
    // Ocultamos el formulario
    form.style.display = 'none';
}

function nuevaFila(c) {
    const tr = document.createElement('tr');

    // Rellenamos la fila con los datos del cliente
    tr.innerHTML = `
            <th>${c.id}</th>
            <td>${c.nombre}</td>
            <td>${c.apellido}</td>
            <td>
                <a href="javascript:editar(${c.id})">Editar</a>
                <a href="javascript:borrar(${c.id})">Borrar</a>
            </td>`;

    tr.dataset.id = c.id;

    // Agregamos la fila al tbody
    tbody.appendChild(tr);
    return tr;
}

function buscarPorId(idModificar) {
    // Devuelve el registro que tiene el mismo id que se le ha pasado
    return clientes.filter(c => c.id === idModificar)[0];
}

function guardar() {
    // Creamos un objeto con todos los datos del formulario
    const clienteFormulario = { id: Number(id.value), nombre: nombre.value, apellido: apellido.value };

    console.log(clienteFormulario);

    // Si el formulario tiene un dato de id...
    if (clienteFormulario.id) {
        // ... significa que es una modificación

        // Quitamos el registro que tiene el mismo id que el del formulario
        // Filtramos la fila que tiene el mismo id que el formulario
        clientes = clientes.filter(c => c.id !== clienteFormulario.id);
        // Mostrar todos los registros de nuevo
        // Añadir al array el nuevo registro
        clientes.push(clienteFormulario);
        mostrarTodos();
    } else {
        // Si no tiene id, significa que es un registro nuevo

        // Hay que calcular su id
        // Mapeamos el array de registros de tipo cliente a un array de ids a secas
        // Explotamos el array para pasarlo a la función Math.max como argumentos individuales
        clienteFormulario.id = Math.max(...clientes.map(c => c.id)) + 1;
        // Alternativa
        // clienteFormulario.id = clientes.reduce( (acumulado, cliente) => cliente.id > acumulado ? cliente.id : acumulado, 0) + 1
        // Añadir al array el nuevo registro
        clientes.push(clienteFormulario);

        nuevaFila(clienteFormulario);
        mostrarTabla();
    }

}

function borrar(id) {
    // Excluimos del array el id del cliente que queremos borrar
    clientes = clientes.filter(c => c.id !== id);

    document.querySelector(`[data-id="${id}"]`).remove();
}

function editar(idModificar) {
    let cliente;

    // Si hay id...
    if (idModificar) {
        // ...hay que buscar el cliente por id (modificar)
        cliente = buscarPorId(idModificar);
    } else {
        // Si no, se usa un cliente en blanco (añadir)
        cliente = { id: '', nombre: '', apellido: '' }
    }

    // Pasamos los datos del objeto cliente al formulario
    id.value = cliente.id;
    nombre.value = cliente.nombre;
    apellido.value = cliente.apellido;

    mostrarFormulario();
}
function mostrarFormulario() {
    // Ocultamos la tabla
    tabla.style.display = 'none';

    // Mostramos el formulario
    form.style.display = 'block';
}

