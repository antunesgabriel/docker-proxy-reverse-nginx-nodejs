const express = require('express')
const mysql = require('mysql')
const { faker } = require('@faker-js/faker');

const app = express()
const port = process.env.PORT ?? 4200

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});


async function query(sql, values = []) {
  return new Promise((resolve, reject) => {
    db.query(sql, values, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

app.get('/', async (req, res) => {
   const INSERT = 'INSERT into people (name) VALUES (?)'
   const peopleName = faker.person.fullName()


   try {
     await query(INSERT, [peopleName])
   } catch(err) {
     return res.send(`<h1>Falha ao inserir</h1> <code>${JSON.stringify(err)}</code>`)
   }

   try{
     const people = await query("SELECT * from people")

     res.send(`<h1>Full Cycle Rocks!</h1> <code>${JSON.stringify(people)}</code>`)
   }catch(err){
     return res.send(`<h1>Falha ao listar</h1> <code>${JSON.stringify(err)}</code>`)
   }
})

app.listen(port, () => {
  console.log(`App Stating on port ${port}`)
})
