import express from "express";
import tareas from "./local_db/tareas.json" with { type: 'json' };
import { randomUUID } from "crypto";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/tareas", (req, res) => {
  res.send({ success: true, data: tareas });
});

app.get("/tareas/:id", (req, res) => {
  const { id } = req.params;
  const tarea = tareas.find((e) => e.id === Number(id));

  if (!tarea)
    return res
      .status(404)
      .send({ success: false, message: "Tarea no encontrada" });

  res.status(200).send({ success: true, data: tarea });
});

app.post("/tareas", (req, res) => {
    const { titulo, descripcion, completada, fecha_creacion } = req.body;

    if (titulo === undefined || descripcion === undefined || completada === undefined  || fecha_creacion === undefined) {
      return res.status(400).send({
        success: false,
        message: "La tarea no incluye las propiedades requeridas",
      });
    }

  const tituloEsValido = titulo.trim().length > 0;
  console.log(tituloEsValido);
  const hayDescripcion = descripcion.length >= 20;

  if (!tituloEsValido || !hayDescripcion) {
    return res.status(400).send({
      success: false,
      message: !tituloEsValido
        ? "El titulo es obligatorio"
        : !hayDescripcion
        ? "La descripción debe contener mínimo 20 caracteres"
        : null,
    });
  }

  const ultimoId = tareas.length > 0 ? tareas[tareas.length - 1].id : 0;
  const nuevoId = ultimoId + 1;
  const tarea = { id: nuevoId, ...req.body };
  tareas.push(tarea);
  res.status(201).send({ success: true, data: tarea });
});

app.put("/tareas/:id", (req, res) => {
  const { id } = req.params;
  const tarea = tareas.find((e) => e.id === Number(id));

  if (!tarea) {
    return res
      .status(404)
      .send({ success: false, message: "No se encontró la tarea" });
  }

  const { titulo, descripcion, completada } = req.body;

  if (titulo === undefined || descripcion === undefined || completada === undefined) {
    return res.status(400).send({
      success: false,
      message: "La tarea no incluye las propiedades requeridas",
    });
  }

  const tituloEsValido = req.body.titulo.trim().length > 0;
  console.log(tituloEsValido);
  const hayDescripcion = req.body.descripcion.length >= 20;
  const esBooleano = typeof req.body.completada === "boolean";

  if (!tituloEsValido || !hayDescripcion || !esBooleano) {
    return res.status(400).send({
      success: false,
      message: !tituloEsValido
      ? "El título es obligatorio"
      : !hayDescripcion
      ? "La descripción debe contener mínimo 20 caracteres"
      : "El campo 'completada' debe ser un booleano",
    });
  }

  tarea.titulo = titulo
  tarea.descripcion = descripcion
  tarea.completada = completada

  res
    .status(200)
    .send({
      success: true,
      message: "Tarea modificada con éxito",
      data: tarea,
    });
});

app.delete("/tareas/:id", (req, res) => {
  const { id } = req.params;
  const indiceTarea = tareas.findIndex((e) => e.id === Number(id));

  if (indiceTarea !== -1) {
    tareas.splice(indiceTarea, 1);
  } else {
    return res.status(404).send({
      success: false,
      message: "No se encontró la tarea",
    });
  }

  res.status(200).send({ success: true, message: "Tarea eliminada con éxito" });
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
