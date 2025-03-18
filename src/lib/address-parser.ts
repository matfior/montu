import {
  AddressParserConfig,
  AddressProvider,
  AddressSuggestion,
  SuggestionOptions,
} from '../types';
import { ProviderFactory, ProviderType } from './providers/provider-factory';

/**
 * Main address parser class
 */
export class AddressParser {
  private provider: AddressProvider;

  /**
   * Create a new address parser
   * @param config Parser configuration
   */
  constructor(config: AddressParserConfig) {
    // By default, use the TomTom provider
    this.provider = ProviderFactory.createProvider({
      type: ProviderType.TOMTOM,
      config: {
        apiKey: config.apiKey,
        baseUrl: config.options?.baseUrl,
        timeout: config.options?.timeout,
      },
    });
  }

  /**
   * Set a custom provider
   * @param provider Address provider instance
   */
  setProvider(provider: AddressProvider): void {
    this.provider = provider;
  }

  /**
   * Get address suggestions based on a partial input
   * @param query Partial address input
   * @param options Additional options for the suggestion request
   * @returns Promise resolving to an array of address suggestions
   */
  async getSuggestions(
    query: string,
    options?: SuggestionOptions
  ): Promise<AddressSuggestion[]> {
    if (!query || query.trim() === '') {
      return [];
    }

    return this.provider.getSuggestions(query, options);
  }
} 