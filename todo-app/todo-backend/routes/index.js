const express = require('express');
const router = express.Router();

const configs = require('../util/config');
const { get } = require('../redis');

let visits = 0

/* GET index data. */
router.get('/', async (req, res) => {
  visits++

  res.send({
    ...configs,
    visits
  });
});

router.get('/statistics', async (req, res) => {
  const counter = await get('statistics:counter')
  res.send({
    added_todos: counter ? Number(counter) : 0
  });
});

router.get('/test', async (req, res) => {
  res.send({
    text: "test2"
  });
});

module.exports = router;
