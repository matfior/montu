import { ProviderFactory, ProviderType } from '../lib/providers/provider-factory';
import { TomTomProvider } from '../lib/providers/tomtom-provider';

describe('ProviderFactory', () => {
  describe('createProvider', () => {
    it('should create a TomTom provider', () => {
      const apiKey = 'test-api-key';
      const provider = ProviderFactory.createProvider({
        type: ProviderType.TOMTOM,
        config: { apiKey },
      });

      expect(provider).toBeInstanceOf(TomTomProvider);
    });

    it('should throw error for unsupported provider type', () => {
      const invalidType = 'invalid' as ProviderType;
      
      expect(() => {
        ProviderFactory.createProvider({
          type: invalidType,
          config: {},
        });
      }).toThrow(`Unsupported provider type: ${invalidType}`);
    });
  });
}); 