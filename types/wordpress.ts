// Types de base WordPress
export interface WPImage {
  sourceUrl: string;
  altText: string;
  mediaDetails?: {
    width: number;
    height: number;
  };
}

export interface WPPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  date: string;
  featuredImage?: {
    node: WPImage;
  };
  author?: {
    node: {
      name: string;
      avatar?: {
        url: string;
      };
    };
  };
  categories?: {
    nodes: WPCategory[];
  };
}

export interface WPPage {
  id: string;
  title: string;
  slug: string;
  content: string;
  featuredImage?: {
    node: WPImage;
  };
}

export interface WPCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface WPMenu {
  id: string;
  name: string;
  menuItems: {
    nodes: WPMenuItem[];
  };
}

export interface WPMenuItem {
  id: string;
  label: string;
  url: string;
  path: string;
  target?: string;
  parentId?: string;
  cssClasses?: string[];
}

// Types ACF pour "Qui sommes nous"
export interface ACFHeroSection {
  citation: string;
  citationAuthor: string;
  heroImage: WPImage;
}

export interface ACFConceptSection {
  title: string;
  description: string;
  features: {
    title: string;
    items: string[];
  }[];
}

export interface ACFStatItem {
  number: string;
  label: string;
  icon?: string;
}

export interface ACFHistorySection {
  title: string;
  content: string;
  timeline: {
    year: string;
    title: string;
    description: string;
  }[];
}

export interface ACFTeamSection {
  title: string;
  description: string;
  teamMembers: {
    name: string;
    role: string;
    image: WPImage;
  }[];
}

export interface ACFGalleryImage {
  image: WPImage;
  caption?: string;
}

export interface AboutPageACF {
  heroSection: ACFHeroSection;
  conceptSection: ACFConceptSection;
  stats: ACFStatItem[];
  historySection: ACFHistorySection;
  teamSection: ACFTeamSection;
  engagementText: string;
  videoUrl?: string;
  gallery: ACFGalleryImage[];
}
