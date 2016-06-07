var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var todos = [{
  id: 1,
  description: 'Do something important!',
  completed: false
},{
  id: 2,
  description: 'Do another important thing!',
  completed: false
}];

app.get('/', function(req, res){
  res.send("Todo API Root")
});

app.get('/todos', function(req, res){
  res.send(todos);
});

app.get('/todos/:id', function(req, res){
  var todoId = parseInt(req.params.id, 10);
  var foundTodo;

  var i = 0;
  while (i < todos.length && !foundTodo) {
    if (todos[i].id === todoId) {
      foundTodo = todos[i];
    }
    i++;
  }

  if (foundTodo) {
    res.send(foundTodo);
  } else {
    res.status(404).send();
  }
})

app.listen(PORT, function(){
  console.log('Express listeningon port ' + PORT + '!');
});
