const DatabaseError = function(statement , message){
    this.statement = statement;
    this.message = message;
};
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
        }
            const message = `Syntax error: "${statement}"`
            throw new DatabaseError(statement,message);
        
    }
} 
try{
    database.execute("create table author (id number, name string, age number, city string, state string, country string)");
    database.execute("selece id, name from author");
    console.log(JSON.stringify(database, undefined, "  "));
}catch(e){
    console.log(e.message);
}



