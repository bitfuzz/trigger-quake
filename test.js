// Import the node-fetch library to make HTTP requests
// const fetch = require('node-fetch');

// The main function that will run our script
async function searchPlaces() {
  // Get the search query from command-line arguments.
  // process.argv[0] is 'node', [1] is the script file name.
  // We join the rest of the arguments to allow for multi-word searches.
  const query = process.argv.slice(2).join(' ');

  // If no search query is provided, show instructions and exit.
  if (!query) {
    console.log('❌ Please provide a search query.');
    console.log('Example: node test-osm.js "Eiffel Tower"');
    return;
  }

  console.log(`Searching for: "${query}"...`);

  try {
    // URL-encode the query to handle spaces and special characters
    const encodedQuery = encodeURIComponent(query);
    const url = `https://nominatim.openstreetmap.org/search?q=${encodedQuery}&format=json&limit=5`;

    // Make the GET request to the Nominatim API
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        // IMPORTANT: Nominatim requires a custom User-Agent.
        // Replace with your app name and contact email.
        'User-Agent': 'MyTestApp/1.0 (your-email@example.com)',
      },
    });

    // Check if the request was successful
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}: ${response.statusText}`);
    }

    // Parse the JSON response
    const places = await response.json();

    // Check if any results were returned
    if (places.length === 0) {
      console.log('No results found.');
      return;
    }

    // Print the results in a formatted way
    console.log(`\nFound ${places.length} results:\n`);
    places.forEach((place, index) => {
      console.log(`--- Result ${index + 1} ---`);
      console.log(`📍 Name: ${place.display_name}`);
      console.log(`   Lat: ${place.lat}, Lon: ${place.lon}`);
      console.log(`   Type: ${place.type}`);
      console.log('---------------------\n');
    });

  } catch (error) {
    console.error('An error occurred:', error.message);
  }
}

// Run the main function
searchPlaces();