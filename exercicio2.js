const input = require("readline-sync");
const statement = "create table author (id number, name string, age number, city string, state string, country string)";
const regexp = /create table ([a-z]+) \((.+)\)/;
const parsedStatement = statement.match(regexp);
const tabela = parsedStatement[1];
let columns = parsedStatement[2];

/* const id = input.question("Informe o numero da sua identidade: ");
const name = input.question("Informe seu nome: ");
const age = input.question("Informe sua idade: ");
const city = input.question("Informe sua cidade: ");
const state = input.question("Informe seu estado: ");
const country = input.question("Informe seu pais: "); */
columns = columns.split(",");
//columns = [id, name, age, city, state, country];

const database = {

    tables: {

        [tabela]: {

            columns: {

              },
              data: []

        }

    }
  
    };

    for (let column of columns){
        column = column.trim().split(" ");  //trim corrige a diferença de espaços
        const name = column[0];
        const type = column[1];
        database.tables[tabela].columns[name] = type;
        //console.log(name, type);
        //console.log(column);

    }

    //console.log(columns);
    console.log(JSON.stringify(database, undefined, "  "));