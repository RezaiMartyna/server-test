const express = require('express');
const router = express.Router();

const ConcertController = require('../controllers/conserts.controllers');

router.get('/concerts', ConcertController.getAll);
  
  router.get('/concerts/random', ConcertController.getRandom);
  
  router.get('/concerts/:id', ConcertController.getId);
  
  router.post('/concerts', ConcertController.post);
  
  router.put('/concerts/:id', ConcertController.post);
  
  router.delete('/concerts/:id', ConcertController.delete);

  
module.exports = router;