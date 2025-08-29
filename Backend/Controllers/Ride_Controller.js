const rideservice = require('../Services/ride_service')
const { validationResult } = require('express-validator');
const mapservice = require('../Services/map.service')
const { sendMessageToSocketId } = require('../socket')
const ridemodel = require('../Models/ride_model')

module.exports.createride = async (req, res) => {
     const errors = validationResult(req)

     if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
     }

     const { pickup, destination, vehicleType } = req.body;

     try {

          const ride = await rideservice.createride({
               user: req.user._id,
               pickup,
               destination,
               vehicleType
          });


          const pickupcoordinate = await mapservice.getAddressCoordinates(pickup)

          const captainradius = await mapservice.getCaptainRadius(
               pickupcoordinate.lat,
               pickupcoordinate.lng,
               50)

          ride.set("otp", "");

          console.log("Nearby captains:", captainradius.length);

          const ridewithuser = await ridemodel.findOne({ _id: ride._id }).populate('user')

          captainradius.map(captain => {

               sendMessageToSocketId(captain.socketId, {
                    event: 'new-ride',
                    data: ridewithuser,
               })
          })

          res.status(200).json(ride);

     } catch (err) {

          return res.status(500).json({ message: err.message });

     }
}

module.exports.getfare = async (req, res) => {
     const errors = validationResult(req)

     if (!errors.isEmpty()) {
          console.log("Validation errors:", errors.array());
          return res.status(400).json({ errors: errors.array() });
     }

     const { pickup, destination } = req.query;

     try {

          const fare = await rideservice.getfare(pickup, destination);

          return res.status(200).json(fare);

     } catch (err) {
          return res.status(500).json({ message: err.message });

     }
}

module.exports.confirmride = async (req, res) => {

     const errors = validationResult(req)

     if (!errors.isEmpty()) {
          console.log("Validation errors:", errors.array());
          return res.status(400).json({ errors: errors.array() });
     }

     const { rideId } = req.body;

     try {

          const ride = await rideservice.getconfirm({ rideId, captain: req.captain });

          sendMessageToSocketId(ride.user.socketId, {

               event: 'ride-confirmed',
               data: ride
          })

          return res.status(200).json(ride);

     } catch (err) {
          return res.status(500).json({ message: err.message });

     }
}