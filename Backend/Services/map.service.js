const axios = require('axios');

module.exports.getAddressCoordinates = async (address) => {
    if (!address) {
        throw new Error('Address is required');
    }

    const apiKey = process.env.GOOGLE_MAPS_API;                        // Ensure you have set this in your environment variables
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);

        if (response.data.status !== 'OK') {
            throw new Error(`Error fetching coordinates: ${response.data.status}`);
        }

        const location = response.data.results[0].geometry.location;
        return {
            lat: location.lat,
            lng: location.lng
        };
    } catch (error) {
        throw new Error(`Failed to fetch coordinates: ${error.message}`);
    }
};