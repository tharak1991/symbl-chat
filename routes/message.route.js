/**
 * Api routes 
 */

const express = require("express");
const routes = express.Router();
const message_controller = require("../controllers/message.controller");

/**
 * @param {type} property - room_name.
 * returns state of a chatroom
 */
routes.get("/state/:room_name", async (req, res, next) => {
    try {
        let room = req.params.room_name;
        const room_state = await message_controller.getRoomState(room);
        await res.status(200).json({
            status: true,
            room_state: room_state
        });
    } catch (error) {
        console.error(error);
        next();
    }
});

/**
 * @param {type} property - user_name.
 * returns likelihood of user sending message in the next 1 minute at any given time
 */
routes.get("/likelihood/:user_name", async (req, res, next) => {
    try {
        let user_name = req.params.user_name;
        const user_likelihood = await message_controller.getlikelihood(user_name);
        await res.status(200).json({
            status: true,
            user_likelihood: user_likelihood
        });
    } catch (error) {
        console.error(error);
        next();
    }
});

/**
 * @param {type} property - user_name.
 * returns all chats in a room
 */
routes.get("/rooms/:room_name", async (req, res, next) => {
    try {
        let room = req.params.room_name;
        const chats = await message_controller.getAllRoomChats();
        await res.status(200).json({
            status: true,
            room: room,
            chats: chats
        });
    } catch (error) {
        console.error(error);
        next();
    }
});

/**
 * returns all chats in all rooms
 */
routes.get("/all", async (req, res, next) => {
    try {
        const user_chats = await message_controller.getAllUserChats();
        await res.status(200).json({
            status: true,
            user_chats: user_chats
        });
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