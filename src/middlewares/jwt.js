import jwt from "jsonwebtoken";

const ENV = process.env

//Completar la funcion para generar un token JWT en base al usuario que ha iniciado sesion
export const generateJWT = async(user) => {
    const userObj = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
    }
    const returnToken = await jwt.sign(userObj, ENV.SECRET_KEY, { algorithm: 'HS256', expiresIn: '1h' })
    //     if(token) {
    //         return token
    //     } else {
    //         console.log(err);
    //     }
    // });

    return returnToken
}

//Validar el token 
export const validateJWT = (token) => {
    const verify = jwt.verify(token, process.env.SECRET_KEY, async(err, token) => {
        if(!err) {
            return token
        } else {
            return false
        }
    })
    return verify
}

