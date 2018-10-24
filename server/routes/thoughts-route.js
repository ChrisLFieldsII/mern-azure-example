const router = require('express').Router();
const Thought = require('../models/Thought');

/**
 * URL: localhost:5001/api/thoughts/
 * Response: Array of all Thought documents
 */
router.get('/', (req, res, next) => {
  Thought.find({}, (err, thoughts) => {
    if (err) next(err);
    else res.json(thoughts);
  });
});

/**
 * URL: localhost:5001/api/thoughts/seed
 * Description: Used to give database some test data.
 */
router.post('/seed', async (req, res, next) => {
  for (let x = 0; x < 5; x++) {
    const newThought = new Thought({
      thought: `This is thought ${Math.random().toFixed(5)}`,
      dateCreated: new Date(),
    });
    await newThought.save();
  }
  res.send('Lets run the GET after this to see if the thoughts got seeded successfully  ');
});

/**
 * URL: localhost:5001/api/thoughts/create
 * Response: Newly created Thought object if successful
 */
router.post('/create', (req, res, next) => {
  const { thought } = req.body;
  const newThought = new Thought({
    thought,
    dateCreated: new Date(),
  });
  newThought.save(err => {
    if (err) next(err);
    else res.json({ newThought, msg: 'thought successfully saved!' });
  });
});

/**
 * URL: localhost:5001/api/thoughts/
 * Description: Deletes all Thoughts from DB
 */
router.delete('/', (req, res, next) => {
  Thought.deleteMany({}, err => {
    if (err) next(err);
    else res.send('Successfully deleted all thoughts');
  });
});

module.exports = router;
