const Workshop = require('../workshop.model.js');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Workshop', () => {
    after(() => {
      mongoose.models = {};
    });
    
    it('should throw an error if any arg is missing', () => {
      
      const cases = [
        {
          name: 'Doe'
        },
        {
         concertId: '78648768',
        },
        
      ];
      
      for(let type of cases){
        const emp = new Workshop(type);
        emp.validate(err => {
          expect(err.errors).to.exist;
        });
      }
    });
  
    it('should throw an error if "name" is not a string', () => {
      const cases = [{}, []];
      for(let test of cases) {
        const dep = new Workshop({ name: test, concertId: '64566'});
        dep.validate(err => {
          expect(err.errors).to.exist;
        });
      }
    });
  
    it('should throw an error if "concertId" is not a string', () => {
      const cases = [{}, []];
      for(let test of cases) {
        const dep = new Workshop({ name: 'John', concertId: test});
        dep.validate(err => {
          expect(err.errors).to.exist;
        });
      }
    });
  
  
    it('should throw no errors when pass proper args', () => {
      const cases = [
        {
          name: 'John',
          concertId: '54656',
        },
        {
          name: 'AMelia',
          concertId: '67787htgtgt5656',
        },
      ]
      for(let test of cases) {
        const dep = new Workshop(test);
        dep.validate(err => {
          expect(err).to.not.exist;
        });
      }
    });
  });