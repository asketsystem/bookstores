import express from "express";
import mysql2 from "mysql2";

const app = express();

const db = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "PASS@255",
  database: "test",
});

// If there is a auth problem
// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root'

app.get("/", (req, res) => {
  res.json("hello this is the backend");
});

app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/books", (req, res) => {
  const q = "INSERT INTO books (`title`, `desc`, `cover`) VALUES (?)";
  const values = [
    "title from backend",
    "desc from backend",
    "cover from backend",
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("book has been created successfully");
  });
});

app.listen(8800, () => {
  console.log("Connected to backend");
});
