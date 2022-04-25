/* Objetivo:

Crie dois métodos no objeto "database" chamados de "createTable" e "execute". 
O comando "createTable" já foi implementado no exercício anterior, 
mova o código e utilize o método "execute" para invocar dinamicamente o método "createTable".

 Instruções:


1.No objeto "database", crie uma função chamada "createTable", que recebe o comando por parâmetro.
2.Mova o código responsável por criar a tabela para dentro do método "createTable".
3.Crie uma função chamada "execute", invocando dinamicamente a função "createTable". 
 */




const database = {

    tables: {},

        
    

    createTable(statement){
        //const input = require("readline-sync");
        
        const regexp = /create table ([a-z]+) \((.+)\)/;
        const parsedStatement = statement.match(regexp);
        const tabela = parsedStatement[1];
        this.tables[tabela] = {

            columns: {},
              data: []

        };

        let columns = parsedStatement[2];
        columns = columns.split(",");
        for (let column of columns){
            column = column.trim().split(" ");  //trim corrige a diferença de espaços
            const name = column[0];
            const type = column[1];
            this.tables[tabela].columns[name] = type;
        }
    },
    execute(statement) {
        if (statement.startsWith("create table")){
            return this.createTable(statement);
        }else{
            console.log("null");
        }
    }
    };
    database.execute("create table author (id number, name string, age number, city string, state string, country string)");
    console.log(JSON.stringify(database, undefined, "  "));