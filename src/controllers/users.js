import {Users} from "../models/";
import { validateJWT } from '../middlewares/jwt'

export const getUsers = async (req, res) => {
    const token = req.header('Authorization')
    const verifyUser = await validateJWT(token)
    try{
        if(verifyUser) {
            const results = await Users.findAll({
                attributes: ['email', 'firstName', 'lastName'],
            })
            res.json(results)
        } else {
            res.status(401).json({message: 'Token invalido'})
        }
    } catch(err) {
        console.log(err)
    }
}


export const getUser = async (req, res) => {
    const token = req.header('Authorization')
    const verifyUser = await validateJWT(token)
    try{
        if(verifyUser) {
            const results = await Users.findOne({
                attributes: ['lastName'],
                where: {
                    id: req.params.id
                }
            })
            res.json(results)
        } else {
            res.status(401).json({message: 'Token invalido'})
        }
    } catch(err) {
        console.log(err)
    }
}
