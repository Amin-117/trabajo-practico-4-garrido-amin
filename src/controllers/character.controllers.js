import { request } from "express";
import Character from "../models/character.model";
import { UniqueConstraintError, ValidationError } from "sequelize";

export const createCharacter = async (requestAnimationFrame, res) => {
    try{
        const character = await Character.create(req.body);
        res.status(201).json(character);
    
} catch (error) {
    if (error instanceof UniqueConstraintError) {
        return res.status(400).json({
            messege: "ya existe un personaje con ese nombre",
        });
    }
}
if (error instanceof ValidationError){
    const errors = error.errors.mep(err => ({
        message: err.messege
    }));
    return res.status(404).json({
        Message: "erro de validacion de datos"
    })
}};