const sequelize = require("../db");
const Task = require("./Task");

const syncDatabase = async () => {
    try {
        await sequelize.sync({ alter: true });
        console.log("Database synchronized");
    } catch (error) {
        console.error("Database sync error:", error);
    }
};

syncDatabase();

module.exports = { Task };
