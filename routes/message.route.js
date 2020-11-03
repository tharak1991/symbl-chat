const express = require("express");
const routes = express.Router();
const message_controller = require("../controllers/message.controller");

routes.get("/all", async (req, res, next) => {
    try {
        const user_chats = await message_controller.getAllUserChats();      
        await res.status(200).json({status: true,
            user_chats: user_chats});
    } catch (error) {
        console.error(error);
        next();
    }
});


routes.get("/state/:name", async (req, res, next) => {
    try {
        let room = req.params.name ;
        const room_state = await message_controller.getRoomState(room);
        await res.status(200).json({status: true,
            room_state: room_state
        });
    } catch (error) {
        console.error(error);
        next();
    }
});


// routes.get("/users", async (req, res, next) => {
//     try {
//         const users = await message_controller.getAllUsers();
//         await res.status(200).json({status: true,
//             users: users});
//     } catch (error) {
//         console.error(error);
//         next();
//     }
// });

routes.get("/rooms/:name", async (req, res, next) => {
    try {
        let room = req.params.name ;
        const chats = await message_controller.getAllRoomChats();
        await res.status(200).json({status: true,
            room: room,
            chats: chats});
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
