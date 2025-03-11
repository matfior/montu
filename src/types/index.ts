/**
 * Configuration for the address parser
 */
export interface AddressParserConfig {
  /** TomTom API key */
  apiKey: string;
  /** Optional additional configuration */
  options?: {
    /** Base URL for the TomTom API */
    baseUrl?: string;
    /** Timeout for API requests in milliseconds */
    timeout?: number;
  };
}

/**
 * Options for address suggestions
 */
export interface SuggestionOptions {
  /** Maximum number of suggestions to return */
  limit?: number;
}

/**
 * Address suggestion result
 */
export interface AddressSuggestion {
  /** Unique identifier for the address */
  id: string;
  /** Full formatted address */
  formattedAddress: string;
  /** Address components */
  components: {
    /** Street number */
    streetNumber?: string;
    /** Street name */
    street?: string;
    /** Suburb or locality */
    suburb?: string;
    /** City or municipality */
    municipality?: string;
    /** State or province */
    state?: string;
    /** Postal code */
    postalCode?: string;
    /** Country */
    country: string;
  };
  /** Geographic coordinates */
  position: {
    /** Latitude */
    lat: number;
    /** Longitude */
    lon: number;
  };
  /** Score indicating the relevance of the suggestion (0-1) */
  score: number;
}

/**
 * Interface for address provider services
 */
export interface AddressProvider {
  /**
   * Get address suggestions based on a partial input
   * @param query Partial address input
   * @param options Additional options for the suggestion request
   * @returns Promise resolving to an array of address suggestions
   */
  getSuggestions(query: string, options?: SuggestionOptions): Promise<AddressSuggestion[]>;
}

/**
 * Raw response from the TomTom API
 */
export interface TomTomResponse {
  summary: {
    query: string;
    queryType: string;
    queryTime: number;
    numResults: number;
    offset: number;
    totalResults: number;
    fuzzyLevel: number;
  };
  results: TomTomResult[];
}

/**
 * Individual result from the TomTom API
 */
export interface TomTomResult {
  type: string;
  id: string;
  score: number;
  address: {
    streetNumber?: string;
    streetName?: string;
    municipalitySubdivision?: string;
    municipality?: string;
    countrySecondarySubdivision?: string;
    countrySubdivision?: string;
    postalCode?: string;
    countryCode: string;
    country: string;
    freeformAddress: string;
  };
  position: {
    lat: number;
    lon: number;
  };
} 