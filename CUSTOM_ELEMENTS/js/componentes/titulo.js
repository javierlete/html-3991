export class Titulo extends HTMLElement {
    constructor() {
        super();

        // Create a shadow root
        const shadow = this.attachShadow({mode: 'open'});

        this.h1 = document.createElement('h1');

        shadow.appendChild(this.h1);
    }

    connectedCallback() {
        this.h1.innerHTML = this.getAttribute('texto');
    }
}

