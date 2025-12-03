import { gql } from 'graphql-request';

// Query pour récupérer les posts
export const GET_POSTS = gql`
  query GetPosts($first: Int = 10, $after: String) {
    posts(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        id
        title
        slug
        excerpt
        date
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        author {
          node {
            name
          }
        }
        categories {
          nodes {
            name
            slug
          }
        }
      }
    }
  }
`;

// Query pour un post spécifique
export const GET_POST_BY_SLUG = gql`
  query GetPostBySlug($slug: String!) {
    postBy(slug: $slug) {
      id
      title
      content
      slug
      date
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
      author {
        node {
          name
        }
      }
      categories {
        nodes {
          name
          slug
        }
      }
    }
  }
`;

// Query pour récupérer une page
export const GET_PAGE_BY_SLUG = gql`
  query GetPageBySlug($slug: String!) {
    pageBy(slug: $slug) {
      id
      title
      content
      slug
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
    }
  }
`;

// Query pour récupérer le menu
export const GET_MENU = gql`
  query GetMenu($location: MenuLocationEnum!) {
    menuItems(where: { location: $location }) {
      nodes {
        id
        label
        url
        path
        target
        cssClasses
        parentId
      }
    }
  }
`;

// Query pour récupérer la page "Qui sommes nous" avec ACF
export const GET_ABOUT_PAGE = gql`
  query GetAboutPage {
    pageBy(uri: "/qui-sommes-nous") {
      id
      title
      content
      slug
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
      aboutPageFields {
        heroSection {
          citation
          citationAuthor
          heroImage {
            sourceUrl
            altText
          }
        }
        conceptSection {
          title
          description
          features {
            title
            items
          }
        }
        stats {
          number
          label
          icon
        }
        historySection {
          title
          content
          timeline {
            year
            title
            description
          }
        }
        teamSection {
          title
          description
          teamMembers {
            name
            role
            image {
              sourceUrl
              altText
            }
          }
        }
        engagementText
        videoUrl
        gallery {
          image {
            sourceUrl
            altText
          }
          caption
        }
      }
    }
  }
`;
