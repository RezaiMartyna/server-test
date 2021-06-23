const Concert = require('../models/concert.model');
const Workshop = require('../models/workshop.model');


  exports.getAll = async (req, res) => {
    
    
    try {

      const concerts = await Concert.find({});
      const concertsWithWorkshops = concerts.map(async concert =>  {
        console.log(concert);
        const workshops = await Workshop.find({concertId:concert.id})
        console.log(workshops);

        const obj = {...concert, workshops};
        console.log(obj)
        return obj
        
      });
      console.log(concertsWithWorkshops)
      res.json(concertsWithWorkshops);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  };

  exports.getRandom = async (req, res) => {

    try {
      const count = await Concert.countDocuments();
      const rand = Math.floor(Math.random() * count);
      const dep = await Concert.findOne().skip(rand);
      if(!dep) res.status(404).json({ message: 'Not found' });
      else res.json(dep);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }

  };
  

  exports.getId =  async (req, res) => {

    try {
      const dep = await Concert.findById(req.params.id);
      if(!dep) res.status(404).json({ message: 'Not found' });
      else res.json(dep);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  
  };
  

  exports.post = async (req, res) => {

    try {
  
      const { performer, genre, price, day, image } = req.body;
      const newConcert = new Concert({ performer: performer, genre: genre, price: price, day: day, image: image });
      await newConcert.save();
      res.json({ message: 'OK' });
  
    } catch(err) {
      res.status(500).json({ message: err });
    }
  
  };


  exports.putId = async (req, res) => {
    const { performer, genre, price, day, image } = req.body;
  
    try {
      const dep = await(Concert.findById(req.params.id));
      if(dep) {
        await Concert.updateOne({ _id: req.params.id }, { $set: { performer: performer, genre: genre, price: price, day: day, image: image }});
        res.json(dep);
      }
      else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  
  };
  
  exports.delete = async (req, res) => {

    try {
      const dep = await(Concert.findById(req.params.id));
      if(dep) {
        await Concert.deleteOne({ _id: req.params.id });
        res.json(dep);
      }
      else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  
  };
