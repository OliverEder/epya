import express from "express";
import cors from "cors";
import {} from "dotenv/config"
import session from "express-session";

import user_router from "./routes/user_routes.js";
import api_user_router from "./routes/api_user_routes.js";
import db from "./config/db.js";
import { session_validation } from "./validators/session_validation.js";

const app = express();

app.use(cors());

// Archivos publicos
app.use(express.static("./src/public"));

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(session({
    secret: "mpmsdfiwefmpsdfa",
    resave: false,
    saveUninitialized: false
}))
// Motor de plantillas
app.set("view engine", "ejs");
app.set("views", "./src/views");

const port = process.env.PORT || 3000;
const base_url = process.env.BASE_URL || "http://localhost:3000";


app.use("/user", user_router);
app.use("/api/user", api_user_router);

app.get("/", (req, res, next) => {
    res.render("index", { base_url: process.env.BASE_URL });
});

app.get("/login", (req, res, next) => {
    res.render("login", {base_url: process.env.BASE_URL,});
})

app.get("/registro_usuario", (req, res, next) => {
    res.render("registro_usuario", {base_url: process.env.BASE_URL,});
})

db.authenticate()
    .then(() => {console.log("Base de datos conectada");})
    .catch(error => {console.log(error);})

app.listen(port, () => {
    console.log(`Servidor activo en el puerto ${port}`);
    console.log(`Ruta del servidor ${base_url}`);
});