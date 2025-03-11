import { AddressParser } from '../lib/address-parser';
import { AddressProvider, AddressSuggestion } from '../types';

// Mock provider
class MockProvider implements AddressProvider {
  async getSuggestions(query: string): Promise<AddressSuggestion[]> {
    if (!query || query.trim() === '') {
      return [];
    }

    // Return mock data
    return [
      {
        id: 'mock-1',
        formattedAddress: '123 Mock St, Sydney NSW 2000, Australia',
        components: {
          streetNumber: '123',
          street: 'Mock St',
          suburb: 'CBD',
          municipality: 'Sydney',
          state: 'NSW',
          postalCode: '2000',
          country: 'Australia',
        },
        position: {
          lat: -33.8688,
          lon: 151.2093,
        },
        score: 0.9,
      },
    ];
  }
}

describe('AddressParser', () => {
  const apiKey = 'test-api-key';
  let parser: AddressParser;
  let mockProvider: MockProvider;

  beforeEach(() => {
    // Create a new parser for each test
    parser = new AddressParser({ apiKey });
    
    // Create and set mock provider
    mockProvider = new MockProvider();
    parser.setProvider(mockProvider);
  });

  describe('getSuggestions', () => {
    it('should return empty array for empty query', async () => {
      const result = await parser.getSuggestions('');
      expect(result).toEqual([]);
    });

    it('should return suggestions for valid query', async () => {
      const result = await parser.getSuggestions('123 Mock St');
      
      expect(result).toHaveLength(1);
      expect(result[0].formattedAddress).toBe('123 Mock St, Sydney NSW 2000, Australia');
    });

    it('should pass options to provider', async () => {
      // Spy on the provider's getSuggestions method
      const spy = jest.spyOn(mockProvider, 'getSuggestions');
      
      const options = { limit: 5 };
      await parser.getSuggestions('123 Mock St', options);
      
      expect(spy).toHaveBeenCalledWith('123 Mock St', options);
    });
  });
}); 