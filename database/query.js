import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";

// Let's initialize it as null initially, and we will assign the actual database instance later.
let db = null;

// return all news
export async function getNews() {
  if (!db) {
    // If the database instance is not initialized, open the database connection
    db = await open({
      filename: "./news.db", // Specify the database file path
      driver: sqlite3.Database, // Specify the database driver (sqlite3 in this case)
    });
  }

  // Perform a database query to retrieve all items from the "items" table
  const items = await db.all("SELECT * FROM news ORDER BY id DESC");

  return items;
}


// return one news that matched with id
export async function findNews(id) {
  if (!db) {
    // If the database instance is not initialized, open the database connection
    db = await open({
      filename: "./news.db", // Specify the database file path
      driver: sqlite3.Database, // Specify the database driver (sqlite3 in this case)
    });
  }

  // Perform a database query to retrieve all items from the "items" table
  const items = await db.get("SELECT * FROM news WHERE id=?  ", [id]);

  return items;
}




export async function createNews({description}) {
  if (!db) {
    // If the database instance is not initialized, open the database connection
    db = await open({
      filename: "./news.db", // Specify the database file path
      driver: sqlite3.Database, // Specify the database driver (sqlite3 in this case)
    });
  }

  // Perform a database query to retrieve all items from the "items" table
  const values = [new Date(), description, "/uploads/sample.jpg"];
  const insertSql = `INSERT INTO news(date, description, img) VALUES(?, ?, ?)`;

  const res = await db.run(insertSql, values, function (err) {
    if (err) {
      return console.error(err.message);
    }
    const id = this.lastID; // get the id of the last inserted row
    console.log(`Rows inserted, ID ${id}`);
  });

  return res;
}

export async function deleteNews(id) {
  if (!db) {
    // If the database instance is not initialized, open the database connection
    db = await open({
      filename: "./news.db", // Specify the database file path
      driver: sqlite3.Database, // Specify the database driver (sqlite3 in this case)
    });
  }

  // Perform a database query to retrieve all items from the "items" table
  const values = [id];
  const runQuery = `DELETE FROM news WHERE id= ?`;

  const res = await db.run(runQuery, values, function (err) {
    if (err) {
      return console.error(err.message);
    }
  });

  return res;
}

export async function updateNews(id, data) {
  if (!db) {
    // If the database instance is not initialized, open the database connection
    db = await open({
      filename: "./news.db", // Specify the database file path
      driver: sqlite3.Database, // Specify the database driver (sqlite3 in this case)
    });
  }

  // Perform a database query to retrieve all items from the "items" table
  const values = [data.description, new Date(), id];
  const runQuery = `UPDATE news SET description= ?, date=? WHERE id= ?`;

  const res = await db.run(runQuery, values, function (err) {
    if (err) {
      return console.error(err.message);
    }
  });

  return res;
}