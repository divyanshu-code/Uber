const axios = require('axios');

module.exports.getAddressCoordinates = async (address) => {
    if (!address) {
        throw new Error('Address is required');
    }

    // const apiKey = process.env.GOOGLE_MAPS_API;                        // Ensure you have set this in your environment variables
    // const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;

    try {
        const response = await axios.get(url, {
            headers: {
                "User-Agent": "YourAppName/1.0 (your.email@example.com)"            // OSM requires a user-agent
            }
        });

        if (!response.data || response.data.length === 0) {
            throw new Error("No results found for the given address");
        }

        const location = response.data[0];
        return {
            lat: location.lat,
            lng: location.lon
        };
    } catch (error) {
        throw new Error(`Failed to fetch coordinates: ${error.message}`);
    }
};

async function getCoordinates(address) {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;
    const response = await axios.get(url, {
        headers: {
            "User-Agent": "YourAppName/1.0 (your.email@example.com)"
        }
    });

    if (!response.data || response.data.length === 0) {
        throw new Error(`No results found for address: ${address}`);
    }

    return {
        lat: response.data[0].lat,
        lng: response.data[0].lon
    };
}

module.exports.getDistanceAndTime = async (origin, destination) => {

    if (!origin || !destination) {
        throw new Error('Both origin and destination addresses are required');
    }

    const originCoords = await getCoordinates(origin);
    const destinationCoords = await getCoordinates(destination);

    // Use OSRM public API for routing
    const url = `https://router.project-osrm.org/route/v1/driving/${originCoords.lng},${originCoords.lat};${destinationCoords.lng},${destinationCoords.lat}?overview=false`;

    console.log(url);

    try {
        const response = await axios.get(url);
        if (
            !response.data ||
            !response.data.routes ||
            response.data.routes.length === 0
        ) {
            throw new Error('No route found between the given addresses');
        }

        const route = response.data.routes[0];

        const distanceKm = (route.distance / 1000).toFixed(2);

        const totalMinutes = Math.floor(route.duration / 60);
        const days = Math.floor(totalMinutes / (24 * 60));
        const hours = Math.floor((totalMinutes % (24 * 60)) / 60);
        const minutes = totalMinutes % 60;

        let durationStr = "";
        if (days > 0) durationStr += `${days} day${days > 1 ? "s" : ""} `;
        if (hours > 0) durationStr += `${hours} hour${hours > 1 ? "s" : ""} `;
        if (minutes > 0) durationStr += `${minutes} minute${minutes > 1 ? "s" : ""}`;
        if (durationStr === "") durationStr = "less than a minute";

        return {
            distance: `${distanceKm} km`,
            duration: durationStr.trim()
        };
    } catch (error) {
        throw new Error(`Failed to fetch distance and time: ${error.message}`);
    }
};


module.exports.getLocationSuggestions = async (input) => {
    if (!input) {
        throw new Error('Query is required for location suggestions');
    }

    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(input)}&addressdetails=1&limit=5`;

    try {
        const response = await axios.get(url, {
            headers: {
                "User-Agent": "YourAppName/1.0 (your.email@example.com)"
            }
        });

        if (!response.data || response.data.length === 0) {
            return [];
        }

        return response.data.map(item => {
            // Split display_name into parts (comma separated)
            const parts = item.display_name.split(",").map(p => p.trim());

            // Build offset-value list
            const components = parts.map((value, index) => ({
                offset: index,
                value
            }));

            return {
                displayName: item.display_name,
                lat: parseFloat(item.lat),
                lng: parseFloat(item.lon),
                address: item.address,
                address_components: components
            };
        });


    } catch (error) {
        throw new Error(`Failed to fetch location suggestions: ${error.message}`);
    }
};