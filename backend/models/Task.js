const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Task = sequelize.define("Task", {
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    tag: { type: DataTypes.STRING },
    columnId: { type: DataTypes.INTEGER },
    position: { type: DataTypes.INTEGER },
});

module.exports = Task;
