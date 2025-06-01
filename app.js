const express = require('express');
const mongoose = require('mongoose');
const constants = require('./constant');
const Controller = require('./controller');
const controller = new Controller();

const app = express();
app.use(express.json());

// Connect to database
require('./database');

app.get('/api/v1/users', async (req, res) => {
    try {
        const users = await controller.getAllPersons();
        res.json({
            message: constants.MESSAGES.FETCHED,
            success: true,
            data: users
        });
    } catch (err) {
        res.status(500).json({
            message: constants.MESSAGES.ERROR,
            success: false,
            error: err.message
        });
    }
});

app.post('/api/v1/users', async (req, res) => {
    try {
        const user = await controller.addPerson(req.body);
        res.status(201).json({
            message: constants.MESSAGES.CREATED,
            success: true,
            data: user
        });
    } catch (err) {
        res.status(500).json({
            message: constants.MESSAGES.ERROR,
            success: false,
            error: err.message
        });
    }
});

app.get('/api/v1/users/:id', async (req, res) => {
    try {
        const user = await controller.getUserById(req.params.id);
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
                success: false
            });
        }
        res.json({
            message: constants.MESSAGES.FETCHED,
            success: true,
            data: user
        });
    } catch (err) {
        res.status(500).json({
            message: constants.MESSAGES.ERROR,
            success: false,
            error: err.message
        });
    }
});

app.put('/api/v1/users/:id', async (req, res) => {
    try {
        const user = await controller.editUserById(req.params.id, req.body);
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
                success: false
            });
        }
        res.json({
            message: constants.MESSAGES.UPDATED,
            success: true,
            data: user
        });
    } catch (err) {
        res.status(500).json({
            message: constants.MESSAGES.ERROR,
            success: false,
            error: err.message
        });
    }
});

app.delete('/api/v1/users/:id', async (req, res) => {
    try {
        const user = await controller.deleteUserById(req.params.id);
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
                success: false
            });
        }
        res.json({
            message: constants.MESSAGES.DELETED,
            success: true,
            data: user
        });
    } catch (err) {
        res.status(500).json({
            message: constants.MESSAGES.ERROR,
            success: false,
            error: err.message
        });
    }
});

module.exports = app;