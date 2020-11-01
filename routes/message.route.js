const express = require("express");
const routes = express.Router();
// const message_controller = require("../controllers/message.controller");

routes.get("/all", async (req, res, next) => {
    try {
        // let {user_info} = req.body;
        // let {room} = req.body;
        await res.json({status: true});
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
