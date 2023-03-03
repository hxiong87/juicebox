// inside db/seed.js

// grab our client with destructuring from the export in index.js
const { 
  client,
  getAllUsers,
  createUser,
 } = require('./index');

async function testDB() {
  try {
   
    console.log("Starting to test database...");

    const users = await getAllUsers();
    console.log('getAllUsers:',users);


    console.log(result);
  } catch (error) {
    console.error(error);
    throw error;
  }
}




async function dropTables() {
  try {
    console.log("Starting to drop tables...");

    await client.query(`
    DROP TABLE IF EXISTS users;

    `);
  } catch (error) {
    console.error("Error dropping tables!");
    throw error; 
  }
}

async function createTables() {
  try {
    await client.query(`
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      username varchar(255) UNIQUE NOT NULL,
      password varchar(255) NOT NULL
    );


    `);
  } catch (error) {
    console.error("Error building tables!");
    throw error; 
  }
}

async function rebuildDB() {
  try {
    client.connect();

    await dropTables();
    await createTables();
    await createInitialUsers();
  } catch (error) {
    console.error(error);
  } 
}

async function createInitialUsers() {
  try {
    console.log("Starting to create users...");

    const albert = await createUser({
       username: 'albert', 
       password: 'bertie99' });

     const sandra = await createUser({
      username: 'sandra',
      password: '2sandy4me'
     })  

     const glamgal = await createUser({
      username: 'glamgal',
      password: 'soglam'
     })


    console.log(albert);
    console.log(james);
    console.log(stevie)
 

    console.log("Finished creating users!");
  } catch(error) {
    console.error("Error creating users!");
    throw error;
  }
}


rebuildDB()
  .then(testDB)
  .catch(console.error)
  .finally(() => client.end());