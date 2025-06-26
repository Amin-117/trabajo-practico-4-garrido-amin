import { request } from "express";
import Character from "../models/character.model.js";
import { UniqueConstraintError, ValidationError } from "sequelize";

export const createCharacter = async (req, res) => {
    try{
        const character = await Character.create(req.body);
        res.status(201).json(character);
    
} catch (error) {
    if (error instanceof UniqueConstraintError) {
        return res.status(404).json({
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
export const getAllCharacters = async (req, res)=> {
    try{
        const character = await Character.findAll();
        res.json(characters);
    } catch (error){
        res.status(404).json({
            messege: "error del servidor al buscar los personajes",
            error: error.message
        });
    }
};
export const getCharacterById = async (req, res) => {
    try{
        const characterId = req.params.id;
        const character = await Character.findByPk(characterId);

        if (character){
            res.json(character);
        } else {
            res.status(404).json({messege: "personaje no encontrado"});
        }
    } catch (error) {
        res.status(404).json({
            messege: "error interno del servidor",
            error: error.message
        });
    }
};
export const updateCharacter = async (req, res) => {
    const characterId = req.params.id;
    try{
        const character = await Character.findByPk(characterId);
        
        if (!character) {
            return res.status(404).json({
                messege: "personaje no encontrado"
            });
        }

        const [updatedRows] = await Character.update(req.body, {
            where: {
                id: characterId
            },
            individualHooks: true
        });
    if (updatedRows > 0) {
      const updatedCharacter = await Character.findByPk(characterId);
      return res.json(updatedCharacter);
    } else {
      return res.status(400).json({
        message: "No se pudo actualizar el personaje, quizás los datos son los mismos o inválidos."
      });
    }
  } catch (error) {
    if (error instanceof UniqueConstraintError) {
      return res.status(400).json({
        message: "Ya existe otro personaje con ese nombre. Por favor, elige uno diferente.",
        details: error.errors.map(e => e.message)
      });
    }
    if (error instanceof ValidationError) {
      const errors = error.errors.map(err => ({
        field: err.path,
        message: err.message
      }));
      return res.status(400).json({
        message: "Error de validación de datos al actualizar el personaje.",
        errors: errors
      });
    };
    };
};
export const deleteCharacter = async (req,res) => {
    const characterId = req.params.id
    const character = Character.findByPk(characterId);

    if (!character){
        req.status(404).json({
            message: "no se encontro el personaje"
        });
    }
    const deleteRows = await Character.destroy({
        where: {
            id: characterId,
        }
    });

    if (deleteRows > 0) {
        res.json({
            messege: "personaje eliminado correctamente"
        });
    } else {
        req.status(404).json({
            messege: "personaje no encontrado"
        });
    }
};
