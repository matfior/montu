import { AddressParser } from '../index';

// Use the API key provided in the challenge
const API_KEY = 'Oyb0npJAVdRwDauqpFez7zKCy2euUYql';

// Initialize the address parser with the API key
const addressParser = new AddressParser({
  apiKey: API_KEY,
});

// Get address suggestions
async function getAddressSuggestions() {
  try {
    // Example 1: Get suggestions for a city
    console.log('Example 1: Searching for "Sydney, Australia"');
    const suggestions1 = await addressParser.getSuggestions('Sydney, Australia');
    console.log(`Found ${suggestions1.length} suggestions`);
    console.log('First suggestion:', suggestions1[0]?.formattedAddress || 'None');
    
    // Example 2: Get suggestions with a limit
    console.log('\nExample 2: Searching for "Melbourne" with limit 3');
    const suggestions2 = await addressParser.getSuggestions('Melbourne', { limit: 3 });
    console.log(`Found ${suggestions2.length} suggestions (limited to 3)`);
    suggestions2.forEach((suggestion, index) => {
      console.log(`[${index + 1}] ${suggestion.formattedAddress}`);
    });
    
    // Example 3: Get suggestions for a specific address
    console.log('\nExample 3: Searching for "200 George St, Sydney"');
    const suggestions3 = await addressParser.getSuggestions('200 George St, Sydney');
    console.log(`Found ${suggestions3.length} suggestions`);
    suggestions3.forEach((suggestion, index) => {
      console.log(`[${index + 1}] ${suggestion.formattedAddress}`);
    });
  } catch (error: unknown) {
    console.error('Error getting address suggestions:', error);
  }
}

getAddressSuggestions();