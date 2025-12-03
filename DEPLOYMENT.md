# Guide de Déploiement - Sunset Rider Shop (Next.js Headless)

Ce document explique comment configurer et déployer votre site Next.js en mode headless avec WordPress/WooCommerce.

## Architecture

```
WordPress (OVH)          Next.js (Vercel/OVH)
    Backend         ←API GraphQL→     Frontend
sunsetridershop.com      new.sunsetridershop.com
```

## Étape 1 : Configuration de WordPress (Backend)

### 1.1 Installer les plugins nécessaires

Connectez-vous à votre admin WordPress (`https://sunsetridershop.com/wp-admin`) et installez les plugins suivants :

1. **WPGraphQL** (gratuit)
   - Extensions → Ajouter → Rechercher "WPGraphQL"
   - Installer et activer

2. **WPGraphQL for WooCommerce** (gratuit)
   - Extensions → Ajouter → Rechercher "WPGraphQL for WooCommerce"
   - Installer et activer
   - **Important** : Vérifier que WooCommerce est bien installé et activé

3. **WPGraphQL for Advanced Custom Fields** (optionnel, si vous utilisez ACF)
   - Extensions → Ajouter → Rechercher "WPGraphiQL & WPGraphQL"
   - Installer et activer

### 1.2 Configurer les permaliens

1. Réglages → Permaliens
2. Choisir "Nom de l'article" ou une structure personnalisée
3. Enregistrer

### 1.3 Tester l'API GraphQL

