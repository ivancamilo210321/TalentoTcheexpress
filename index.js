// Configuracion de espress
const express = require('express') // Importando la libreria
const app = express() // Inicializamos la variable de la libreria 
const port = 3000 // Definimos el puerto a usar

const mongoose = require('mongoose'); // Importar la libreria mongoose

// Obtengo la cadena de conexion del archivo .env
require('dotenv').config()
const DB_CONNECTION = process.env.DB_CONNECTION || ''
mongoose.connect(DB_CONNECTION) // Creo la cadena de conexion

// Agregamos la configuracion del cors
const cors = require('cors')
app.use(cors());

// Importamos las rutas del otro archivo
app.use(express.urlencoded({extended: true})) // Acceder a la informacion de las urls
app.use(express.json()) // analizar informacion en el formato json

const UserRoutes = require('./Routes/UserRoutes')
app.use('/', UserRoutes)

const carroRoutes = require('./Routes/carroRoutes')
app.use('/', carroRoutes)



// Creando el servicio web
// Funcionalidad de nuetra API
// [get, post, put, patch, delete]
// res -> Response -> Respuesta
// req -> Request -> Informacion de entrada
app.get('/', (req, res) =>{
    //Muestra la pantalla Hola Mundo
    res.send("Hola Mundo")
})
 /** Servicio Web */
app.get('/Saludar', (req, res) => {
    res.send("Hola")
} )

/** Servicio Web */
app.get('/Despedirse', (req, res) => {
    res.send("Adios")
})

/** Servicio Web */
app.get('/Perro', (req, res) => {
    res.send("wau")
})

/** Servicio Web */
app.get('/Beso', (req, res) => {
    res.send("Mua")
})

/** Servicio Web */
app.get('/Gallo', (req, res) => {
    res.send("Kikiriki")
})

// Servicio web con parametros
app.get('/Saludar/:nombre', (req, res) => {
    // Recibiendo un parametro de la URL
    var nombre = req.params.nombre
    res.send("hola " + nombre)
})

app.get('/Saludar/:nombre/:edad', (req, res) => {
    var nombre = req.params.nombre
    var edad = req.params.edad
    res.send("Hola, me llamo " + nombre + " y tengo " + edad)
})

app.get('/mascota/:tipo', (req, res) =>{
    var tipo = req.params.tipo
    var animal = ""
    if(tipo == "perro"){
        animal = "guau"
    }else if(tipo == "gato"){
        animal = "miau"
    }else if(tipo == "pajaro"){
        animal = "pio pio"
    }else if(tipo == "serpiente"){
        animal = "zssssssssss"
    }else {
        animal = "No conozco el animal"
    }
    res.send(animal)
})

// Solicitar por post
app.post('/usuario', (req, res) => {
    res.send("Estoy creando un usuario")
})

// solicitar por PUT
app.put('/usuario', (req, res) =>{
    res.send("Estoy actualizando un usuario con PUT")
})

// Solicitar por PATCH
app.patch('/usuario', (req, res) => {
    res.send("Estoy actualizando un usuario por PATCH")
})

// Solicitu por DELETE
app.delete('/usuario', (req, res) => {
    res.send("Estoy eliminando un usuario")
})

// Ejecutamos el servidor
app.listen(port, () => {
    console.log("Listen on " + port)
})