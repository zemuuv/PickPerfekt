const parser = require("body-parser");
const express = require('express');
const authRoutes = require("./routes/authentication");
const app = express();
const port = 3000;
const productosRoutes = require("./routes/productos");
const clientesRoutes = require("./routes/clientes");
const categoriasRoutes = require("./routes/categorias")
const carritoRoutes = require("./routes/carrito")
const mongoose = require("mongoose");
require('dotenv').config();
app.use(parser.urlencoded({ extended: false })); //permite leer los datos que vienen en la petición
app.use(parser.json()); // transforma los datos a formato JSON
//Gestión de las rutas usando el middleware
app.use("/api", categoriasRoutes);
app.use("/api", carritoRoutes);
app.use("/api", productosRoutes);
app.use("/api", clientesRoutes);
app.use("/api", authRoutes);
app.use(express.json());
//Conexión a la base de datos
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Conexión exitosa"))
    .catch((error) => console.log(error));
//Conexión al puerto
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
