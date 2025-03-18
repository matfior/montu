import axios, { AxiosInstance } from 'axios';
import {
  AddressProvider,
  AddressSuggestion,
  SuggestionOptions,
  TomTomResponse,
  TomTomResult,
} from '../../types';

/**
 * TomTom API provider configuration
 */
export interface TomTomProviderConfig {
  /** TomTom API key */
  apiKey: string;
  /** Base URL for the TomTom API */
  baseUrl?: string;
  /** Timeout for API requests in milliseconds */
  timeout?: number;
}

/**
 * Default configuration values
 */
const DEFAULT_CONFIG = {
  baseUrl: 'https://api.tomtom.com/search/2',
  timeout: 5000,
};

/**
 * TomTom address provider implementation
 */
export class TomTomProvider implements AddressProvider {
  private client: AxiosInstance;
  private apiKey: string;

  /**
   * Create a new TomTom provider
   * @param config Provider configuration
   */
  constructor(config: TomTomProviderConfig) {
    this.apiKey = config.apiKey;
    
    this.client = axios.create({
      baseURL: config.baseUrl || DEFAULT_CONFIG.baseUrl,
      timeout: config.timeout || DEFAULT_CONFIG.timeout,
    });
  }

  /**
   * Get address suggestions from TomTom API
   * @param query Partial address input
   * @param options Additional options for the suggestion request
   * @returns Promise resolving to an array of address suggestions
   */
  async getSuggestions(
    query: string,
    options: SuggestionOptions = {}
  ): Promise<AddressSuggestion[]> {
    try {
      const limit = options.limit || 10;
      
      const response = await this.client.get<TomTomResponse>(
        `/search/${encodeURIComponent(query)}.json`,
        {
          params: {
            key: this.apiKey,
            limit,
            countrySet: 'AU', // Restrict to Australian addresses only
            typeahead: true,
            idxSet: 'Geo',
          },
        }
      );

      return this.transformResults(response.data.results);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`TomTom API error: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * Transform TomTom API results to our standard format
   * @param results Raw results from TomTom API
   * @returns Transformed address suggestions
   */
  private transformResults(results: TomTomResult[]): AddressSuggestion[] {
    if (!results || results.length === 0) {
      return [];
    }
    
    return results
      .filter(result => result.address.countryCode === 'AU') // Double-check country filter
      .map(result => ({
        id: result.id,
        formattedAddress: result.address.freeformAddress,
        components: {
          streetNumber: result.address.streetNumber,
          street: result.address.streetName,
          suburb: result.address.municipalitySubdivision,
          municipality: result.address.municipality,
          state: result.address.countrySubdivision,
          postalCode: result.address.postalCode,
          country: result.address.country,
        },
        position: {
          lat: result.position.lat,
          lon: result.position.lon,
        },
        score: result.score,
      }));
  }
} 