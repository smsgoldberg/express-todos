const express = require('express');
const router = express.Router();


//Require the controller that exports To-Do CRUD functions
const todosCtrl = require('../controllers/todos');


//All actual paths start with "/todos"

// GET /todos
router.get('/', todosCtrl.index);
// GET /todos/:id
router.get('/:id', todosCtrl.show);

module.exports = router;
