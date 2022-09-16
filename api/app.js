//luego de instalar nodemon, nodemon app.js en el scritp start del package.json, generamos esta recarga constante
//.gitignore tambien importante para no subir node_modules(archivos al pedo)

const express = require('express');
const app = express(); 
//morgan es un middleware que nos permite ver las peticiones que se hacen al servidor
//configuamos nuestro middleware con morgan, luego de npm install morgan en la consola
const morgan = require('morgan'); 
//------------------RUTAS------------------
const fs = require('fs')
const path = require('path')
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
// para que persista el log en el archivo
//-----------------------------------------
//PASAMOS A MODULARIZAR EL CODIGO
//CREAMOS LA CARPETA ROUTES, Y DENTRO INDEX.JS CON EL CODIGO DE LAS RUTAS


//requerimos el modulo exportado de index.js
const routes = require('./routes/index');

//USAMOS UN MIDDLEWARE QUE ATAJE LAS PETICIONES a API Y LAS REDIRECCIONE A routes
app.use('/api', routes);

app.listen(8080, () => {
    console.log("Server listening on port 8080");
});