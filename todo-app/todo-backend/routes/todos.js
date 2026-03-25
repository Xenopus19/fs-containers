const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();
const {get, set} = require('../redis')

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});


/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })

  const counter = await get('statistics:counter')
  await set('statistics:counter', Number(counter)+1)

  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

singleRouter.get('/', async (req, res) => {
  res.send(req.todo);
});

singleRouter.put('/', async (req, res) => {
  const newDone = req.body.done ?? req.todo.done;
  const newText = req.body.text ?? req.todo.text;

  req.todo.text = newText;
  req.todo.done = newDone;

  const savedTodo = await req.todo.save()
  res.send(savedTodo);
});


router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
