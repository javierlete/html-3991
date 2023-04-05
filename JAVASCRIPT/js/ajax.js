window.addEventListener('DOMContentLoaded', async function() {
    let respuesta = await fetch('http://localhost:3000/clientes/');
    const clientes = await respuesta.json();

    console.log(clientes);

    respuesta = await fetch('http://localhost:3000/clientes/2');
    const cliente = await respuesta.json();

    console.log(cliente);

    respuesta = await fetch('http://localhost:3000/clientes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre: 'Nuevo', apellido: 'Nuevez' })
    });

    console.log(respuesta.statusText);

    respuesta = await fetch('http://localhost:3000/clientes/4', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: 4, nombre: 'Modificado', apellido: 'Modificadez' })
    });

    console.log(respuesta.statusText);

    respuesta = await fetch('http://localhost:3000/clientes/4', {
        method: 'DELETE'
    });

    console.log(respuesta.statusText);
});