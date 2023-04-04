window.addEventListener('DOMContentLoaded', async function() {
    const respuesta = await fetch('http://localhost:3000/clientes/');
    const clientes = await respuesta.json();

    console.log(clientes);
});