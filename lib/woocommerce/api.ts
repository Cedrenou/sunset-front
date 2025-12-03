import { fetchWooCommerce } from './client';
import type { WCProduct, WCProductCategory } from '@/types/woocommerce';

// Interface pour la réponse API REST
interface WCRestProduct {
  id: number;
  name: string;
  slug: string;
  description: string;
  short_description: string;
  price: string;
  regular_price: string;
  sale_price: string;
  on_sale: boolean;
  stock_status: string;
  images: Array<{
    src: string;
    alt: string;
  }>;
  categories: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
}

interface WCRestCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  image?: {
    src: string;
  };
}

// Convertir le produit REST en format GraphQL (pour compatibilité)
function convertRestProductToGraphQL(product: WCRestProduct): WCProduct {
  return {
    id: product.id.toString(),
    databaseId: product.id,
    name: product.name,
    slug: product.slug,
    description: product.description,
    shortDescription: product.short_description,
    price: product.price,
    regularPrice: product.regular_price,
    salePrice: product.sale_price,
    onSale: product.on_sale,
    stockStatus: product.stock_status === 'instock' ? 'IN_STOCK' : 'OUT_OF_STOCK',
    image: product.images[0] ? {
      sourceUrl: product.images[0].src,
      altText: product.images[0].alt || product.name,
    } : undefined,
    galleryImages: {
      nodes: product.images.map(img => ({
        sourceUrl: img.src,
        altText: img.alt || product.name,
      })),
    },
    productCategories: {
      nodes: product.categories.map(cat => ({
        id: cat.id.toString(),
        name: cat.name,
        slug: cat.slug,
      })),
    },
  };
}

// Récupérer tous les produits
export async function getProducts(perPage = 12, page = 1) {
  try {
    const products = await fetchWooCommerce<WCRestProduct[]>('products', {
      per_page: perPage,
      page,
      status: 'publish',
    });

    // S'assurer que products est bien un tableau
    const productsArray = Array.isArray(products) ? products : [];

    return {
      nodes: productsArray.map(convertRestProductToGraphQL),
      pageInfo: {
        hasNextPage: productsArray.length === perPage,
        endCursor: page.toString(),
      },
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    return {
      nodes: [],
      pageInfo: {
        hasNextPage: false,
        endCursor: '1',
      },
    };
  }
}

// Récupérer un produit par son slug
export async function getProductBySlug(slug: string) {
  try {
    const products = await fetchWooCommerce<WCRestProduct[]>('products', {
      slug,
    });

    if (products.length === 0) {
      return null;
    }

    return convertRestProductToGraphQL(products[0]);
  } catch (error) {
    console.error('Error fetching product by slug:', error);
    return null;
  }
}

// Récupérer les catégories de produits
export async function getProductCategories() {
  try {
    const categories = await fetchWooCommerce<WCRestCategory[]>('products/categories', {
      per_page: 100,
    });

    return categories.map(cat => ({
      id: cat.id.toString(),
      name: cat.name,
      slug: cat.slug,
      description: cat.description,
      image: cat.image ? {
        sourceUrl: cat.image.src,
      } : undefined,
    }));
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

// Récupérer les produits d'une catégorie
export async function getProductsByCategory(categorySlug: string, perPage = 12) {
  try {
    // D'abord récupérer l'ID de la catégorie par son slug
    const categories = await fetchWooCommerce<WCRestCategory[]>('products/categories', {
      slug: categorySlug,
    });

    if (categories.length === 0) {
      return [];
    }

    const categoryId = categories[0].id;

    const products = await fetchWooCommerce<WCRestProduct[]>('products', {
      category: categoryId.toString(),
      per_page: perPage,
      status: 'publish',
    });

    return products.map(convertRestProductToGraphQL);
  } catch (error) {
    console.error('Error fetching products by category:', error);
    return [];
  }
}

// Récupérer tous les slugs de produits (pour generateStaticParams)
export async function getAllProductSlugs() {
  try {
    const allProducts: string[] = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const products = await fetchWooCommerce<WCRestProduct[]>('products', {
        per_page: 100,
        page,
        status: 'publish',
      });

      allProducts.push(...products.map(product => product.slug));
      hasMore = products.length === 100;
      page++;
    }

    return allProducts;
  } catch (error) {
    console.error('Error fetching all product slugs:', error);
    return [];
  }
}
