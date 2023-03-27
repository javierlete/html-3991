'use strict';

let aforo = 0;
const LIMITE = 2;

while (aforo < LIMITE) {

    console.log(`Bienvenido al club. Ahora están ${aforo} personas.`);

    const edad = prompt('Dime tu edad');

    if (edad >= 18) {
        const tieneZapatos = confirm('¿Tienes zapatos?');

        if (tieneZapatos) {
            const tieneEntrada = confirm('¿Tienes entrada?');

            if (tieneEntrada) {
                aforo++;
                console.log('Pase usted');
            } else {
                console.log('A gorronear a tu madre');
            }
        } else {
            console.log('Es obligatorio entrar con zapatos');
        }
    } else {
        console.log('Debes tener 18 o más años');
    }

}

console.log('Está lleno');