import express from "express";

import {
    createCharacter,
    getAllCharacters,
    getCharacterById,
    updateCharacter,
    deleteCharacter,
} from "../controllers/character.controllers.js"

const router = express.router();

router.post("/", createCharacter);
router.get("/", getAllCharacters);
router.get("/:id", getCharacterById);
router.put("/:id", updateCharacter);
router.delete("/id:", deleteCharacter);

export default router;


