// to generate fake data @faker-js/faker package
const { faker } = require("@faker-js/faker");
// to connect node with  mysql
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "delta_app",
  password: "Rewa@123",
});

let q = "insert into user (id, username, email, password) values(?,?,?,?)";

let user = ["123", "123_newUser", "abc@gmail.com", "abc"];

try {
  connection.query(q, user, (err, result) => {
    if (err) throw err;
    console.log(result);
  });
} catch (err) {
  console.log(err);
}
// To end the connection form sql if we not end the server continue ...
connection.end();

let getRandomUser = () => {
  return {
    id: faker.string.uuid(),
    username: faker.internet.username(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
};

// faker data generate karne ke lie package/@faker-js/faker
// sql database ko server se connect karne ke lie (MySQL2 Package install kia hai) (to connect node with mysql)

// command to link (mysql -u root -p) mysql to server

// ---------------------------------------------------------------------------------------
// 4 way to run sql or connect to the database
//_______________________________________________________________________________________

// 1. directly run from MySQL workbence and show the changes in the code
// 2. create connection usin package mysql2 from npm
// 3. using CLI Command (In which directly we can access my sql in powecell and run command (mysql -u root -p))
// 4. Using Create Files

// a. create file schema.sql
// b. select database
// c. run command ->
// mysql -u root -p   (to connect with mysql server from terminal)
// use / select database

// source schema.sql (to run the schema.sql file from terminal)

// How to store data in User table
// use placeholder it is inside the mysql2 documentation
