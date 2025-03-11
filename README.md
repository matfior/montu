# QuickRoute Address Parser

A TypeScript library for parsing partial address inputs using the TomTom API. This library is designed for QuickRoute's backend to provide full address suggestions from partial address inputs.

## Features

- Parses partial address inputs and returns full address suggestions
- Leverages the TomTom API for accurate address data
- Restricts results to Australian addresses only
- Provides typed responses for easy consumption in Node.js applications
- Extensible architecture to support alternative API providers in the future

## Installation

```bash
npm install quickroute-address-parser
```

Or with Yarn:

```bash
yarn add quickroute-address-parser
```

## Usage

```typescript
import { AddressParser } from 'quickroute-address-parser';

// Initialize with your TomTom API key
const addressParser = new AddressParser({
  apiKey: 'YOUR_TOMTOM_API_KEY',
});

// Get address suggestions
async function getAddressSuggestions() {
  try {
    const suggestions = await addressParser.getSuggestions('123 Main St, Sydney');
    console.log(suggestions);
  } catch (error) {
    console.error('Error getting address suggestions:', error);
  }
}

getAddressSuggestions();
```

## API Reference

### `AddressParser`

The main class for parsing addresses.

#### Constructor

```typescript
constructor(config: AddressParserConfig)
```

- `config`: Configuration object for the address parser
  - `apiKey`: Your TomTom API key
  - `options` (optional): Additional options for the parser

#### Methods

##### `getSuggestions(query: string, options?: SuggestionOptions): Promise<AddressSuggestion[]>`

Returns address suggestions based on a partial input.

- `query`: The partial address input
- `options` (optional): Additional options for the suggestion request
  - `limit`: Maximum number of suggestions to return (default: 10)

Returns a Promise that resolves to an array of `AddressSuggestion` objects.

## Development

### Prerequisites

- Node.js (LTS version)
- npm or Yarn

### Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Build the project:
   ```bash
   npm run build
   ```

### Testing

Run tests with:

```bash
npm test
```

## License

MIT 