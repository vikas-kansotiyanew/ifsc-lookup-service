import { BaseProvider } from './base.provider';
import { RazorpayProvider } from './razorpay.provider';

export class ProviderFactory {
  static getProvider(providerName: string = 'razorpay'): BaseProvider {
    switch (providerName.toLowerCase()) {
      case 'razorpay':
        return new RazorpayProvider();
      default:
        throw new Error(`Unsupported provider: ${providerName}`);
    }
  }
}