const ESTILO = `
    display: flex;
    margin-bottom: .5rem;
`;
const ESTILO_LABEL = `
    display: inline-block;
    text-transform: uppercase;
    padding: .5rem;
`;
const ESTILO_INPUT = `
    flex-grow: 1;
    padding: .5rem;
    border-radius: .5rem;
    border: 1px solid #ccc;
`;

export class LabelInput extends HTMLElement {
    constructor() {
        super();

        this.style = ESTILO;

        this.label = document.createElement('label');
        this.input = document.createElement('input');

        this.label.style = ESTILO_LABEL;
        this.input.style = ESTILO_INPUT;

        this.appendChild(this.label);
        this.appendChild(this.input);
    }

    connectedCallback() {
        const id = this.getAttribute('id');
        const type = this.getAttribute('type');
        const required = this.hasAttribute('required');

        this.input.required = required;

        this.label.innerHTML = id;
        this.label.htmlFor = id;

        this.input.placeholder = id;
        this.input.id = id;
        this.input.name = id;

        switch (type) {
            case 'textarea':
                this.removeChild(this.input);
                this.input = document.createElement('textarea');
                this.appendChild(this.input);
                this.input.style = ESTILO_INPUT;
                
                break;
            case 'submit':
                this.input.value = id.toUpperCase();
                this.label.innerHTML = '';
            default:
                this.input.type = type;
        }
    }
}