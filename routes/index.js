var express = require('express');
var router = express.Router();

const todos = require('../models/todo')
const allTodos = todos.getAll();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.ejs', { title: 'Home Page' });
});

//GET /todos
router.get('/todos', function(req, res, next) {
  res.render('todos/index.ejs', {todos: allTodos});
});


module.exports = router;
