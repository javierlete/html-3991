const URL_CONTACTOS = 'http://localhost:3000/contactos';

let listaContactos, totalContactosSpan, chatDestinatario, chatUltimaConexion;

window.addEventListener('DOMContentLoaded', async () => {
    listaContactos = document.querySelector('#lista-contactos');
    totalContactosSpan = document.querySelector('#total-contactos');
    chatDestinatario = document.querySelector('#chat-destinatario');
    chatUltimaConexion = document.querySelector('#chat-ultima-conexion');

    await rellenarContactos();

});
async function rellenarContactos() {
    const respuesta = await fetch(URL_CONTACTOS);
    const contactos = await respuesta.json();

    let totalContactos = 0;

    for (const contacto of contactos) {
        totalContactos++;

        console.log(contacto);

        const div = document.createElement('div');

        div.className = 'row p-2';

        div.dataset.id = contacto.id;

        div.dataset.bsToggle = 'offcanvas';
        div.dataset.bsTarget = '#chat';

        div.addEventListener('click', iniciarChat);

        div.innerHTML = `<div class="col-2 text-success">
                             <span class="badge rounded-pill text-bg-secondary fs-3">${contacto.nombre[0]}</span>
                         </div>
                         <div class="col-9">
                             <p>
                                 <span>${contacto.nombre}</span><br>
                                 <span class="form-text"><i class="bi bi-check2"></i> ${contacto.estado}</span>
                             </p>
                         </div>`;
        listaContactos.appendChild(div);
    }

    totalContactosSpan.innerText = totalContactos + ' contactos';
}

async function iniciarChat() {
    const id = this.dataset.id;

    console.log(id);

    const respuesta = await fetch(`${URL_CONTACTOS}/${id}`);
    const contacto = await respuesta.json();

    chatDestinatario.innerText = contacto.nombre;

    const fecha = Date.parse(contacto.ultimaConexion);

    chatUltimaConexion.innerText = new Date(fecha).toLocaleString();
}