# Sunset Rider Shop - Frontend Next.js

Ce projet est le frontend Next.js pour Sunset Rider Shop, utilisant WordPress en mode headless comme backend.

## 🚀 Démarrage rapide

### Prérequis

- Node.js 18+ installé
- WordPress avec WPGraphQL et WPGraphQL for WooCommerce installés et configurés

### Installation

```bash
# Installer les dépendances
npm install

# Copier les variables d'environnement
cp .env.example .env.local

# Modifier .env.local avec vos URLs WordPress
# NEXT_PUBLIC_WORDPRESS_URL=https://sunsetridershop.com
# WORDPRESS_GRAPHQL_ENDPOINT=https://sunsetridershop.com/graphql
```

### Développement

```bash
# Lancer le serveur de développement
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur.

### Build pour la production

```bash
# Créer un build de production
npm run build

# Lancer en mode production
npm start
```

## 📁 Structure du projet

```
sunset-nextjs/
├── app/                    # Pages Next.js (App Router)
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Page d'accueil
│   └── qui-sommes-nous/   # Page "Qui sommes nous"
│       └── page.tsx
├── components/
│   ├── layout/            # Composants de layout (Header, Footer, etc.)
│   └── ui/                # Composants UI réutilisables
│       ├── Hero.tsx       # Section hero avec image de fond
│       ├── Stats.tsx      # Grille de statistiques
│       ├── ContentGrid.tsx # Grille de contenu en colonnes
│       ├── Timeline.tsx   # Timeline verticale
│       ├── TeamSection.tsx # Section équipe
│       ├── Gallery.tsx    # Galerie d'images
│       ├── VideoPlayer.tsx # Lecteur vidéo YouTube
│       └── ProductCard.tsx # Carte produit
├── lib/
│   ├── wordpress/         # API et queries WordPress
│   └── woocommerce/       # API et queries WooCommerce
├── types/                 # Types TypeScript
│   ├── wordpress.ts       # Types WordPress + ACF
│   └── woocommerce.ts     # Types WooCommerce
└── public/                # Fichiers statiques
```

## 🔧 Configuration

### Variables d'environnement

- `NEXT_PUBLIC_WORDPRESS_URL` : URL de votre site WordPress
- `WORDPRESS_GRAPHQL_ENDPOINT` : Endpoint GraphQL (généralement `/graphql`)

### Configuration WordPress

Pour que ce frontend fonctionne, assurez-vous d'avoir :

1. **WordPress** avec WooCommerce installé
2. **API REST** activée (activée par défaut)
3. Clés API WooCommerce configurées dans `.env.local`

## 📖 Documentation complète

### [DEPLOYMENT.md](./DEPLOYMENT.md)
- Guide complet de configuration WordPress
- Instructions de déploiement (Vercel, OVH)
- Stratégie de migration progressive
- Configuration DNS et sous-domaines
- Troubleshooting

### [QUI-SOMMES-NOUS-SETUP.md](./QUI-SOMMES-NOUS-SETUP.md)
- Documentation de la page "Qui sommes nous"
- Comment modifier le contenu statique
- Personnalisation des couleurs et styles
- Exemples de modifications courantes

## 🛠️ Technologies utilisées

- **Next.js 16** - Framework React
- **TypeScript** - Typage statique
- **Tailwind CSS** - Styling
- **WordPress REST API** - Backend WordPress
- **WooCommerce API** - E-commerce backend

## 📝 Pages disponibles

- ✅ **Page d'accueil** (`/`) - Affiche les produits vedettes
- ✅ **Qui sommes nous** (`/qui-sommes-nous`) - Page statique avec contenu en dur
  - Hero avec citation
  - Section concept (4 colonnes)
  - Statistiques
  - Timeline historique
  - Nos derniers produits (API WooCommerce)
  - Catégories d'équipement
  - Engagement
- 🚧 **Liste produits** (`/shop`) - À implémenter
- 🚧 **Page produit** (`/product/[slug]`) - À implémenter
- 🚧 **Panier** (`/cart`) - À implémenter
- 🚧 **Contact** (`/contact`) - À implémenter
- 🚧 **F.A.Q** (`/faq`) - À implémenter
- 🚧 **CGV** (`/cgv`) - À implémenter
- 🚧 **Mentions légales** (`/mentions-legales`) - À implémenter

## 🔗 Liens utiles

- [WordPress Backend](https://sunsetridershop.com/wp-admin)
- [Documentation Next.js](https://nextjs.org/docs)
- [Documentation WPGraphQL](https://www.wpgraphql.com/)

## 📄 Licence

Projet privé - Sunset Rider Shop
# sunset-front
# sunset-front
# sunset-front
