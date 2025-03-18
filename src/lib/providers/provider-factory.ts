import { AddressProvider } from '../../types';
import { TomTomProvider, TomTomProviderConfig } from './tomtom-provider';

/**
 * Provider types supported by the factory
 */
export enum ProviderType {
  TOMTOM = 'tomtom',
  // Add more providers here in the future
}

/**
 * Configuration for the provider factory
 */
export interface ProviderFactoryConfig {
  /** Provider type */
  type: ProviderType;
  /** Provider-specific configuration */
  config: any;
}

/**
 * Factory for creating address providers
 */
export class ProviderFactory {
  /**
   * Create a new address provider
   * @param factoryConfig Provider factory configuration
   * @returns Address provider instance
   */
  static createProvider(factoryConfig: ProviderFactoryConfig): AddressProvider {
    const { type, config } = factoryConfig;

    switch (type) {
      case ProviderType.TOMTOM:
        return new TomTomProvider(config as TomTomProviderConfig);
      default:
        throw new Error(`Unsupported provider type: ${type}`);
    }
  }
} 