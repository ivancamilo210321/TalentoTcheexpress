const UserSchema = require("../models/usuarios") // Accedemos a los datos del modelo

const bcrypt = require('bcrypt') // Importamos la libreria de encriptacion
const jwt = require('jsonwebtoken')


class UsuarioController {
    async getUsuarios(req, res){
        var usuarios = await UserSchema.find();
        res.json(usuarios)
    }

    async createUsuario(req, res){

        const hasheadPassword = await bcrypt.hash(req.body.password, 10)

        var nuevoUsuario = {
            nombre: req.body.nombre,
            apellidos: req.body.apellidos,
            correo: req.body.correo,
            password: hasheadPassword, // Guarda la contraseña hasehada
        }

        await UserSchema(nuevoUsuario).save()
        .then((result) => { // Cuando se ejecuta correctamente
            res.send({"status": "succes", "message": "Usuario guardado correctamente"})
        }).catch((error) => { // cuando hay un error
            res.send({"status": "error", "message": error.message})
        })

      
    }

    async getUsuarioById (req, res){
        var id = req.params.id
        var usuario = await UserSchema.findById(id)
        res.json(usuario)
    }

    async updateUsuario(req, res){

        var id = req.params.id;
        const hasheadPassword = await bcrypt.hash(req.body.password, 10)

        var updateUsuario = {
            nombre: req.body.nombre,
            apellidos: req.body.apellidos,
            correo: req.body.correo,
            password: hasheadPassword,
        }

        await UserSchema.findByIdAndUpdate(id, updateUsuario, { new: true})
        .then((result) => { // Cuando se ejecuta correctamente
            res.send({"status": "success", "message": "Usuario Actualizado correctamente"})
        }).catch((error) => { // Cuando hay un error
            res.send({"status": "error", "message": error.message})
        })

      
    }

    async deleteUsuario(req, res){
        var id = req.params.id

        await UserSchema.deleteOne({_id: id})

        res.json({"status": "succes", "message": "Usuario Eliminado correctamente"})
    }

    async login(req, res){
        // Capturo el correo y la contraseña ingresados
        var correo = req.body.correo;
        var password = req.body.password

        // Buscar el usuario por el correo
        var usuario = await UserSchema.findOne({correo})
        if(usuario){    
        // Comparar la contraseña ingresada con la registrada por el usuario
                                              //      Ingreso - Almacenado [encriptado]
        var verificacionClave = await bcrypt.compare(password, usuario.password)
        // Si la verificacion de la clave es exitosa
        if(verificacionClave){

            // Creo un token con la informacion codificada del usuario
            usuario.password = null
            const token = jwt.sign({usuario}, 'secret', { expiresIn: "1h"})

            res.send({"status": "succes",
                "message": "Bienvenido " + usuario.nombre + " " + usuario.apellidos,
                "user_id": usuario._id,
                "token": token
            })
        }else{
            res.status(401).send({"status": "error", "message": "Datos invalidos"})
        }
        }else{
            // Cuando el correo ingresado no esta registrado
            res.status(401).send({"status": "error", "message": "El correo ingresado no existe"})
        }

    }
}

module.exports = UsuarioController