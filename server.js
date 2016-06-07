var bodyParser = require('body-parser');
var express = require('express');
var _ = require('underscore');
var app = express();
var PORT = process.env.PORT || 3000;
var todoNextId = 1;
var todos = [];

app.use(bodyParser.json());

app.get('/', function(req, res){
  res.send("Todo API Root")
});

app.get('/todos', function(req, res){
  res.json(todos);
});

app.get('/todos/:id', function(req, res){
  var todoId = parseInt(req.params.id, 10);
  var foundTodo = _foundWhere(todos, {id: todoId});

  if (foundTodo) {
    res.json(foundTodo);
  } else {
    res.status(404).send();
  }
})

app.post('/todos', function(req, res){
  var body = req.body;

  if (!_.isBoolean(body.completed || !_.isString(body.description) || body.description.trim().length === 0)) {
    return res.status(400).send();
  }

  body.id = todoNextId;
  todos.push(body);
  todoNextId++;

  res.json(body);
});

app.listen(PORT, function(){
  console.log('Express listeningon port ' + PORT + '!');
});
