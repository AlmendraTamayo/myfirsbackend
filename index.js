const express = require("express");
const cors = require("cors");

const app = express();

let IdRef = 3;
let Pacientes = [
  { id: 1, nombre: "Almendra", apellido: "Tamayo", edad: 27 },
  { id: 2, nombre: "Esteban", apellido: "Cantillano", edad: 28 },
  { id: 3, nombre: "Gloria", apellido: "Leiva", edad: 55 },
];

const PacientesRouter = express.Router();

PacientesRouter.get("/pacientes", (req, res) => {
  res.json(Pacientes);
})
  .get("/pacientes/:id", (req, res) => {
    const paciente = Pacientes.find(
      (paciente) => paciente.id === Number.parseInt(req.params.id)
    );

    if (paciente) {
      res.json(paciente);
    } else {
      res.sendStatus(404);
    }
  })
  .post("/pacientes", (req, res) => {
    const nuevoPaciente = { ...req.body, id: ++IdRef };
    Pacientes.push(nuevoPaciente);
    res.json(nuevoPaciente);
  })
  .put("/pacientes/:id", (req, res) => {
    const pacienteIndex = Pacientes.findIndex(
      (paciente) => paciente.id === Number.parseInt(req.params.id)
    );

    if (pacienteIndex !== -1) {
      Pacientes[pacienteIndex] = {
        ...req.body,
        id: Pacientes[pacienteIndex].id,
      };
      res.send(Pacientes[pacienteIndex]);
    } else {
      res.sendStatus(404);
    }
  })
  .delete("/pacientes/:id", (req, res) => {
    const pacienteIndex = Pacientes.findIndex(
      (paciente) => paciente.id === Number.parseInt(req.params.id)
    );

    if (pacienteIndex !== -1) {
      Pacientes.splice(pacienteIndex, 1);
      res.send();
    } else {
      res.sendStatus(404);
    }
  });

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cors());
app.use("/api", PacientesRouter);
app.listen(3000, undefined, () => {
  console.log("Servidor iniciado");
});
