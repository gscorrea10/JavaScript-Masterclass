/*Exercício 6
Objetivo:
Implemente o método "select". Para isso, é necessário extrair as informações a partir do comando, 
filtrando os dados pela cláusula "where" e montando os objetos de acordo com as colunas selecionadas.

Instruções:

Dada o comando:

select name, age from author where id = 1

1.Crie um método chamado "select".
2.Na função "execute", invoque o método "select".
3.No método "select", retorne todos os registros considerando apenas as colunas selecionadas.
4.Extraia a cláusula where do comando.
5.Crie as variáveis columnWhere e valueWhere.
6.Filtre os registros conforme a cláusula where.*/

const DatabaseError = function(statement , message){
    this.statement = statement;
    this.message = message;
};
const database = {
    tables:{},
    createTable(statement){
const regexp = /create table ([a-z]+) \((.+)\)/;
const parsedStatement = statement.match(regexp);
let [,tableName, columns] = parsedStatement;
this.tables[tableName] = {
    columns: {},
    data: []
};
columns = columns.split(",");
for (let column of columns){
    column = column.trim().split(" ");  
    const [name, type] = column;
    this.tables[tableName].columns[name] = type;
}
    },
    insert(statement) {
        
        const regexp = /insert into ([a-z]+) \((.+)\) values \((.+)\)/;
        const parsedStatement = statement.match(regexp);
        let [,tableName, columns, values] = parsedStatement;
        columns = columns.split(", ");
        values = values.split(", ");
        let row = {};
            for (let i = 0; i < columns.length; i++){
                const column = columns[i];
                const value = values[i];
                row[column] = value;
            } 

            this.tables[tableName].data.push(row);
        

    },
    select(statement){
        const regexp = /select (.+) from ([a-z]+)(?: where (.+))?/;
        const parsedStatement = statement.match(regexp);
        let [, columns, tableName, whereClause] = parsedStatement;
        columns = columns.split(", ");
        let rows = this.tables[tableName].data;
        if(whereClause){
            const [columnWhere, valueWhere] = whereClause.split(" = ");
            rows = rows.filter(function (row){
                return row[columnWhere] === valueWhere;
            });
        }
       

        
        rows = rows.map(function (row){
            let selectedRow = {};
            columns.forEach(function (column){
                selectedRow[column] = row[column];
            })
            return selectedRow;

        });
        //console.log(columns,tableName); 
        return rows;  
        
        

    },
    execute(statement) {
        if (statement.startsWith("create table")){
            return this.createTable(statement);
        }
        if (statement.startsWith("insert")){
            return this.insert(statement);
        }

        if (statement.startsWith("select")){
            return this.select(statement);
        }
            const message = `Syntax error: "${statement}"`
            throw new DatabaseError(statement,message);
        
    }
    
};

    try{
        database.execute("create table author (id number, name string, age number, city string, state string, country string)");
        database.execute("insert into author (id, name, age) values (1, Douglas Crockford, 62)");
        database.execute("insert into author (id, name, age) values (2, Linus Torvalds, 47)");
        database.execute("insert into author (id, name, age) values (3, Martin Fowler, 54)");
        console.log(JSON.stringify(database.execute("select name, age from author"), undefined, " "));
        console.log(JSON.stringify(database.execute("select name, age from author where id = 1"), undefined, "  "));
    }catch(e){
        console.log(e.message);
    }