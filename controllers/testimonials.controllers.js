const Testimonial = require('../models/testimonail.model');
const sanitize = require('mongo-sanitize');


  exports.getAll = async (req, res) => {
    try {
      res.json(await Testimonial.find({}));
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  };


  exports.getRandom = async (req, res) => {

    try {
      const count = await Testimonial.countDocuments();
      const rand = Math.floor(Math.random() * count);
      const dep = await Testimonial.findOne().skip(rand);
      if(!dep) res.status(404).json({ message: 'Not found' });
      else res.json(dep);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }

  };

exports.getId =  async (req, res) => {

    try {
      const dep = await Testimonial.findById(req.params.id);
      if(!dep) res.status(404).json({ message: 'Not found' });
      else res.json(dep);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  
  };


  exports.post = async (req, res) => {

    try {
      const author = sanitize(req.body.author);
      const text = sanitize(req.body.text);
  
      const newTestiomonial = new Testimonial({ author, text});
      await newTestiomonial.save();
      res.json({ message: 'OK' });
  
    } catch(err) {
      res.status(500).json({ message: err });
    }
  
  };

  exports.putId = async (req, res) => {
    const { author, text } = req.body;
  
    try {
      const dep = await(Testimonial.findById(req.params.id));
      if(dep) {
        await Testimonial.updateOne({ _id: req.params.id }, { $set: { author: author, text: text }});
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
      const dep = await(Testimonial.findById(req.params.id));
      if(dep) {
        await Testimonial.deleteOne({ _id: req.params.id });
        res.json(dep);
      }
      else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  
  };
