/*Exercício 11
 
Objetivo:

Crie um atraso no retorno da função execute por meio de setTimeout e utilize uma promise para tratar o comportamento assíncrono.

Instruções:

1.Envolva o código da função execute em um setTimeout com 1000ms.
2.Crie uma promise e retorne-a.
3.Execute o comando "create table".
4.Após a execução de "create table", utilize a função Promise.all para executar os 3 comandos "insert".
5.Após a execução dos 3 comandos "insert", faça um select retornando as colunas "name" e "author".*/

import { DatabaseError } from "./databaseerror.mjs";
import { Database } from "./database.mjs";
import { Parser } from "./parser.mjs";





//return new Promise(function (resolve, reject){
    
    


    

       // let databaserror = new DatabaseError();
        //let parse = new Parser();
      
        const database = new Database();
        database.execute("create table author (id number, name string, age number, city string, state string, country string)").then(function(){
          return Promise.all([
            database.execute("insert into author (id, name, age) values (1, Douglas Crockford, 62)"),
            database.execute("insert into author (id, name, age) values (2, Linus Torvalds, 47)"),
            database.execute("insert into author (id, name, age) values (3, Martin Fowler, 54)")

          ]).then(function(){
            return database.execute("select name, age from author").then(function(result){
              console.log(result);
            });
          });
        }).catch(function(e){
            console.log(e.message);
          });
     
        //
        //
       // database.execute("delete from author where id = 2");
        
      
        
      
