const express = require('express') // Importando la libreria
const app = express() // Inicializamos la variable de la libreria
const UsuarioController = require('../controllers/usuarioContoller') // Importando el controlador
const controller = new UsuarioController();

// Creamos nuestros servicios web 
app.get('/usuario', controller.getUsuarios) // Obtengo los usuarios
app.post('/usuario', controller.createUsuario) // Creo un usuario
app.get('/usuario/:id', controller.getUsuarioById) // Consulto un usuario
app.put('/usuario/:id', controller.updateUsuario) // Actualizo un usuario
app.delete('/usuario/:id', controller.deleteUsuario) // Elimino un usuario
app.post('/login', controller.login) // Login
module.exports = app