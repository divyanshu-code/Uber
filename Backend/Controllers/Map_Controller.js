const mapservice = require('../Services/map.service')
const { validationResult } = require('express-validator');


module.exports.getcoordinates = async (req, res, next) => {
     const errors = validationResult(req)

     if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
     }

     const { address } = req.query;

     try {

          const coordinates = await mapservice.getAddressCoordinates(address);

          console.log(coordinates);

          res.status(200).json(coordinates);
     } catch (err) {
          res.status(404).json({ message: 'Coordinates not found' });
     }
}

module.exports.getdistance = async (req, res, next) => {

     try {
          const errors = validationResult(req)

          if (!errors.isEmpty()) {
               return res.status(400).json({ errors: errors.array() });
          }

          const { origin, destination } = req.query

          const distancetime = await mapservice.getDistanceAndTime(origin, destination);
          res.status(200).json(distancetime)

     } catch (err) {
          console.log(err);

          res.status(500).json({ message: 'Internal server error' });

     }
}


module.exports.getsuggestion = async (req, res, next) => {

     try {
          const errors = validationResult(req)

          if (!errors.isEmpty()) {
               return res.status(400).json({ errors: errors.array() });
          }

          const { input } = req.query

          const suggestions = await mapservice.getLocationSuggestions(input)
          res.status(200).json(suggestions)

     } catch (err) {
          console.log(err);

          res.status(500).json({ message: 'Internal server error' });

     }
}