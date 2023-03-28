const arr = [ 5, 2, 5, 6, 8, 9, 6, 3 ];

arr[10] = 20;
arr.clave = 'valor';

console.log(arr);

let i = 0;
while(i < arr.length) {
    console.log(`La posición arr[${i}] = ${arr[i]}`);
    i++;
}

for(let i = 0; i < arr.length; i++) {
    console.log(`La posición arr[${i}] = ${arr[i]}`);
}

for(let clave in arr) {
    console.log(`La posición arr[${clave}] = ${arr[clave]}`);
}

for(let i = 0; i < arr.length; i++) {
    let clave = i;
    console.log(`La posición arr[${clave}] = ${arr[clave]}`);
}

for (let valor of arr) {
    console.log(valor);
}

for(let i = 0; i < arr.length; i++) {
    let valor = arr[i];
    console.log(valor);
}

for(let i = 0, encontrado = false; i < arr.length && !encontrado; i++) {
    console.log('Comprobando: ' + arr[i]);
    
    if(arr[i] === 6) {
        console.log('Encontrado');
        encontrado = true;
    }
}

for(let valor of arr) {
    console.log('Comprobando: ' + valor);

    if(valor === 6) {
        console.log('Encontrado');
        break;
    }
}