1. Aller sur `https://sunsetridershop.com/graphql` (avec l'extension WPGraphiQL installée)
2. Tester une query simple :

```graphql
query {
  products(first: 5) {
    nodes {
      id
      name
      slug
      price
    }
  }
}
```

Si vous obtenez des résultats, l'API fonctionne !

### 1.4 Configuration CORS (si nécessaire)

Si vous avez des erreurs CORS lors du développement, ajoutez ce code dans votre fichier `wp-config.php` :

```php
// Autoriser les requêtes cross-origin pour GraphQL
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
```

Ou installez le plugin **WP-CORS** pour gérer cela via l'interface.

## Étape 2 : Configuration du projet Next.js

### 2.1 Variables d'environnement

1. Copier le fichier `.env.example` vers `.env.local` :
   ```bash
   cp .env.example .env.local
   ```

2. Modifier les valeurs dans `.env.local` :
   ```bash
   NEXT_PUBLIC_WORDPRESS_URL=https://sunsetridershop.com
   WORDPRESS_GRAPHQL_ENDPOINT=https://sunsetridershop.com/graphql
   ```

### 2.2 Installation et test en local

```bash
# Installer les dépendances
npm install

# Lancer en mode développement
npm run dev
```

Ouvrir `http://localhost:3000` dans votre navigateur.

**Note** : Si vous voyez un message d'erreur sur la page d'accueil, c'est normal ! Cela signifie que la connexion à l'API WordPress n'est pas encore configurée ou que les plugins ne sont pas installés.

## Étape 3 : Déploiement sur un sous-domaine

### Option A : Déploiement sur Vercel (Recommandé)

1. **Créer un compte sur Vercel** : https://vercel.com

2. **Connecter votre dépôt GitHub** :
   ```bash
   # Initialiser Git si ce n'est pas fait
   git init
   git add .
   git commit -m "Initial commit"

   # Créer un repo sur GitHub et le pousser
   git remote add origin https://github.com/votre-username/sunset-nextjs.git
   git push -u origin main
   ```

3. **Importer le projet sur Vercel** :
   - Aller sur https://vercel.com/new
   - Importer votre repository GitHub
   - Configurer les variables d'environnement :
     - `NEXT_PUBLIC_WORDPRESS_URL` : https://sunsetridershop.com
     - `WORDPRESS_GRAPHQL_ENDPOINT` : https://sunsetridershop.com/graphql
   - Déployer !

4. **Configurer le sous-domaine** :
   - Dans Vercel → Settings → Domains
   - Ajouter `new.sunsetridershop.com`
   - Suivre les instructions pour configurer les DNS chez OVH

### Option B : Déploiement sur OVH

1. **Build du projet** :
   ```bash
   npm run build
   ```

2. **Configuration du serveur OVH** :
   - Se connecter en SSH à votre serveur OVH
   - Installer Node.js (version 18+) si ce n'est pas déjà fait
   - Transférer les fichiers du projet via FTP/SFTP

3. **Lancer l'application** :
   ```bash
   # En production
   npm start

   # Ou avec PM2 (recommandé)
   npm install -g pm2
   pm2 start npm --name "sunset-nextjs" -- start
   pm2 save
   ```

4. **Configuration Nginx** :
   Créer un fichier `/etc/nginx/sites-available/new.sunsetridershop.com` :
   ```nginx
   server {
       listen 80;
       server_name new.sunsetridershop.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

   Activer le site :
   ```bash
   sudo ln -s /etc/nginx/sites-available/new.sunsetridershop.com /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl reload nginx
   ```

5. **Configurer SSL avec Let's Encrypt** :
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d new.sunsetridershop.com
   ```

## Étape 4 : Configuration DNS chez OVH

1. Se connecter à votre espace client OVH
2. Aller dans "Domaines" → sunsetridershop.com → "Zone DNS"
3. Ajouter un enregistrement de type **CNAME** :
   - Sous-domaine : `new`
   - Cible :
     - Si Vercel : `cname.vercel-dns.com`
     - Si serveur OVH : votre adresse IP serveur

4. Attendre la propagation DNS (peut prendre jusqu'à 24h)

## Étape 5 : Migration progressive des pages

### Stratégie de migration

Commencez par les pages les plus simples :

1. ✅ **Page d'accueil** (déjà créée)
2. **Pages statiques** :
   - `/about` - À propos
   - `/contact` - Contact
3. **Pages de blog** :
   - `/blog` - Liste des articles
   - `/blog/[slug]` - Article individuel
4. **Pages produits** :
   - `/shop` - Liste des produits
   - `/product/[slug]` - Page produit
5. **Fonctionnalités avancées** :
   - Panier
   - Checkout
   - Compte client

### Exemple : Créer une page produit

Créer le fichier `app/product/[slug]/page.tsx` :

```typescript
import { getProductBySlug } from '@/lib/woocommerce/api';
import Layout from '@/components/layout/Layout';
import Image from 'next/image';

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            {product.image && (
              <Image
                src={product.image.sourceUrl}
                alt={product.name}
                width={600}
                height={600}
                className="rounded-lg"
              />
            )}
          </div>
          <div>
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            <p className="text-3xl font-bold text-blue-600 mb-6">{product.price}</p>
            <div dangerouslySetInnerHTML={{ __html: product.description }} />
          </div>
        </div>
      </div>
    </Layout>
  );
}
```

## Étape 6 : Basculement final

Une fois toutes les pages migrées et testées :

1. **Modifier les DNS** :
   - Pointer `sunsetridershop.com` vers Next.js
   - Pointer `old.sunsetridershop.com` vers WordPress (backup)

2. **Désactiver le frontend WordPress** :
   - Installer le plugin "Headless Mode"
   - Activer pour bloquer l'accès frontend

3. **Rediriger le trafic** :
   - Dans WordPress, ajouter une redirection 301 vers new.sunsetridershop.com

## Maintenance

### Mettre à jour le contenu

- Le contenu se gère toujours dans WordPress (`sunsetridershop.com/wp-admin`)
- Les changements apparaissent automatiquement sur le frontend Next.js

### Revalidation / Cache

Next.js utilise le SSG (Static Site Generation) par défaut. Pour forcer la régénération :

```typescript
// Dans votre page
export const revalidate = 60; // Revalider toutes les 60 secondes
```

Ou utiliser **ISR (Incremental Static Regeneration)** pour des mises à jour automatiques.

### Webhooks (optionnel)

Pour régénérer automatiquement les pages lors de modifications dans WordPress :

1. Installer le plugin "WP Webhooks" sur WordPress
2. Configurer un webhook vers votre API Next.js pour revalider les pages

## Troubleshooting

### Erreur "Cannot find module '@/...'"

Vérifier que `tsconfig.json` contient :
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

### Images ne s'affichent pas

Ajouter le domaine WordPress dans `next.config.ts` :
```typescript
const nextConfig = {
  images: {
    domains: ['sunsetridershop.com'],
  },
};
```

### Erreur GraphQL

- Vérifier que les plugins WPGraphQL sont bien activés
- Tester l'endpoint directement : `https://sunsetridershop.com/graphql`
- Vérifier les logs WordPress pour les erreurs

## Configuration ACF pour la page "Qui sommes nous"

### Installation des plugins nécessaires

1. **Advanced Custom Fields (ACF Pro)** - requis
2. **WPGraphQL for Advanced Custom Fields** - requis

### Structure des champs personnalisés

Créer un groupe de champs ACF nommé **"About Page Fields"** avec les règles d'affichage :
- Type de publication : **Page**
- URI de page : **est égal à** `/qui-sommes-nous`

#### 1. Hero Section (Groupe)
- **Nom du champ** : `hero_section`
- **Type** : Groupe
- **Sous-champs** :
  - `citation` (Text Area) - La citation principale
  - `citation_author` (Text) - Auteur de la citation
  - `hero_image` (Image) - Image de fond du hero

#### 2. Concept Section (Groupe)
- **Nom du champ** : `concept_section`
- **Type** : Groupe
- **Sous-champs** :
  - `title` (Text) - Titre de la section
  - `description` (Text Area) - Description
  - `features` (Repeater) :
    - `title` (Text) - Titre de la colonne
    - `items` (Text Area) - Items (un par ligne)

#### 3. Stats (Repeater)
- **Nom du champ** : `stats`
- **Type** : Repeater
- **Sous-champs** :
  - `number` (Text) - Le chiffre (ex: "0")
  - `label` (Text) - Le label (ex: "Équipement neuf vendu")
  - `icon` (Text) - Icône (optionnel)

#### 4. History Section (Groupe)
- **Nom du champ** : `history_section`
- **Type** : Groupe
- **Sous-champs** :
  - `title` (Text) - Titre de la section
  - `content` (WYSIWYG) - Contenu HTML
  - `timeline` (Repeater) :
    - `year` (Text) - Année
    - `title` (Text) - Titre de l'événement
    - `description` (Text Area) - Description

#### 5. Team Section (Groupe)
- **Nom du champ** : `team_section`
- **Type** : Groupe
- **Sous-champs** :
  - `title` (Text) - Titre de la section
  - `description` (Text Area) - Description
  - `team_members` (Repeater) :
    - `name` (Text) - Nom
    - `role` (Text) - Rôle
    - `image` (Image) - Photo

#### 6. Engagement Text
- **Nom du champ** : `engagement_text`
- **Type** : WYSIWYG
- **Description** : Texte d'engagement envers la communauté

#### 7. Video URL
- **Nom du champ** : `video_url`
- **Type** : URL
- **Description** : URL YouTube de la vidéo

#### 8. Gallery (Repeater)
- **Nom du champ** : `gallery`
- **Type** : Repeater
- **Sous-champs** :
  - `image` (Image) - Image de la galerie
  - `caption` (Text) - Légende (optionnel)

### Configurer WPGraphQL pour ACF

1. Dans ACF, éditer le groupe de champs "About Page Fields"
2. Dans les paramètres, trouver la section **"GraphQL Field Name"**
3. Définir : `aboutPageFields`
4. Cocher **"Show in GraphQL"** pour tous les champs

### Tester la query GraphQL

Aller sur `https://sunsetridershop.com/graphql` et tester :

```graphql
query {
  pageBy(uri: "/qui-sommes-nous") {
    id
    title
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
      }
    }
  }
}
```

Si la query retourne des données, la configuration est correcte !

### Pages configurées

- ✅ **Page d'accueil** (`/`) - Affiche les produits WooCommerce
- ✅ **Qui sommes nous** (`/qui-sommes-nous`) - Page avec champs ACF personnalisés

## Ressources

- [Documentation Next.js](https://nextjs.org/docs)
- [Documentation WPGraphQL](https://www.wpgraphql.com/)
- [WPGraphQL for WooCommerce](https://docs.wpgraphql.com/extensions/wpgraphql-woocommerce)
- [Advanced Custom Fields](https://www.advancedcustomfields.com/)
- [WPGraphQL for ACF](https://www.wpgraphql.com/acf)
