const express = require('express');
const {getAllUsers, updateUser, getUserById} = require('../controllers/userController')
const {authenticate, isAdmin} = require('../middleware/auth')
const router = express.Router();

router.get('/:id', authenticate, getUserById);
router.put('/:id', authenticate, updateUser);
router.get('/', authenticate, getAllUsers);
// router.get('/', authenticate, isAdmin, getAllUsers);

module.exports = router;

