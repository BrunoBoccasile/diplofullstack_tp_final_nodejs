import ServerError from "../helper/serverError.js"
import * as userRepository from "../repository/user.repository.js"
import bcrypt from "bcrypt"
import { handleError } from "../helper/errorHandler.js"
import mongoose from "mongoose"
export async function createUser(req, res) {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            throw new ServerError("Todos los campos (email, password) son requeridos", 400);
        }
        const userFound = await userRepository.findUserByEmail(email)

        if (userFound) {
            throw new ServerError('El usuario ya existe', 400)
        }

        const passwordCrypted = await bcrypt.hash(password, 10)

        const createdUser = await userRepository.createUser({
            email,
            password: passwordCrypted
        })

        res.status(201).json({
            ok: true,
            message: 'Usuario creado exitosamente',
            data: createdUser
        })

    } catch (error) {
        handleError(error, res)
    }
}


export async function findAllUsers(req, res) {
    try {
        const users = await userRepository.findAllUsers()

        res.status(200).json({
            ok: true,
            data: users
        })

    } catch (error) {
        handleError(error, res)
    }
}


export async function findUser(req, res) {
    try {

        const user_id = req.params.id || {}

        if (!mongoose.Types.ObjectId.isValid(user_id)) {
            throw new ServerError("El id no tiene un formato válido", 400)
        }

        const user = await userRepository.findUserById(user_id)

        if (!user) {
            throw new ServerError('El usuario no existe', 404)
        }

        res.status(200).json({
            ok: true,
            data: user
        })

    } catch (error) {
        handleError(error, res)
    }
}


export async function deleteUser(req, res) {
    try {
        const deletedUser = await userRepository.deleteUserById(req.params.id)

        if (!deletedUser) {
            throw new ServerError('El usuario no existe', 404)
        }

        res.status(200).json({
            ok: true,
            message: "Usuario eliminado con éxito",
            data: deletedUser
        })

    } catch (error) {
        handleError(error, res)
    }
}