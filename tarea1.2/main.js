import express from "express";
import tareas from "./local_db/tareas.json" with { type: 'json' };

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/tareas", (req, res) => {
    const response = {
        success: true,
        data: tareas,
    }
  res.send(response);
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
