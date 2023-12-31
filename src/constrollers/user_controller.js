import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import moment from "moment/moment.js";
import jwt  from "jsonwebtoken";
import {} from "dotenv/config";
import { User } from "../models/user_model.js";

export const users_view = async (req, res, next) => {
    try {

        console.log("=======================");
        const users = await User.findAll();
        
        res.render("users", {
            users: users
        })
    } catch (error) {
        res.status(400).send(error);
        next();
    }
}

export const new_user = async (req, res, next) => {
    try {
        // Validar errores con express-validator
        const errores = validationResult(req);
        if(!errores.isEmpty()){
            res.status(400).json({errores: errores.array()})
            return;
        }

        const {body} = req;
        //Validar que no exista el usuario previamente
        const user_exist = await User.findOne({where: {user_name: body.user_name}});
        if(user_exist !== null){
            res.status(400).json({error:"El usuario ya existe en el sistema" });
            return;
        }
        
        // Encriptar password
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(body.user_password, salt);
        
        // Guardar nuevo registro en la base de datos
        const new_user_created = await User.create({
            user_name: body.user_name,
            user_email: body.user_email, 
            user_password: hash, 
            user_created_at: moment().format("YYYY-MM-DD hh:mm:ss"),
            user_modify_at: moment().format("YYYY-MM-DD hh:mm:ss"),
            user_status: "A"
        })

        // Respuesta
        res.json({
            user_name:new_user_created.user_name,
            created_at: new_user_created.user_created_at
        });

        // json web token
        // Metodos HTTP
        // Codigos de respuesta HTTP
        // Sequalize
        
    } catch (error) {
        res.status(400).send(error);
        next();
    }    
}

export const login = async (req, res, next) => {
    try {
        
        // Validar errores con express-validator
        const errores = validationResult(req);
        if(!errores.isEmpty()){
            res.status(400).json({errores: errores.array()})
            return;
        }
        const {body} = req;

        // Verificar si el usuario existe
        const user = await User.findOne({where:{user_email:body.user_email}});
        if(!user){
            res.status(400).json({error:"El usuario no existe en la base de datos"})
            return;
        }
        // Verificar que la contraseña sea correcta
        const match = await bcrypt.compare(body.user_password, user.user_password);
        if(!match){
            res.status(400).json({error:"La contraseña es incorrecta"})
            return;
        }
        // Se crea el token de seguridad
        // Payload
        const payload = {user_id: user.user_id}
        const {sign} = jwt;        
        const token = sign(payload, process.env.TOKEN_SECRECT, {expiresIn: (60000*30)})
        console.log("token::::", token);
        
        // Se crea la sesión del usuario
        req.session.user_id = user.user_id;
        req.session.loged = true;

        // Se genera respuesta con el token de seguridad en el header
        res.header("auth-token", token).json({
            token:token,
            user_id: user.user_id
        });
    } catch (error) {
        res.status(400).send(error);
        next();
    }
}

export const verify_token = (req, res, next) => {
    const { verify } = jwt;
    const token = req.header("auth-token")
    if(!token){
        res.status(400).send("Acceso denegado");
        next();
    }
    try {
        const verified = verify(token, process.env.TOKEN_SECRECT);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).send("Token invalido");
        next();
    }
}