const ridemodel = require('../Models/ride_model')
const mapservice = require('../Services/map.service')
const crypto = require('crypto');

async function getfare(pickup, destination) {
    if (!pickup || !destination) {
        throw new Error("pickup and destination are required");
    }

    const distancetime = await mapservice.getDistanceAndTime(pickup, destination);

    let { distance, duration } = distancetime;
    // distance like "5.23 km"
    // duration like "2 hours 15 minutes"

    // Convert distance string → number (km)
    const numericDistance = parseFloat(distance.replace(" km", ""));

    // Convert duration string → total minutes
    function parseDurationToMinutes(durationStr) {
        let days = 0, hours = 0, minutes = 0;

        const dayMatch = durationStr.match(/(\d+)\s*day/);
        const hourMatch = durationStr.match(/(\d+)\s*hour/);
        const minuteMatch = durationStr.match(/(\d+)\s*minute/);

        if (dayMatch) days = parseInt(dayMatch[1]);
        if (hourMatch) hours = parseInt(hourMatch[1]);
        if (minuteMatch) minutes = parseInt(minuteMatch[1]);

        return (days * 24 * 60) + (hours * 60) + minutes;
    }

    const totalMinutes = parseDurationToMinutes(duration);

    // Base fares
    const baseFares = {
        car: 50,
        auto: 30,
        motorcycle: 20
    };

    // Per km rates
    const perKmRates = {
        car: 12,
        auto: 8,
        motorcycle: 5
    };

    // Per minute rates
    const perMinuteRates = {
        car: 3,
        auto: 2,
        motorcycle: 1.5
    };

    // Calculate fares including distance + time
    const fares = {
        car: (baseFares.car + (numericDistance * perKmRates.car) + (totalMinutes * perMinuteRates.car)).toFixed(2),
        auto: (baseFares.auto + (numericDistance * perKmRates.auto) + (totalMinutes * perMinuteRates.auto)).toFixed(2),
        motorcycle: (baseFares.motorcycle + (numericDistance * perKmRates.motorcycle) + (totalMinutes * perMinuteRates.motorcycle)).toFixed(2)
    };

    return fares
        
}

function getotp(num) {
    return crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
}

module.exports.createride= async ({ user , vehicleType , pickup, destination , }) => {

       if (!user || !pickup || !destination || !vehicleType) {
            throw new Error('All fields are required');
       }

        const fare = await getfare(pickup , destination)
        
       const ride = await ridemodel.create({
             user,
             pickup,
             destination,
             otp : getotp(6),
             fare : fare [vehicleType]
       })

       return ride;

    }

