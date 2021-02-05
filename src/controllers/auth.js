import {Users} from "../models/";
import bcrypt from 'bcryptjs';

//1. Completar la logica para manejar el inicio de sesión
// - responder con un codigo de estado 401 cuando las credenciales sean incorrectas
// - responder con un mensaje (message) y codigo de estado 200 cuando las credenciales sean correctas
// - responder con el token jwt (token) 
export const login = async (req, res) => {
    let data = req.body
    let results = await Users.findOne({where: {email: data.email}})
    try {
        if(results) {
            const match = await bcrypt.compare(data.password, results.password);
            if(match) {
                res.status(200).json({message: "correct"})
            } else {
                res.status(401).json({message: 'Error en la contrasena'})
            }
        } else {
            res.status(401).json({message: 'No existe un usuario con este correo/username'})
        }
    } catch(err) {
        console.log(err)
    }
}

//2. Completar el registro de usuario
// - responder con un codigo de estado fallido 400 > cuando hagan falta campos o cuando el usuario ya exista en la base de datos
// - responder con el objeto del usuario que ha sido creado y un codigo 201 cuando el registro sea satisfactorio
export const signIn = async (req, res) => {
    let data = req.body
    let checkingUserExist = await Users.findOne({where: {email: data.email}})
    try {
        if(checkingUserExist) {
            res.status(400).json({message: 'Registro fallido al agregar un usuario con el mismo correo'})
        } else {
            if(data.firstName && data.lastName && data.email && data.password) {
                const hash = bcrypt.hashSync(data.password, 10);
                data.password = await hash
                let results = await Users.create(data)
                res.status(201).json(results)
            } else {
                res.status(400).json({message: "Falta llenar campos"})
            }
        }
    } catch(err) {
        console.log(err)
    }
}

