import { gql } from 'graphql-request';

// Query pour récupérer les produits
export const GET_PRODUCTS = gql`
  query GetProducts($first: Int = 12, $after: String) {
    products(first: $first, after: $after, where: { status: "publish" }) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        id
        databaseId
        name
        slug
        shortDescription
        price
        regularPrice
        salePrice
        onSale
        stockStatus
        image {
          sourceUrl
          altText
        }
        productCategories {
          nodes {
            name
            slug
          }
        }
      }
    }
  }
`;

// Query pour un produit spécifique
export const GET_PRODUCT_BY_SLUG = gql`
  query GetProductBySlug($slug: String!) {
    productBy(slug: $slug) {
      id
      databaseId
      name
      slug
      description
      shortDescription
      price
      regularPrice
      salePrice
      onSale
      stockStatus
      image {
        sourceUrl
        altText
      }
      galleryImages {
        nodes {
          sourceUrl
          altText
        }
      }
      productCategories {
        nodes {
          id
          name
          slug
        }
      }
      ... on SimpleProduct {
        attributes {
          nodes {
            name
            options
          }
        }
      }
    }
  }
`;

// Query pour récupérer les catégories de produits
export const GET_PRODUCT_CATEGORIES = gql`
  query GetProductCategories {
    productCategories(first: 100) {
      nodes {
        id
        name
        slug
        description
        image {
          sourceUrl
        }
      }
    }
  }
`;

// Query pour récupérer les produits par catégorie
export const GET_PRODUCTS_BY_CATEGORY = gql`
  query GetProductsByCategory($category: String!, $first: Int = 12) {
    products(first: $first, where: { category: $category, status: "publish" }) {
      nodes {
        id
        databaseId
        name
        slug
        shortDescription
        price
        regularPrice
        salePrice
        onSale
        stockStatus
        image {
          sourceUrl
          altText
        }
      }
    }
  }
`;
