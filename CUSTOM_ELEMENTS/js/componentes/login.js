export class Login extends HTMLElement {
    constructor() {
        super();

        this.innerHTML = `
            <form>
                <jl-label-input id="email" type="email" required></jl-label-input>
                <jl-label-input id="password" type="password" required></jl-label-input>
                <jl-label-input id="login" type="submit"></jl-label-input>
            </form>
        `
    }
}