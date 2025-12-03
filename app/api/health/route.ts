import { NextResponse } from 'next/server';
import { isWooCommerceConfigured } from '@/lib/woocommerce/client';
import { getProducts } from '@/lib/woocommerce/api';

export const dynamic = 'force-dynamic';

export async function GET() {
  const diagnostics = {
    timestamp: new Date().toISOString(),
    environment: {
      WOOCOMMERCE_URL: process.env.WOOCOMMERCE_URL ? '✓ Set' : '✗ Missing',
      WOOCOMMERCE_CONSUMER_KEY: process.env.WOOCOMMERCE_CONSUMER_KEY ? '✓ Set' : '✗ Missing',
      WOOCOMMERCE_CONSUMER_SECRET: process.env.WOOCOMMERCE_CONSUMER_SECRET ? '✓ Set' : '✗ Missing',
      NEXT_PUBLIC_WORDPRESS_URL: process.env.NEXT_PUBLIC_WORDPRESS_URL ? '✓ Set' : '✗ Missing',
      WORDPRESS_GRAPHQL_ENDPOINT: process.env.WORDPRESS_GRAPHQL_ENDPOINT ? '✓ Set' : '✗ Missing',
    },
    woocommerce: {
      configured: isWooCommerceConfigured,
      url: process.env.WOOCOMMERCE_URL || 'Not set',
    },
    api: {
      status: 'unknown',
      error: null as string | null,
      productsCount: 0,
    },
  };

  // Tester l'API WooCommerce
  try {
    const result = await getProducts(5);
    diagnostics.api.status = 'success';
    diagnostics.api.productsCount = result.nodes.length;
  } catch (error: any) {
    diagnostics.api.status = 'error';
    diagnostics.api.error = error.message || 'Unknown error';
  }

  return NextResponse.json(diagnostics, {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
