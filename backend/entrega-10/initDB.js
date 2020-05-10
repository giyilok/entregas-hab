// Reseteamos la Mysql db y cargamos datos iniciales
//require('dotenv').config();
const { getConnection } = require('./db');
const { formatDateToDB } = require('./helpers');
const bcrypt = require('bcrypt');
const faker = require('faker/locale/es');
const { random } = require('lodash');

//Comprobamos si se pasa argumento para carga de datos
//inciales (addData === true)
const args = process.argv;
const addData = args[2] === '--data';

async function main() {
  // Obtenemos la conexión a la db
  const connection = await getConnection();

  console.log('Dropping tables');
  await connection.query('DROP TABLE IF EXISTS diary_votes');
  await connection.query('DROP TABLE IF EXISTS diary');
  await connection.query(`DROP TABLE IF EXISTS users`);

  //Create table users
  console.log('Creating users table');

  await connection.query(`
    CREATE TABLE users (
      id INTEGER PRIMARY KEY AUTO_INCREMENT,
      registrationDate DATETIME NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      role ENUM("normal", "admin") DEFAULT "normal" NOT NULL,
      active BOOLEAN DEFAULT true NOT NULL,
      realName VARCHAR(255)
    )
  `);

  // Create table diary
  await connection.query(`
    CREATE TABLE diary (
      id INTEGER PRIMARY KEY AUTO_INCREMENT,
      date DATETIME NOT NULL,
      description TEXT NOT NULL,
      place VARCHAR(255) NOT NULL,
      image VARCHAR(255),
      user_id INTEGER NOT NULL,
      CONSTRAINT FK_diary_users FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
    )
  `);

  //Create table diary_votes
  await connection.query(`
    CREATE TABLE diary_votes (
      id INTEGER PRIMARY KEY AUTO_INCREMENT,
      entry_id INTEGER NOT NULL,
      user_id INTEGER NOT NULL,
      vote INTEGER NOT NULL,
      date DATETIME NOT NULL,
      CONSTRAINT FK_diary_votes_diary FOREIGN KEY (entry_id) REFERENCES diary(id) ON DELETE CASCADE,
      CONSTRAINT FK_diary_votes_users FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `);

  //Hash password before adding to DB <- IMPORTANT!!!!!!!!!111
  // Creamos el primer usuario como administrador
  const password = await bcrypt.hash(process.env.DEFAULT_ADMIN_PASSWORD, 10);

  await connection.query(`
      INSERT INTO users(registrationDate, email, password, role, realName)
      VALUES(NOW(), "giyi@lok.com", "${password}", "admin", "GiyiLok")
  `);

  if (addData) {
    console.log('Adding initial data');

    const users = 6;

    for (let index = 0; index < users; index++) {
      //Creamos usuario aleatorio
      const email = faker.internet.email();
      const password = await bcrypt.hash(faker.internet.password(), 10);

      await connection.query(
        `INSERT INTO users(registrationDate, email, password, role, realName) VALUES(NOW(), "${email}", "${password}", "normal", "${faker.name.findName()}")`
      );
    }

    const entries = 10;

    for (let index = 0; index < entries; index++) {
      const userId = random(2, users + 1);

      await connection.query(`
      INSERT INTO diary (date, description, place, user_id) 
      VALUES ("${formatDateToDB(
        faker.date.recent()
      )}", "${faker.lorem.sentence()}", "${faker.address.city()}", ${userId})
    `);
    }

    const votes = 100;

    for (let index = 0; index < votes; index++) {
      const userId = random(2, users + 1);

      await connection.query(`
      INSERT INTO diary_votes (entry_id, vote, date, user_id) 
      VALUES ("${random(1, entries)}", "${random(1, 5)}", "${formatDateToDB(
        faker.date.recent()
      )}", "${userId}")
      `);
    }
  }

  console.log('Initial structure created');

  connection.release();
  process.exit();
}

main();
