import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';

// Vérifier que les variables d'environnement sont définies
const WOOCOMMERCE_URL = process.env.WOOCOMMERCE_URL;
const WOOCOMMERCE_CONSUMER_KEY = process.env.WOOCOMMERCE_CONSUMER_KEY;
const WOOCOMMERCE_CONSUMER_SECRET = process.env.WOOCOMMERCE_CONSUMER_SECRET;

// Flag pour savoir si WooCommerce est configuré
export const isWooCommerceConfigured = !!(
  WOOCOMMERCE_URL &&
  WOOCOMMERCE_CONSUMER_KEY &&
  WOOCOMMERCE_CONSUMER_SECRET
);

// Client WooCommerce REST API
let wooCommerceApi: WooCommerceRestApi | null = null;

if (isWooCommerceConfigured) {
  try {
    wooCommerceApi = new WooCommerceRestApi({
      url: WOOCOMMERCE_URL!,
      consumerKey: WOOCOMMERCE_CONSUMER_KEY!,
      consumerSecret: WOOCOMMERCE_CONSUMER_SECRET!,
      version: 'wc/v3',
      queryStringAuth: true, // Force Basic Authentication as query string
    });
  } catch (error) {
    console.error('Failed to initialize WooCommerce API client:', error);
  }
}

// Helper pour gérer les erreurs API
export async function fetchWooCommerce<T>(
  endpoint: string,
  params?: Record<string, any>
): Promise<T> {
  // Si WooCommerce n'est pas configuré, retourner un tableau vide
  if (!isWooCommerceConfigured || !wooCommerceApi) {
    console.warn('WooCommerce API is not configured. Please set environment variables.');
    return [] as T;
  }

  try {
    const response = await wooCommerceApi.get(endpoint, params);
    return response.data;
  } catch (error: any) {
    console.error('WooCommerce API Error:', {
      endpoint,
      params,
      error: error.response?.data || error.message,
      status: error.response?.status,
    });
    // Retourner un tableau vide au lieu de throw pour ne pas casser la page
    return [] as T;
  }
}
