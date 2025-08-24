const rideservice = require('../Services/ride_service')
const { validationResult } = require('express-validator');

module.exports.createride = async (req , res)=>{
    const errors = validationResult(req)

     if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
     }

      const { pickup, destination, vehicleType } = req.body;

      try{

           const ride = await rideservice.createride({
                  user : req.user._id ,
                  pickup,
                  destination,
                  vehicleType
              });

            return res.status(200).json(ride);

      }catch(err){
           return res.status(500).json({ message: err.message });
    
      }
}