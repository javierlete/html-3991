const URL = 'http://localhost:3000/contactos';

window.addEventListener('DOMContentLoaded', async () => {
    const listaContactos = document.querySelector('#lista-contactos');
    const totalContactosSpan = document.querySelector('#total-contactos');

    const respuesta = await fetch(URL);
    const contactos = await respuesta.json();

    let totalContactos = 0;

    for (const contacto of contactos) {
        totalContactos++;

        console.log(contacto);

        const div = document.createElement('div');

        div.className = 'row p-2';

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

});
