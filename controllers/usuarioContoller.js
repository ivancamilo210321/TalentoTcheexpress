const UserSchema = require("../models/usuarios") // Accedemos a los datos del modelo

class UsuarioController {
    async getUsuarios(req, res){
        var usuarios = await UserSchema.find();
        res.json(usuarios)
    }

    async createUsuario(req, res){
        var nuevoUsuario = {
            nombre: req.body.nombre,
            apellidos: req.body.apellidos,
            correo: req.body.correo,
            password: req.body.password,
        }
        await UserSchema(nuevoUsuario).save();

        res.send("Guardado correctamente")
    }

    async getUsuarioById (req, res){
        var id = req.params.id
        var usuario = await UserSchema.findById(id)
        res.json(usuario)
    }

    async updateUsuario(req, res){

        var id = req.params.id;

        var updateUsuario = {
            nombre: req.body.nombre,
            apellidos: req.body.apellidos,
            correo: req.body.correo,
            password: req.body.password,
        }

        await UserSchema.findByIdAndUpdate(id, updateUsuario, { new: true})

        res.json({"status": "succes", "message": "Usuario Actualizado correctamente"})
    }

    async deleteUsuario(req, res){
        var id = req.params.id

        await UserSchema.deleteOne({_id: id})

        res.json({"status": "succes", "message": "Usuario Eliminado correctamente"})
    }
}

module.exports = UsuarioController