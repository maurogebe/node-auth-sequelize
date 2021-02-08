import {Users} from "../models/";
import { validateJWT } from '../middlewares/jwt'

export const getUsers = async (req, res) => {
    const authHeader = req.header('Authorization')
    const token = authHeader.slice(7);
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
    const authHeader = req.header('Authorization')
    const token = authHeader.slice(7);
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
            // console.log(token)
            res.status(401).json({message: 'Token invalido'})
        }
    } catch(err) {
        console.log(err)
    }
    // console.log(token)
}
