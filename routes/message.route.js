const express = require("express");
const routes = express.Router();
const message_controller = require("../controllers/message.controller");

routes.get("/all", async (req, res, next) => {
    try {
        const user_chats = await message_controller.getAllUserChats();
        console.log(user_chats);
        await res.status(200).json({status: true,
            user_chats: user_chats});
    } catch (error) {
        console.error(error);
        next();
    }
});


routes.use('*', (req, res) => {
    res.status(400).json({
        error: true,
        message: 'ERROR WHILE FETCHING DATA!',
        original: {},
    });
});

module.exports = routes;
