const URL_CONTACTOS = 'http://localhost:3000/contactos';
const URL_CONVERSACIONES = 'http://localhost:3000/conversaciones';

const estados = ['<i class="text-secondary bi bi-clock-history"></i>', '<i class="text-secondary bi bi-check2"></i>', '<i class="text-secondary bi bi-check2-all"></i>', '<i class="text-info bi bi-check2-all"></i>'];

let conversacion, chats;
let listaContactos, totalContactosSpan, chatDestinatario, chatUltimaConexion;
let capaConversacion, inputMensaje;

window.addEventListener('DOMContentLoaded', async () => {
    listaContactos = document.querySelector('#lista-contactos');
    totalContactosSpan = document.querySelector('#total-contactos');
    chatDestinatario = document.querySelector('#chat-destinatario');
    chatUltimaConexion = document.querySelector('#chat-ultima-conexion');
    capaConversacion = document.querySelector('#conversacion');
    inputMensaje = document.querySelector('input[type=text]');
    chats = document.querySelector('#chats');

    inputMensaje.addEventListener('change', aceptarMensaje);

    await rellenarContactos();
    await rellenarConversaciones();
});

async function rellenarConversaciones() {
    const respuesta = await fetch(URL_CONVERSACIONES);
    const conversaciones = await respuesta.json();

    chats.innerHTML = '';

    for (const conversacion of conversaciones) {
        const respuestaContacto = await fetch(`${URL_CONTACTOS}/${conversacion.contactoId}`);
        const contacto = await respuestaContacto.json();

        const div = document.createElement('div');

        div.className = 'row p-2';
        div.dataset.bsToggle = 'offcanvas';
        div.dataset.bsTarget = '#chat';

        const icono = contacto.nombre[0];
        const nombre = contacto.nombre;
        const estado = estados[conversacion.estado];

        const mensaje = conversacion.mensajes[conversacion.mensajes.length - 1];

        const ultimoMensaje = mensaje.texto;
        const ultimoMensajeHora = procesarFecha(mensaje.cuando);
        const pendientes = conversacion.mensajes.reduce(
            (total, mensaje) => total + (!mensaje.mio && mensaje.estado != 3 ? 1 : 0), 
        0);

        div.dataset.id = contacto.id;
        div.addEventListener('click', iniciarChat);

        div.innerHTML = 
                `
                    <div class="col-2 text-success">
                        <span class="badge rounded-pill text-bg-secondary fs-3">${icono}</span>
                    </div>
                    <div class="col-8">
                        <p>
                            <span>${nombre}</span><br>
                            <span class="form-text">${estado} ${ultimoMensaje}</span>
                        </p>
                    </div>
                    <div class="col-2 form-text text-success text-end">
                        <span>${ultimoMensajeHora}</span><br>
                        ${pendientes ? '<span class="badge rounded-pill text-bg-success">' + pendientes + '</span>' : ''}
                    </div>
                `;
        
        chats.appendChild(div);
    }
}

async function aceptarMensaje() {
    const mensaje = {
        mio: true,
        cuando: new Date(),
        estado: 0,
        texto: inputMensaje.value
    };
    
    enviarMensaje(mensaje);

    conversacion.mensajes.push(mensaje);

    const respuesta = await fetch(`${URL_CONVERSACIONES}/${conversacion.id ? conversacion.id : ''}`,{
        method: conversacion.id ? 'PUT': 'POST',
        body: JSON.stringify(conversacion),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    
    console.log(respuesta);

    conversacion = await respuesta.json();

    inputMensaje.value = '';
}
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

    const respuestaChat = await fetch(`${URL_CONVERSACIONES}?contactoId=${contacto.id}`);
    const conversaciones = await respuestaChat.json();

    conversacion = conversaciones[0];

    console.log(conversacion);

    capaConversacion.innerHTML = '';

    if (conversacion) {
        const mensajes = conversacion.mensajes;

        for (const mensaje of mensajes) {
            enviarMensaje(mensaje);
        }
    } else {
        conversacion = {
            contactoId: contacto.id,
            mensajes: []
        }
    }
}

function enviarMensaje(mensaje) {
    const p = document.createElement('p');
    const sub = document.createElement('sub');

    sub.className = 'form-text end-0 ms-1 mb-1 float-end ';

    p.style.maxWidth = '80%';
    p.className = 'p-1 border shadow-sm rounded-3 w-auto d-inline-block';

    const cuando = procesarFecha(mensaje.cuando);
    const estado = estados[mensaje.estado];

    sub.innerHTML = `${cuando} ${estado}`;
    p.innerHTML = mensaje.texto;
    p.appendChild(sub);

    if (mensaje.mio) {
        //p.classList.add('text-bg-success');
        p.style.backgroundColor = '#ccffcc';
        p.classList.add('align-self-end');
    } else {
        p.classList.add('bg-white');
        p.classList.add('text-dark');
        p.classList.add('align-self-start');
    }

    capaConversacion.appendChild(p);
}

function procesarFecha(fechaTexto) {
    const fecha = new Date(fechaTexto);
    
    return fecha.getHours() + ':' + (fecha.getMinutes() < 10 ? '0' : '') + fecha.getMinutes();
}