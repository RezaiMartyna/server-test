const express = require('express');
const router = express.Router();
const db = require('./../db');

router.route('/seats').get((req, res) => {
    res.json(db.seats);
  });
  
  router.route('/seats/random').get((req, res) =>{
    res.json(db.seats[Math.floor(Math.random() * db.seats.length)]);
  });
  
  router.route('/seats/:id').get((req, res) => {
    res.json(db.seats.find(({id}) => id == req.params.id));
  });
  
  router.route('/seats').post((req, res) => {
    const seat = {
      id: uuidv4(),
      day: req.body.day,
      seat: req.body.seat,
      client: req.body.client,
      email: req.body.email
    };
  
    if(db.seats.some(chosenSeat => (chosenSeat.day == req.body.day && chosenSeat.seat == req.body.seat))) {
      return res.status(404).json({ message: 'The seat is taken'});
    }
    else {
      db.seats.push(seat);
      return res.json(db.seats);
    }
  });
  
  router.route('/seats/:id').put((req, res) => {
    const item = (db.seats.find(({id}) => id == req.params.id));
    if (item){
      item.day = req.body.day;
      item.client = req.body.client;
      item.seat = req.body.seat; 
      item.email = req.body.email; 
    }
    res.json({ message: 'OK' });
  });
  
  router.route('/seats/:id').delete((req, res) => {
    const itemIndex = (db.seats.findIndex(({id}) => id == req.params.id));
    db.seats.splice(itemIndex, 1)
    res.json({ message: 'OK' });
  });

  module.exports = router;