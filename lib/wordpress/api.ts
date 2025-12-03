import { fetchGraphQL } from './client';
import { GET_POSTS, GET_POST_BY_SLUG, GET_PAGE_BY_SLUG, GET_MENU, GET_ABOUT_PAGE } from './queries';
import type { WPPost, WPPage, WPMenuItem, AboutPageACF } from '@/types/wordpress';

// Récupérer tous les posts
export async function getPosts(first = 10, after?: string) {
  const data = await fetchGraphQL<{
    posts: {
      pageInfo: { hasNextPage: boolean; endCursor: string };
      nodes: WPPost[];
    };
  }>(GET_POSTS, { first, after });

  return data.posts;
}

// Récupérer un post par son slug
export async function getPostBySlug(slug: string) {
  const data = await fetchGraphQL<{ postBy: WPPost }>(GET_POST_BY_SLUG, { slug });
  return data.postBy;
}

// Récupérer une page par son slug
export async function getPageBySlug(slug: string) {
  const data = await fetchGraphQL<{ pageBy: WPPage }>(GET_PAGE_BY_SLUG, { slug });
  return data.pageBy;
}

// Récupérer un menu
export async function getMenu(location: string) {
  const data = await fetchGraphQL<{
    menuItems: { nodes: WPMenuItem[] };
  }>(GET_MENU, { location });

  return data.menuItems.nodes;
}

// Récupérer tous les slugs de posts (pour generateStaticParams)
export async function getAllPostSlugs() {
  const allPosts: string[] = [];
  let hasNextPage = true;
  let after: string | undefined;

  while (hasNextPage) {
    const data = await getPosts(100, after);
    allPosts.push(...data.nodes.map((post) => post.slug));
    hasNextPage = data.pageInfo.hasNextPage;
    after = data.pageInfo.endCursor;
  }

  return allPosts;
}

// Récupérer la page "Qui sommes nous" avec les champs ACF
export async function getAboutPage() {
  const data = await fetchGraphQL<{
    pageBy: WPPage & { aboutPageFields: AboutPageACF };
  }>(GET_ABOUT_PAGE);

  return data.pageBy;
}
