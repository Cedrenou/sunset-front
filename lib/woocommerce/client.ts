import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';

// Client WooCommerce REST API
export const wooCommerceApi = new WooCommerceRestApi({
  url: process.env.WOOCOMMERCE_URL || 'https://sunsetridershop.com',
  consumerKey: process.env.WOOCOMMERCE_CONSUMER_KEY || '',
  consumerSecret: process.env.WOOCOMMERCE_CONSUMER_SECRET || '',
  version: 'wc/v3',
  queryStringAuth: true, // Force Basic Authentication as query string
});

// Helper pour gérer les erreurs API
export async function fetchWooCommerce<T>(
  endpoint: string,
  params?: Record<string, any>
): Promise<T> {
  try {
    const response = await wooCommerceApi.get(endpoint, params);
    return response.data;
  } catch (error: any) {
    console.error('WooCommerce API Error:', error.response?.data || error.message);
    throw error;
  }
}
