# Page "Qui sommes nous" - Documentation

## 🎯 Vue d'ensemble

La page "Qui sommes nous" est une **page statique simple** en Next.js avec seulement 2 sections dynamiques qui utilisent l'API WooCommerce :
- Section "Nos derniers produits"
- Section "Catégories" (statique pour l'instant, peut être rendue dynamique si besoin)

## ✅ Architecture simplifiée

### Contenu statique (HTML en dur)
- ✅ Hero avec citation
- ✅ Section "Le concept" (4 colonnes)
- ✅ Statistiques (chiffres clés)
- ✅ Histoire / Timeline
- ✅ Engagement

### Contenu dynamique (API WooCommerce)
- ✅ Nos derniers produits (récupère 6 produits via l'API)
- ⚡ Catégories (liens statiques, mais peut être rendu dynamique)

## 📝 Comment modifier le contenu

### Modifier les textes

Éditer directement le fichier : `app/qui-sommes-nous/page.tsx`

#### Exemple : Changer la citation du hero
```tsx
<blockquote className="text-xl md:text-3xl font-light italic max-w-4xl mx-auto">
  &ldquo;Votre nouveau texte ici&rdquo;
</blockquote>
```

#### Exemple : Modifier les statistiques
```tsx
<div className="text-center">
  <div className="text-4xl md:text-5xl font-bold mb-2">1500+</div>
  <div className="text-sm md:text-base text-gray-300">
    Nouveaux clients
  </div>
</div>
```

#### Exemple : Ajouter un événement dans la timeline
```tsx
<div className="flex gap-6 group">
  <div className="flex-shrink-0 w-20 md:w-24">
    <div className="bg-blue-600 text-white font-bold text-lg md:text-xl px-4 py-2 rounded-lg text-center">
      2024
    </div>
  </div>
  <div className="flex-grow pb-8 border-l-2 border-gray-300 pl-6 relative">
    <div className="absolute left-0 top-0 w-4 h-4 bg-blue-600 rounded-full -ml-[9px]" />
    <h3 className="text-xl md:text-2xl font-bold mb-2 text-gray-900">
      Titre de l'événement
    </h3>
    <p className="text-gray-700">
      Description de l'événement
    </p>
  </div>
</div>
```

### Modifier l'image du hero

Remplacer l'URL de l'image Unsplash par votre propre image :

```tsx
<Image
  src="/images/hero-about.jpg"  // Votre image dans public/images/
  alt="Description de l'image"
  fill
  className="object-cover"
  priority
/>
```

### Personnaliser les couleurs

Les couleurs principales utilisées :
- Bleu : `bg-blue-600`, `text-blue-500`
- Gris foncé : `bg-gray-900`, `text-gray-700`
- Gris clair : `bg-gray-50`

Pour changer les couleurs, remplacer dans le fichier :
- `blue-600` → `votre-couleur-600`
- `blue-500` → `votre-couleur-500`

Exemple avec du rouge :
```tsx
className="bg-red-600 text-white"  // Au lieu de bg-blue-600
```

### Modifier le nombre de produits affichés

Dans `page.tsx`, ligne 16 :
```tsx
const productsData = await getProducts(6);  // Changer 6 par le nombre voulu
```

## 🎨 Sections disponibles

### 1. Hero Section
- Image de fond plein écran
- Citation centrée
- Overlay sombre pour la lisibilité

### 2. Le Concept
- 4 colonnes avec listes
- Responsive (1 colonne sur mobile, 4 sur desktop)

### 3. Statistiques
- 6 chiffres clés
- Fond sombre
- Grille responsive

### 4. Histoire / Timeline
- Timeline verticale
- Années + titres + descriptions
- Design épuré

### 5. Nos derniers produits (DYNAMIQUE)
- Récupère les produits depuis WooCommerce
- Affiche 6 produits en grille
- Bouton "Voir tous les produits"

### 6. Catégories
- 4 catégories avec icônes SVG
- Liens vers les pages de shop
- Hover effects

### 7. Engagement
- Texte centré
- Format prose pour meilleure lisibilité

## 🚀 Avantages de cette approche

✅ **Simple** - Tout le contenu est visible dans un seul fichier
✅ **Rapide** - Pas de requêtes GraphQL complexes
✅ **Contrôle total** - Modification directe du HTML/CSS
✅ **Performant** - Page statique avec ISR
✅ **Maintenable** - Pas besoin de plugins WordPress complexes

## 🔄 Rendre une section dynamique (optionnel)

Si plus tard tu veux rendre les catégories dynamiques via l'API WooCommerce :

```tsx
// Récupérer les catégories
const categories = await getCategories();

// Les afficher dynamiquement
{categories.map((category) => (
  <Link key={category.id} href={`/shop?category=${category.slug}`}>
    <h3>{category.name}</h3>
  </Link>
))}
```

## 📦 Fichiers créés

- ✅ `app/qui-sommes-nous/page.tsx` - Page principale (tout en un)
- ✅ `components/ui/ProductCard.tsx` - Carte produit (déjà existant)

## 🎯 Prochaines pages à créer (même approche simplifiée)

Même approche recommandée pour :
- Contact (`/contact`)
- F.A.Q (`/faq`)
- CGV (`/cgv`)
- Mentions légales (`/mentions-legales`)
- Politique de cookies (`/politique-cookies`)

Toutes ces pages seront principalement **statiques** avec édition directe du HTML.

## 📚 Ressources

- Tailwind CSS : https://tailwindcss.com/docs
- Next.js Image : https://nextjs.org/docs/app/api-reference/components/image
- Next.js Link : https://nextjs.org/docs/app/api-reference/components/link
