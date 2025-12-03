// Types WooCommerce
export interface WCProduct {
  id: string;
  databaseId: number;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  price: string;
  regularPrice: string;
  salePrice?: string;
  onSale: boolean;
  stockStatus: 'IN_STOCK' | 'OUT_OF_STOCK' | 'ON_BACKORDER';
  image?: {
    sourceUrl: string;
    altText: string;
  };
  galleryImages?: {
    nodes: {
      sourceUrl: string;
      altText: string;
    }[];
  };
  productCategories?: {
    nodes: WCProductCategory[];
  };
  attributes?: {
    nodes: WCProductAttribute[];
  };
}

export interface WCProductCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: {
    sourceUrl: string;
  };
}

export interface WCProductAttribute {
  id: string;
  name: string;
  options?: string[];
}

export interface WCCart {
  total: string;
  subtotal: string;
  contents: {
    nodes: WCCartItem[];
  };
}

export interface WCCartItem {
  key: string;
  product: {
    node: WCProduct;
  };
  quantity: number;
  subtotal: string;
  total: string;
}

export interface WCOrder {
  id: string;
  orderNumber: string;
  date: string;
  status: string;
  total: string;
  lineItems: {
    nodes: {
      product: WCProduct;
      quantity: number;
      total: string;
    }[];
  };
}
