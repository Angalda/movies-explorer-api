const router = require('express').Router();

const {
 updateUser, getUser,
} = require('../controllers/users');


router.get('/me', getUser);
router.patch('/me', updateUser);
