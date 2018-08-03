const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const usersController = require('../controllers/usersController');

////////////////////////////////
//AUTHENTICATED PROVIDERS ONLY
////////////////////////////////

// GET: all my clients, authenticated providers only
router.get('/users/my_clients', usersController.usersGetClientList);

// GET one of my clients by ID, accessible by authenticated provider only
router.get('/users/my_clients/:id', usersController.usersGetClient);

// GET one of my clients by lastName, accessible by authenticated provider only
router.get('/users/my_clients/:lastName', usersController.usersGetClientByName);

// POST new client accessible by authenticated provider only
router.post('/users/my_clients', usersController.usersPostClient);

//PUT MY CLIENT: update client of an authenticated provider 
router.put('/users/my_clients/:id', usersController.usersPutClient);

////////////////////////////////
// ALL AUTHENTICATED USERS
////////////////////////////////

// GET users/me: - get my client object only, accessible by any authenticated user
router.get('/users/me', usersController.usersGetMe);

//POST: create a user via the signup forms
router.post('/users', jsonParser, usersController.usersPost);

//PUT ME: update authenticated user (update me)
router.put('/users/me', usersController.usersPutMe);

////////////////////////////////
// PUBLIC
////////////////////////////////
//GET PROVIDERS update authenticated user (update me)
router.get('/users/providers', usersController.usersGetProviders);

////////////////////////////////
// DEV TESTING ONLY
////////////////////////////////
router.get('/users', usersController.usersGetAll);

module.exports = router;
