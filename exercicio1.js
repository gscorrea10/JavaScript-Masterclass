const input = require("readline-sync");
let columns;
const id = input.question("Informe o valor da identidade: ");
let name = input.question("Informe seu nome: ");
tableName = name;

const number = input.question("Informe um numero: ");
let city = input.question("Informe uma cidade: ");
let state = input.question("Informe o Estado: ");
let country = input.question("Informe o pais: ");


columns = [id, name, number, city, state, country];
console.log('author:', name);
columns.forEach(column => {
    console.log('[',column,']');
  })
