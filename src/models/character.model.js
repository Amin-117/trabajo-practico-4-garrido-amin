import { DataTypes } from "sequelize";
import sequelize from "../config/database.js"

const Character = sequelize.define(Character, {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    ki: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            isInt:{
                msg: "El ki debe ser un numero entero"
            },
        },
    },
    race: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            isIn:  {
                args: [["male", "female"]],
                msg: "el genero debe de ser Male o Female"
            },
        },
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
});

export default Character;