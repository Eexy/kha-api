const express = require("express");
const auth = require("../middlewares/auth");
const Todo = require("../../db/models/todo");
const User = require("../../db/models/user");
const router = express.Router();

router.get("/todos", auth, async (req, res) => {
  if (!req.user) {
    return res.status(401).send({ error: "You need to be logged" });
  }

  try {
    await req.user.populate({ path: "todos" }).execPopulate();
    res.status(200).send(req.user.todos);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

router.post("/todo", auth, async (req, res) => {
  if (!req.user) {
    return res.status(401).send({ error: "You need to be logged" });
  }

  const todo = new Todo({
    description: req.body.description,
    owner: req.user._id,
  });
  await todo.save();
  res.status(201).send(todo);
});

router.delete("/todo/:id", auth, async (req, res) => {
  if (!req.user) {
    return res.status(401).send({ error: "You need to be logged" });
  }

  const { params } = req;
  try {
    const todo = await Todo.findOneAndDelete({
      _id: params.id,
      owner: req.user._id,
    });
    if (!todo) {
      return res.status(404).send({ error: "Todo doesn't exist" });
    }
    res.status(200).send(todo);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

router.patch("/todo/:id", auth, async (req, res) => {
  if (!req.user) {
    return res.status(401).send({ error: "You need to be logged" });
  }

  const updates = req.body;
  const updatesKeys = Object.keys(updates)
  const allowedUpdates = ['completed', 'description'];

  // check if the updates are among the allowed ones
  const isAllowed = updatesKeys.every((update) => allowedUpdates.includes(update));

  if(!isAllowed){
    return res.send({error: "updates are not valid"});
  }

  const todo = await Todo.findOne({_id: req.params.id, owner: req.user._id});

  updatesKeys.forEach((key) => {
    todo[key] = updates[key];
  });

  await todo.save();

  res.status(204).send(todo);
});

module.exports = router;
